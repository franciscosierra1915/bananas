/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/apple-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes['apple_low_obj_Material_#35_0'].geometry} material={materials.Material_35} position={[0, 0.23, 0.18]} rotation={[-1.59, 0, 0]} scale={0.05} />
    </group>
  )
}

useGLTF.preload('/apple-transformed.glb')
