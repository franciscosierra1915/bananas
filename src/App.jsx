import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment  } from "@react-three/drei"

function Box({ z }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0,0, z])
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });


  useFrame((state) => {
    ref.current.position.set(data.x * width, (data.y += 0.5), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}

function Apple(){
  const { scene } = useGLTF("/apple.glb")
  return <primitive object={scene} />
}

export default function App({ count = 100 }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Apple scale={0.5}/>
        <Environment preset="sunset" />
      </Suspense>
      {/* {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))} */}
    </Canvas>
  );
}
