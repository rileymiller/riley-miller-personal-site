import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Shield() {
  const shieldRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (shieldRef.current) {
      const time = state.clock.elapsedTime;
      shieldRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
      shieldRef.current.position.y = Math.sin(time * 0.5) * 0.05;
      
      // Mouse interaction
      const targetRotationX = hovered ? state.mouse.y * 0.3 : 0;
      const targetRotationY = hovered ? state.mouse.x * 0.3 : Math.sin(time * 0.2) * 0.15;
      shieldRef.current.rotation.x += (targetRotationX - shieldRef.current.rotation.x) * 0.05;
      shieldRef.current.rotation.y += (targetRotationY - shieldRef.current.rotation.y) * 0.05;
    }
  });

  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 2;
    const height = 2.8;
    
    // Traditional heraldic shield with curved bottom
    shape.moveTo(0, height * 0.5);
    shape.lineTo(-width * 0.48, height * 0.48);
    shape.lineTo(-width * 0.5, height * 0.35);
    shape.lineTo(-width * 0.5, -height * 0.15);
    shape.bezierCurveTo(
      -width * 0.5, -height * 0.35,
      -width * 0.3, -height * 0.45,
      0, -height * 0.5
    );
    shape.bezierCurveTo(
      width * 0.3, -height * 0.45,
      width * 0.5, -height * 0.35,
      width * 0.5, -height * 0.15
    );
    shape.lineTo(width * 0.5, height * 0.35);
    shape.lineTo(width * 0.48, height * 0.48);
    shape.closePath();
    
    return shape;
  }, []);

  // Jerusalem Cross components
  const CrossPart = ({ width, height, depth, position }: any) => (
    <mesh position={position} castShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial 
        color="#FFFFFF"
        metalness={0}
        roughness={0.6}
        emissive="#FFFFFF"
        emissiveIntensity={0.1}
      />
    </mesh>
  );

  // Outline cross part
  const OutlineCrossPart = ({ width, height, thickness = 0.03, depth, position }: any) => (
    <group position={position}>
      {/* Top edge */}
      <mesh castShadow>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0}
          roughness={0.6}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0, -height + thickness, 0]} castShadow>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0}
          roughness={0.6}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Left edge */}
      <mesh position={[-width/2 + thickness/2, -height/2 + thickness/2, 0]} castShadow>
        <boxGeometry args={[thickness, height - thickness, depth]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0}
          roughness={0.6}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Right edge */}
      <mesh position={[width/2 - thickness/2, -height/2 + thickness/2, 0]} castShadow>
        <boxGeometry args={[thickness, height - thickness, depth]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0}
          roughness={0.6}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );

  const JerusalemCross = () => (
    <group position={[0, 0, 0.2]}>
      {/* Main Potent Cross as outline - no center intersection */}
      <group>
        {/* Horizontal beam - outline (4 segments avoiding center) */}
        <CrossPart width={0.465} height={0.03} depth={0.15} position={[-0.3675, 0.06, 0]} />
        <CrossPart width={0.465} height={0.03} depth={0.15} position={[-0.3675, -0.06, 0]} />
        <CrossPart width={0.465} height={0.03} depth={0.15} position={[0.3675, 0.06, 0]} />
        <CrossPart width={0.465} height={0.03} depth={0.15} position={[0.3675, -0.06, 0]} />
        <CrossPart width={0.03} height={0.12} depth={0.15} position={[-0.585, 0, 0]} />
        <CrossPart width={0.03} height={0.12} depth={0.15} position={[0.585, 0, 0]} />
        
        {/* Vertical beam - outline (4 segments avoiding center) */}
        <CrossPart width={0.03} height={0.465} depth={0.15} position={[-0.06, 0.3675, 0]} />
        <CrossPart width={0.03} height={0.465} depth={0.15} position={[0.06, 0.3675, 0]} />
        <CrossPart width={0.03} height={0.465} depth={0.15} position={[-0.06, -0.3675, 0]} />
        <CrossPart width={0.03} height={0.465} depth={0.15} position={[0.06, -0.3675, 0]} />
        <CrossPart width={0.12} height={0.03} depth={0.15} position={[0, 0.585, 0]} />
        <CrossPart width={0.12} height={0.03} depth={0.15} position={[0, -0.585, 0]} />
        
        {/* T-shaped ends as outlines */}
        {/* Right T */}
        <CrossPart width={0.03} height={0.3} depth={0.15} position={[0.675, 0, 0]} />
        <CrossPart width={0.03} height={0.3} depth={0.15} position={[0.525, 0, 0]} />
        <CrossPart width={0.15} height={0.03} depth={0.15} position={[0.6, 0.135, 0]} />
        <CrossPart width={0.15} height={0.03} depth={0.15} position={[0.6, -0.135, 0]} />
        
        {/* Left T */}
        <CrossPart width={0.03} height={0.3} depth={0.15} position={[-0.675, 0, 0]} />
        <CrossPart width={0.03} height={0.3} depth={0.15} position={[-0.525, 0, 0]} />
        <CrossPart width={0.15} height={0.03} depth={0.15} position={[-0.6, 0.135, 0]} />
        <CrossPart width={0.15} height={0.03} depth={0.15} position={[-0.6, -0.135, 0]} />
        
        {/* Top T */}
        <CrossPart width={0.3} height={0.03} depth={0.15} position={[0, 0.675, 0]} />
        <CrossPart width={0.3} height={0.03} depth={0.15} position={[0, 0.525, 0]} />
        <CrossPart width={0.03} height={0.15} depth={0.15} position={[0.135, 0.6, 0]} />
        <CrossPart width={0.03} height={0.15} depth={0.15} position={[-0.135, 0.6, 0]} />
        
        {/* Bottom T */}
        <CrossPart width={0.3} height={0.03} depth={0.15} position={[0, -0.675, 0]} />
        <CrossPart width={0.3} height={0.03} depth={0.15} position={[0, -0.525, 0]} />
        <CrossPart width={0.03} height={0.15} depth={0.15} position={[0.135, -0.6, 0]} />
        <CrossPart width={0.03} height={0.15} depth={0.15} position={[-0.135, -0.6, 0]} />
      </group>
      
      {/* Four smaller Greek crosses (solid) */}
      {[[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5], [0.5, -0.5]].map((pos, i) => (
        <group key={i} position={[pos[0], pos[1], 0]}>
          <CrossPart width={0.3} height={0.08} depth={0.12} position={[0, 0, 0]} />
          <CrossPart width={0.08} height={0.3} depth={0.12} position={[0, 0, 0]} />
        </group>
      ))}
    </group>
  );

  return (
    <group 
      ref={shieldRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Black leather shield base */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry 
          args={[
            shieldShape, 
            { 
              depth: 0.2,
              bevelEnabled: true,
              bevelThickness: 0.01,
              bevelSize: 0.01,
              bevelSegments: 2,
              steps: 1,
              curveSegments: 32
            }
          ]} 
        />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0}
          roughness={0.9}
        />
      </mesh>

      {/* Metallic trim - outer edge */}
      <mesh castShadow position={[0, 0, -0.01]}>
        <extrudeGeometry 
          args={[
            shieldShape, 
            { 
              depth: 0.22,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 8,
              steps: 1,
              curveSegments: 32
            }
          ]} 
        />
        <meshStandardMaterial 
          color="#8B8B8B"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Inner rim accent */}
      <mesh position={[0, 0, 0.15]}>
        <extrudeGeometry 
          args={[
            shieldShape, 
            { 
              depth: 0.02,
              bevelEnabled: true,
              bevelThickness: 0.01,
              bevelSize: 0.01,
              bevelSegments: 4,
              scale: 0.95
            }
          ]} 
        />
        <meshStandardMaterial 
          color="#7A7A7A"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Jerusalem Cross */}
      <JerusalemCross />
    </group>
  );
}

export default function JerusalemCrossShield({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        shadows
        gl={{ 
          alpha: true, 
          antialias: true
        }}
      >
        <Float
          speed={2}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <Shield />
        </Float>
        
        <ambientLight intensity={0.3} />
        
        {/* Key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Rim light for metallic edges */}
        <directionalLight
          position={[0, 5, -3]}
          intensity={0.8}
          color="#ffffff"
        />
        
        {/* Fill light */}
        <directionalLight
          position={[-3, 2, 2]}
          intensity={0.4}
        />
      </Canvas>
    </div>
  );
}