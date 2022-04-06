import { useRef } from 'react';
import {Canvas, useFrame } from "@react-three/fiber";

function Box(){
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial color="orange" />
    </mesh>
  )
}

export default function App(){
  return(
    <Canvas>
      <Box/>
    </Canvas>
  )
}