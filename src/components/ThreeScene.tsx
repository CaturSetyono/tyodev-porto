"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo, forwardRef } from "react";

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
interface CubeletProps extends Omit<ThreeElements['mesh'], "position"> {
  position: [number, number, number] | THREE.Vector3;
}
const Cubelet = forwardRef<Mesh, CubeletProps>(({ position, ...props }, ref) => {
  return (
    <mesh ref={ref} position={position} {...props}>
      <boxGeometry args={[0.96, 0.96, 0.96]} />
      {CUBE_COLORS.map((color, i) => (
        <meshPhysicalMaterial
          key={i}
          attach={`material-${i}`}
          color={color}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      ))}
    </mesh>
  );
});
Cubelet.displayName = "Cubelet";

// --- LOGIKA RUBIK'S CUBE ---
function RubiksCube() {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);

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
  const moveHistory = useRef<{ axis: string; slice: number; dir: number }[]>(
    []
  ); // History untuk solving
  const animationState = useRef({
    currentAngle: 0,
    targetAngle: 0,
    axis: "x",
    activeIndices: [] as number[],
    speed: 0,
  });
  const lastAutoMove = useRef(0);

  const hasScrambled = useRef(false);

  // Fungsi putaran acak
  const triggerRandomMove = () => {
    const axes = ["x", "y", "z"];
    const slices = [-1, 0, 1];
    const dirs = [1, -1];

    const move = {
      axis: axes[Math.floor(Math.random() * axes.length)],
      slice: slices[Math.floor(Math.random() * slices.length)],
      dir: dirs[Math.floor(Math.random() * dirs.length)],
    };

    moveQueue.current.push(move);
    moveHistory.current.push(move); // Catat gerakan agar bisa di-reverse
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // --- PHASE 1: INTRO (EXPLOSION TO ASSEMBLY) ---
    // Durasi: 0s - 3s
    if (t < 3) {
      const progress = Math.min(1, t / 2.5); // Selesai di 2.5s
      const ease = 1 - Math.pow(1 - progress, 3); // Cubic Out easing

      cubeRefs.current.forEach((mesh, i) => {
        if (mesh) {
          // Interpolasi dari posisi ledakan ke posisi grid
          const target = initialPositions[i];
          const explosion = explosionVectors[i];

          mesh.position.x = THREE.MathUtils.lerp(
            target.x + explosion.x,
            target.x,
            ease
          );
          mesh.position.y = THREE.MathUtils.lerp(
            target.y + explosion.y,
            target.y,
            ease
          );
          mesh.position.z = THREE.MathUtils.lerp(
            target.z + explosion.z,
            target.z,
            ease
          );

          // Rotasi acak saat terbang
          mesh.rotation.x = (1 - ease) * explosion.x;
          mesh.rotation.y = (1 - ease) * explosion.y;
        }
      });
      return; // Skip logika rubik saat intro
    }

    // --- PHASE 2 & 3: RUBIK LOGIC ---

    // Trigger Scramble Awal (t > 3)
    if (t > 3 && !hasScrambled.current) {
      hasScrambled.current = true;
      for (let i = 0; i < 5; i++) triggerRandomMove();
    }

    // --- PHASE 3: SOLVING (t > 60s) ---
    // Saat > 60 detik, kita berhenti mengacak dan mulai menyelesaikan (undo moves)
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
          dir: -lastMove.dir, // Gerakan kebalikan (Inverse)
        });
      }
    }

    // 1. Consume Queue
    if (!isAnimating && moveQueue.current.length > 0) {
      const move = moveQueue.current.shift()!;

      const indices: number[] = [];
      cubeRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const pos = mesh.position;
        let match = false;
        if (move.axis === "x" && Math.abs(pos.x - move.slice) < 0.1)
          match = true;
        if (move.axis === "y" && Math.abs(pos.y - move.slice) < 0.1)
          match = true;
        if (move.axis === "z" && Math.abs(pos.z - move.slice) < 0.1)
          match = true;
        if (match) indices.push(i);
      });

      if (indices.length > 0) {
        // Kecepatan putar:
        // t > 60 (Solving): Speed 3.5 (~0.3s per move) agar terlihat "pelan tapi pasti"
        // t <= 60 (Scramble): Speed 5 (~0.2s per move) agar terlihat lincah
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
      const { axis, targetAngle, activeIndices, speed } =
        animationState.current;
      let step = targetAngle * speed * delta;
      const remaining = targetAngle - animationState.current.currentAngle;

      if (Math.abs(remaining) < Math.abs(step)) {
        step = remaining;
        setIsAnimating(false);
      }

      animationState.current.currentAngle += step;

      const rotationMatrix = new THREE.Matrix4();
      const rotationAxis = new THREE.Vector3(
        axis === "x" ? 1 : 0,
        axis === "y" ? 1 : 0,
        axis === "z" ? 1 : 0
      );

      if (axis === "x") rotationMatrix.makeRotationX(step);
      if (axis === "y") rotationMatrix.makeRotationY(step);
      if (axis === "z") rotationMatrix.makeRotationZ(step);

      activeIndices.forEach((idx) => {
        const mesh = cubeRefs.current[idx];
        if (mesh) {
          mesh.position.applyMatrix4(rotationMatrix);
          mesh.rotateOnWorldAxis(rotationAxis, step);
        }
      });

      if (!isAnimating) {
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
    // 3. Auto Shuffle (Idle)
    else if (t > 3 && t <= 60) {
      // Hanya auto-shuffle sampai detik 60
      // Interval 1.2 detik agar jumlah gerakan tidak terlalu menumpuk (sekitar 45-50 gerakan)
      // Sehingga saat solving tidak memakan waktu terlalu lama
      if (state.clock.elapsedTime - lastAutoMove.current > 1.2) {
        triggerRandomMove();
        lastAutoMove.current = state.clock.elapsedTime;
      }
    }
  });

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
          ref={(el) => { cubeRefs.current[i] = el; }}
        />
      ))}
    </group>
  );
}

// --- SCENE UTAMA ---
export default function ThreeScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex justify-center items-center relative z-10">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Camera moved further back to make the element appear smaller */}
        <PerspectiveCamera makeDefault position={[8, 6, 9]} fov={40} />

        {/* Kontrol Orbit untuk memutar seluruh Rubik */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Pencahayaan */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color="#ffffff"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1}
          color="#ffffff"
        />

        <Environment preset="studio" />

        {/* Reduce Float animation for better performance */}
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
          <RubiksCube />
        </Float>
        {/* Lower shadow resolution for performance, keep shadow visible */}
        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.5}
          scale={15}
          blur={2}
          far={10}
          resolution={128}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
