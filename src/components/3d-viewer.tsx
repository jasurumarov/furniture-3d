'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei'
import { Group } from 'three'

interface SofaModelProps {
  url: string
}

function SofaModel({ url }: SofaModelProps) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-sm text-gray-600">Loading 3D model...</span>
      </div>
    </Html>
  )
}

interface ThreeDViewerProps {
  modelUrl: string
  className?: string
}

export default function ThreeDViewer({ modelUrl, className = "" }: ThreeDViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        onCreated={() => setIsLoading(false)}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <SofaModel url={modelUrl} />
          <Environment preset="apartment" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -1.4, 0]}
            opacity={0.75}
            width={10}
            height={10}
            blur={2.6}
            far={2}
          />
        </Suspense>
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/assets/sofa.glb') 