import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const JerusalemCross: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Enable transparency
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Create Jerusalem Cross geometry
    const createCrossGeometry = (width: number, height: number, depth: number) => {
      const shape = new THREE.Shape();
      
      // Create cross shape
      const w = width / 2;
      const h = height / 2;
      const armW = w * 0.3;
      
      shape.moveTo(-armW, h);
      shape.lineTo(armW, h);
      shape.lineTo(armW, armW);
      shape.lineTo(w, armW);
      shape.lineTo(w, -armW);
      shape.lineTo(armW, -armW);
      shape.lineTo(armW, -h);
      shape.lineTo(-armW, -h);
      shape.lineTo(-armW, -armW);
      shape.lineTo(-w, -armW);
      shape.lineTo(-w, armW);
      shape.lineTo(-armW, armW);
      shape.closePath();

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 8
      };

      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    };

    // Material with subtle metallic look
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
    });

    // Create main cross
    const mainCross = new THREE.Mesh(createCrossGeometry(2, 2.5, 0.2), material);
    scene.add(mainCross);

    // Create four smaller crosses
    const smallCrossGeometry = createCrossGeometry(0.6, 0.6, 0.15);
    const positions = [
      { x: 0.7, y: 0.7 },   // Top right
      { x: -0.7, y: 0.7 },  // Top left
      { x: 0.7, y: -0.7 },  // Bottom right
      { x: -0.7, y: -0.7 }  // Bottom left
    ];

    const smallCrosses = positions.map(pos => {
      const cross = new THREE.Mesh(smallCrossGeometry, material);
      cross.position.set(pos.x, pos.y, 0.1);
      return cross;
    });

    smallCrosses.forEach(cross => scene.add(cross));

    // Create a group for rotation
    const crossGroup = new THREE.Group();
    crossGroup.add(mainCross);
    smallCrosses.forEach(cross => crossGroup.add(cross));
    scene.add(crossGroup);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation
      crossGroup.rotation.y += 0.005;
      crossGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
};

export default JerusalemCross;