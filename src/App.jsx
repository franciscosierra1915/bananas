import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

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
    if (data.y > height) {
      data.y = -height;
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

export default function App({ count = 80, depth = 80 }) {
  return (
    <Canvas gl={{ alpha: false, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 30, near: 0.01, far: depth + 15 }}>
      <color attach="background" args={['#F2A84A']} />
      {/* <ambientLight intensity={0.2} /> */}
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
      {Array.from({ length: count }, (_, i) => (
        <Apple key={i} z={-(i / count) * depth - 5} />
      ))}
        <Environment preset="sunset" />
        <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={11} height={700} />
      </EffectComposer>
      </Suspense>

    </Canvas>
  );
}

// export default function App({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
//   return (
//     // No need for alpha and antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
//     <Canvas gl={{ alpha: false, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
//       <color attach="background" args={['#ffbf40']} />
//       <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="orange" />
//       {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
//       <Suspense fallback={null}>
//       {Array.from({ length: count }, (_, i) => <Apple key={i} index={i} z={Math.round(easing(i / count) * depth - 130)} speed={speed} /> /* prettier-ignore */)}
//       <Environment preset="sunset" />
//       {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster) */}
//       <EffectComposer multisampling={0}>
//         <DepthOfField target={[0, 0, 60]} focalLength={0.5} bokehScale={11} height={700} />
//       </EffectComposer>
//       </Suspense>
//     </Canvas>
//   )
// }