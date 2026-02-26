"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  ContactShadows,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo, forwardRef, useEffect } from "react";

// --- KONFIGURASI WARNA RUBIK (Classic Colors) ---
import { Html } from "@react-three/drei";

const CUBE_COLORS = [
  "#cb252a", // Red
  "#3073db", // Blue
  "#fadb05", // Yellow
  "#33a832", // Green
  "#ffffff", // White
  "#f77305", // Orange
];

// --- KOMPONEN SATUAN BLOK (CUBELET) ---
import type { Mesh } from "three";
import type { ThreeElements } from '@react-three/fiber';

interface CubeletProps extends Omit<ThreeElements['mesh'], "position" | "material"> {
  position: [number, number, number] | THREE.Vector3;
  materials: THREE.Material[];
}

import { RoundedBox } from "@react-three/drei";

const Cubelet = forwardRef<Mesh, CubeletProps>(({ position, materials, ...props }, ref) => {
  // A perfect Rubik's Cube replica: A black rounded plastic core block,
  // with 6 flat colored 'stickers' resting slightly above the surface.

  return (
    <mesh ref={ref} position={position} {...props}>
      {/* Inti Plastik Hitam (Rounded) */}
      <RoundedBox args={[0.96, 0.96, 0.96]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.1} />
      </RoundedBox>

      {/* 6 Sisi Stiker (Planes) yang ditempel di luar inti hitam - hanya material bagian luar yang diset warna selain hitam oleh map utama */}
      <mesh position={[0.481, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[0]} />
      </mesh>
      <mesh position={[-0.481, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[1]} />
      </mesh>
      <mesh position={[0, 0.481, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[2]} />
      </mesh>
      <mesh position={[0, -0.481, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[3]} />
      </mesh>
      <mesh position={[0, 0, 0.481]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[4]} />
      </mesh>
      <mesh position={[0, 0, -0.481]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <primitive attach="material" object={materials[5]} />
      </mesh>
    </mesh>
  );
});

// --- LOGIKA RUBIK'S CUBE ---
function RubiksCube() {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const targetCamRot = useRef({ x: 0, y: 0 });

  // Optimization: Create materials once and reuse them
  const materials = useMemo(() => {
    return CUBE_COLORS.map((color) =>
      new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2, // Slightly smoother for premium feel
        metalness: 0.1, // Hints of metallic
        envMapIntensity: 1.5, // Make sure it reflects the environment
      })
    );
  }, []);

  const blackMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#111111", // Deep grey-black for the internal mechanism
      roughness: 0.4,
      metalness: 0.1,
    });
  }, []);

  // Inisialisasi posisi & vektor ledakan
  const { initialPositions, explosionVectors } = useMemo(() => {
    const pos = [];
    const vec = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          pos.push(new THREE.Vector3(x, y, z));
          // Vektor acak untuk efek ledakan
          vec.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15
            )
          );
        }
      }
    }
    return { initialPositions: pos, explosionVectors: vec };
  }, []);

  // State Animasi
  const [isAnimating, setIsAnimating] = useState(false);
  const moveQueue = useRef<{ axis: string; slice: number; dir: number }[]>([]);
  const moveHistory = useRef<{ axis: string; slice: number; dir: number }[]>([]);
  const animationState = useRef({
    currentAngle: 0,
    targetAngle: 0,
    axis: "x",
    activeIndices: [] as number[],
    speed: 0,
  });
  const lastAutoMove = useRef(0);
  const hasScrambled = useRef(false);

  // Fungsi putaran acak (sama seperti sebelumnya, namun dioptimalkan sedikit jika perlu)
  const triggerRandomMove = () => {
    // Limit queue size to prevent memory leaks in long sessions
    if (moveQueue.current.length > 5) return;

    const axes = ["x", "y", "z"];
    const slices = [-1, 0, 1];
    const dirs = [1, -1];

    const axisIdx = Math.max(0, Math.min(2, Math.floor(Math.random() * axes.length)));
    const sliceIdx = Math.max(0, Math.min(2, Math.floor(Math.random() * slices.length)));
    const dirIdx = Math.max(0, Math.min(1, Math.floor(Math.random() * dirs.length)));

    const move = {
      axis: axes[axisIdx] || "x",
      slice: slices[sliceIdx] || 0,
      dir: dirs[dirIdx] || 1,
    };

    moveQueue.current.push(move);
    moveHistory.current.push(move);
  };

  // --- WEBSOCKET LISTENER FOR PYTHON GESTURES ---
  const [gestureStatus, setGestureStatus] = useState<string>("Disconnected");

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket("ws://localhost:8765");

      ws.onopen = () => {
        setGestureStatus("Connected");
        console.log("Connected to Python Gesture Server");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "CAM_POS") {
            // High frequency continuous stream for Right Hand
            // Map 0..1 to a comfortable rotation angle
            // INVERTED mapping as per user feedback: Kanan jadi Kiri, Atas jadi Bawah
            targetCamRot.current.y = (data.x - 0.5) * Math.PI * 1.5; // Flipped sign
            targetCamRot.current.x = -(data.y - 0.5) * Math.PI; // Flipped sign
            return;
          }

          if (data.type === "GESTURE" && data.command) {

            // Limit queue to prevent spam
            if (moveQueue.current.length > 2) return;

            let move = null;
            // Map Hand Swipes to Cube Rotations
            // A swipe left/right spins the whole Y axis (Middle slice for cool effect, or whole cube. Let's do random slice for variety)
            const randomSlice = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

            // INVERTED SWIPE DIRECTIONS per user feedback
            switch (data.command) {
              case "CUBE_SWIPE_LEFT":
                setGestureStatus("Cube Left!");
                move = { axis: "y", slice: randomSlice, dir: 1 }; // Was -1
                break;
              case "CUBE_SWIPE_RIGHT":
                setGestureStatus("Cube Right!");
                move = { axis: "y", slice: randomSlice, dir: -1 }; // Was 1
                break;
              case "CUBE_SWIPE_UP":
                setGestureStatus("Cube Up!");
                move = { axis: "x", slice: randomSlice, dir: 1 }; // Was -1
                break;
              case "CUBE_SWIPE_DOWN":
                setGestureStatus("Cube Down!");
                move = { axis: "x", slice: randomSlice, dir: -1 }; // Was 1
                break;
            }

            if (move) {
              moveQueue.current.push(move);
              moveHistory.current.push(move);
            }

            // Reset status after a delay
            setTimeout(() => {
              setGestureStatus((prev) => prev !== "Disconnected" ? "Connected" : prev);
            }, 1000);
          }
        } catch (e) {
          console.error("Error parsing websocket message", e);
        }
      };

      ws.onclose = () => {
        setGestureStatus("Disconnected");
        // Auto Reconnect every 3 seconds
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        ws.close();
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws) ws.close();
    };
  }, []);
  // ----------------------------------------------

  useFrame((state, delta) => {
    // Cap delta to prevent huge jumps if tab was inactive
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // --- CAMERA GESTURE LERP ---
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetCamRot.current.y, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetCamRot.current.x, 0.1);
    }

    // --- PHASE 1: INTRO (EXPLOSION TO ASSEMBLY) ---
    if (t < 3) {
      const progress = Math.min(1, Math.max(0, t / 2.5));
      const ease = 1 - Math.pow(1 - progress, 3);

      cubeRefs.current.forEach((mesh, i) => {
        if (mesh) {
          const target = initialPositions[i];
          const explosion = explosionVectors[i];

          // Use direct assignment for performance instead of lerp object creation
          const nx = target.x + explosion.x * (1 - ease);
          const ny = target.y + explosion.y * (1 - ease);
          const nz = target.z + explosion.z * (1 - ease);

          if (!isNaN(nx) && !isNaN(ny) && !isNaN(nz)) {
            mesh.position.x = nx;
            mesh.position.y = ny;
            mesh.position.z = nz;

            mesh.rotation.x = (1 - ease) * explosion.x;
            mesh.rotation.y = (1 - ease) * explosion.y;
          }
        }
      });
      return;
    }

    // --- PHASE 2 & 3: RUBIK LOGIC ---

    if (t > 3 && !hasScrambled.current) {
      hasScrambled.current = true;
      for (let i = 0; i < 5; i++) triggerRandomMove();
    }

    if (t > 60) {
      if (
        !isAnimating &&
        moveQueue.current.length === 0 &&
        moveHistory.current.length > 0
      ) {
        const lastMove = moveHistory.current.pop()!;
        moveQueue.current.push({
          axis: lastMove.axis,
          slice: lastMove.slice,
          dir: -lastMove.dir,
        });
      }
    }

    // 1. Consume Queue
    if (!isAnimating && moveQueue.current.length > 0) {
      const move = moveQueue.current.shift()!;

      const indices: number[] = [];
      // Optimization: pre-calculate threshold
      const threshold = 0.1;

      cubeRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const pos = mesh.position;
        let match = false;
        // Direct access is faster
        if (move.axis === "x" && Math.abs(pos.x - move.slice) < threshold) match = true;
        else if (move.axis === "y" && Math.abs(pos.y - move.slice) < threshold) match = true;
        else if (move.axis === "z" && Math.abs(pos.z - move.slice) < threshold) match = true;

        if (match) indices.push(i);
      });

      if (indices.length > 0) {
        const speed = t > 60 ? 3.5 : 5;
        animationState.current = {
          currentAngle: 0,
          targetAngle: (Math.PI / 2) * move.dir,
          axis: move.axis,
          activeIndices: indices,
          speed: speed,
        };
        setIsAnimating(true);
      }
    }

    // 2. Animate Rotation
    if (isAnimating) {
      const { axis, targetAngle, activeIndices, speed } = animationState.current;

      // Safeguard against NaN or infinity in step calculation
      let step = targetAngle * speed * dt;
      if (isNaN(step) || !isFinite(step)) step = 0;

      const remaining = targetAngle - animationState.current.currentAngle;

      if (Math.abs(remaining) < Math.abs(step) || Math.abs(remaining) < 0.001) {
        step = remaining;
        setIsAnimating(false);
      }

      animationState.current.currentAngle += step;

      // Optimize Matrix creation - reuse would be better but inside component it's tricky without a global temp
      // Just keep it simple but clean
      const rotationMatrix = new THREE.Matrix4();
      const rotationAxis = new THREE.Vector3(
        axis === "x" ? 1 : 0,
        axis === "y" ? 1 : 0,
        axis === "z" ? 1 : 0
      );

      if (axis === "x") rotationMatrix.makeRotationX(step);
      else if (axis === "y") rotationMatrix.makeRotationY(step);
      else if (axis === "z") rotationMatrix.makeRotationZ(step);

      activeIndices.forEach((idx) => {
        const mesh = cubeRefs.current[idx];
        if (mesh) {
          // Validate matrix application 
          if (!isNaN(step)) {
            mesh.position.applyMatrix4(rotationMatrix);
            mesh.rotateOnWorldAxis(rotationAxis, step);
          }
        }
      });

      if (!isAnimating) { // Snap to grid at end of move
        activeIndices.forEach((idx) => {
          const mesh = cubeRefs.current[idx];
          if (mesh) {
            const rx = Math.round(mesh.position.x);
            const ry = Math.round(mesh.position.y);
            const rz = Math.round(mesh.position.z);

            if (!isNaN(rx) && !isNaN(ry) && !isNaN(rz)) {
              mesh.position.x = rx;
              mesh.position.y = ry;
              mesh.position.z = rz;
              mesh.updateMatrix();
            }
          }
        });
      }
    }
    // 3. Auto Shuffle
    else if (t > 3 && t <= 60) {
      if (state.clock.elapsedTime - lastAutoMove.current > 1.2) {
        triggerRandomMove();
        lastAutoMove.current = state.clock.elapsedTime;
      }
    }
  });

  // Clean up materials on unmount
  useEffect(() => {
    return () => {
      materials.forEach(mat => mat.dispose());
      blackMaterial.dispose();
    };
  }, [materials, blackMaterial]);

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        triggerRandomMove();
      }}
    >
      {initialPositions.map((pos, i) => {
        // Only assign colored material on the outermost faces
        // boxGeometry faces: 0: Right (x+), 1: Left (x-), 2: Top (y+), 3: Bottom (y-), 4: Front (z+), 5: Back (z-)
        const cubeletMaterials = [
          pos.x === 1 ? materials[0] : blackMaterial,  // Right
          pos.x === -1 ? materials[1] : blackMaterial, // Left
          pos.y === 1 ? materials[2] : blackMaterial,  // Top
          pos.y === -1 ? materials[3] : blackMaterial, // Bottom
          pos.z === 1 ? materials[4] : blackMaterial,  // Front
          pos.z === -1 ? materials[5] : blackMaterial, // Back
        ];

        return (
          <Cubelet
            key={i}
            position={pos}
            materials={cubeletMaterials}
            ref={(el) => { cubeRefs.current[i] = el; }}
          />
        );
      })}
    </group>
  );
}



// --- SCENE UTAMA ---
export default function ThreeScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex justify-center items-center relative z-10 w-full h-full">
      <Canvas
        dpr={1} // Strict limit to 1 to prevent high-res Context Loss on integrated GPUs
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[8, 6, 9]} fov={40} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={1.0}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          makeDefault
        />

        <ambientLight intensity={0.4} />
        {/* Main Key Light */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          shadow-normalBias={0.02}
        />
        {/* Fill Light (Soft cool light to pop the shadows) */}
        <directionalLight
          position={[-10, 0, -5]}
          intensity={1.5}
          color="#e0f2fe"
        />
        {/* Backlight (Rim light for 3D depth) */}
        <directionalLight
          position={[0, -5, -10]}
          intensity={0.5}
          color="#0ea5e9"
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <RubiksCube />
        </Float>
      </Canvas>
    </div>
  );
}
