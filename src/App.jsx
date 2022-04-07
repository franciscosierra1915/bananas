import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

function Apple({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/apple-transformed.glb");
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001))
    ref.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh
    ref={ref}
      geometry={nodes["apple_low_obj_Material_#35_0"].geometry}
      material={materials.Material_35}
      position={[0, 0.23, 0.18]}
      scale={0.05}
    />
  );
}

export default function App({ count = 100 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
      {Array.from({ length: count }, (_, i) => (
        <Apple key={i} z={-i} />
      ))}
        <Environment preset="sunset" />
      </Suspense>

    </Canvas>
  );
}
