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

// --- KONFIGURASI WARNA RUBIK (Harmonious Glossy Palette) ---
const CUBE_COLORS = [
  "#3b82f6", // Royal Blue
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#cbd5e1", // Silver
];

// --- KOMPONEN SATUAN BLOK (CUBELET) ---
import type { Mesh } from "three";
import type { ThreeElements } from '@react-three/fiber';

interface CubeletProps extends Omit<ThreeElements['mesh'], "position" | "material"> {
  position: [number, number, number] | THREE.Vector3;
  materials: THREE.Material[];
}

const Cubelet = forwardRef<Mesh, CubeletProps>(({ position, materials, ...props }, ref) => {
  return (
    <mesh ref={ref} position={position} material={materials} {...props}>
      <boxGeometry args={[0.96, 0.96, 0.96]} />
    </mesh>
  );
});
Cubelet.displayName = "Cubelet";

// --- LOGIKA RUBIK'S CUBE ---
function RubiksCube() {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);

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

    const move = {
      axis: axes[Math.floor(Math.random() * axes.length)],
      slice: slices[Math.floor(Math.random() * slices.length)],
      dir: dirs[Math.floor(Math.random() * dirs.length)],
    };

    moveQueue.current.push(move);
    moveHistory.current.push(move);
  };

  useFrame((state, delta) => {
    // Cap delta to prevent huge jumps if tab was inactive
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // --- PHASE 1: INTRO (EXPLOSION TO ASSEMBLY) ---
    if (t < 3) {
      const progress = Math.min(1, t / 2.5);
      const ease = 1 - Math.pow(1 - progress, 3);

      cubeRefs.current.forEach((mesh, i) => {
        if (mesh) {
          const target = initialPositions[i];
          const explosion = explosionVectors[i];

          // Use direct assignment for performance instead of lerp object creation
          mesh.position.x = target.x + explosion.x * (1 - ease); // SImplified lerp formula for 0 start
          mesh.position.y = target.y + explosion.y * (1 - ease);
          mesh.position.z = target.z + explosion.z * (1 - ease);

          mesh.rotation.x = (1 - ease) * explosion.x;
          mesh.rotation.y = (1 - ease) * explosion.y;
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
      let step = targetAngle * speed * dt;
      const remaining = targetAngle - animationState.current.currentAngle;

      if (Math.abs(remaining) < Math.abs(step)) {
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
          mesh.position.applyMatrix4(rotationMatrix);
          mesh.rotateOnWorldAxis(rotationAxis, step);
        }
      });

      if (!isAnimating) { // Snap to grid at end of move
        activeIndices.forEach((idx) => {
          const mesh = cubeRefs.current[idx];
          if (mesh) {
            mesh.position.x = Math.round(mesh.position.x);
            mesh.position.y = Math.round(mesh.position.y);
            mesh.position.z = Math.round(mesh.position.z);
            mesh.updateMatrix();
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
    };
  }, [materials]);

  return (
    <group
      onPointerDown={(e) => {
        e.stopPropagation();
        triggerRandomMove();
      }}
    >
      {initialPositions.map((pos, i) => (
        <Cubelet
          key={i}
          position={pos}
          materials={materials}
          ref={(el) => { cubeRefs.current[i] = el; }}
        />
      ))}
    </group>
  );
}

// --- HELPER UNTUK ROTASI OTOMATIS OBJEK (MENGGANTIKAN ROTASI KAMERA) ---
function AutoRotate({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Kecepatan rotasi
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

// --- SCENE UTAMA ---
export default function ThreeScene() {
  const [dpr, setDpr] = useState(1); // Default to 1 initially for safety

  return (
    <div className="w-full h-[500px] md:h-[600px] flex justify-center items-center relative z-10">
      <Canvas
        dpr={dpr} // Dynamic DPR
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)} // Increase quality if performance is good
          onDecline={() => setDpr(1)} // Decrease quality if performance is bad
          flipflops={3}
          onFallback={() => setDpr(1)}
        />

        <PerspectiveCamera makeDefault position={[8, 6, 9]} fov={40} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          // autoRotate dihapus agar kamera stay diam, bayangan stay di bawah
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          makeDefault
        />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />

        <Environment preset="studio" blur={1} />

        <AutoRotate>
          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
            <RubiksCube />
          </Float>
        </AutoRotate>

        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.4}
          scale={15}
          blur={2.5}
          far={10}
          resolution={128} // Kept low for performance
          color="#000000"
          frames={1} // Static shadow (rendered once) for performance. If cube moves vertically significantly, might need more frames.
        />
      </Canvas>
    </div>
  );
}
