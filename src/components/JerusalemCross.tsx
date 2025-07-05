import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const JerusalemCross: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Physics state for each small cross
    const crossPhysics = [
      { velocity: 0, amplitude: 1, damping: 0.95 },
      { velocity: 0, amplitude: 1, damping: 0.95 },
      { velocity: 0, amplitude: 1, damping: 0.95 },
      { velocity: 0, amplitude: 1, damping: 0.95 }
    ];

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

    // Enhanced lighting for metallic reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Rim light for edge highlights
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Point lights for specular highlights
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create Jerusalem Cross geometry
    const createCrossGeometry = (width: number, height: number, depth: number, armThickness: number) => {
      const shape = new THREE.Shape();
      
      // Create cross shape with specified arm thickness
      const w = width / 2;
      const h = height / 2;
      const armW = armThickness;
      
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

    // Glowing metallic material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe0e0e0,
      emissive: 0x404040,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      reflectivity: 1.0,
      ior: 2.5,
    });

    // Create main cross - thin and tall
    const mainCross = new THREE.Mesh(createCrossGeometry(2.2, 3.2, 0.2, 0.2), material);
    scene.add(mainCross);

    // Create four smaller crosses - skinnier
    const smallCrossGeometry = createCrossGeometry(0.4, 0.4, 0.15, 0.08);
    
    // Position in center of each quadrant
    // Main cross extends to ±1.1 horizontally and ±1.6 vertically
    // So center of quadrants would be at:
    const positions = [
      { x: 0.8, y: 1.0 },   // Top right quadrant center
      { x: -0.8, y: 1.0 },  // Top left quadrant center
      { x: 0.8, y: -1.0 },  // Bottom right quadrant center
      { x: -0.8, y: -1.0 }  // Bottom left quadrant center
    ];

    const smallCrosses = positions.map(pos => {
      const cross = new THREE.Mesh(smallCrossGeometry, material);
      cross.position.set(pos.x, pos.y, 0.1);
      return cross;
    });

    // Create a group for rotation
    const crossGroup = new THREE.Group();
    crossGroup.add(mainCross);
    smallCrosses.forEach(cross => crossGroup.add(cross));
    scene.add(crossGroup);
    
    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle mouse move for cursor
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(smallCrosses);
      
      mountRef.current.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };
    
    // Handle mouse click
    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      // Check intersection with small crosses
      const intersects = raycaster.intersectObjects(smallCrosses, true);
      
      if (intersects.length > 0) {
        const clickedCross = intersects[0].object;
        const crossIndex = smallCrosses.indexOf(clickedCross as THREE.Mesh);
        
        if (crossIndex !== -1) {
          // Apply impulse to the clicked cross
          crossPhysics[crossIndex].velocity += 0.5;
          crossPhysics[crossIndex].amplitude = 3; // Increase amplitude temporarily
        }
      }
    };
    
    mountRef.current.addEventListener('click', handleClick);
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation for the entire group
      crossGroup.rotation.y += 0.005;
      crossGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      
      // Physics-based swinging motion for small crosses
      const time = Date.now() * 0.001;
      smallCrosses.forEach((cross, index) => {
        const physics = crossPhysics[index];
        const phaseOffset = index * Math.PI * 0.5;
        
        // Update physics
        physics.velocity *= physics.damping;
        physics.amplitude = Math.max(1, physics.amplitude * 0.98); // Gradually return to normal
        
        // Base swinging with physics amplification
        const swingAmplitude = 0.15 * physics.amplitude;
        const swayAmplitude = 0.1 * physics.amplitude;
        
        // Apply physics velocity to rotation
        cross.rotation.x = Math.sin(time * 1.2 + phaseOffset + physics.velocity) * swingAmplitude;
        cross.rotation.z = Math.sin(time * 0.8 + phaseOffset + Math.PI * 0.25) * swayAmplitude;
        cross.rotation.y = Math.sin(time * 0.6 + phaseOffset) * 0.05 * physics.amplitude;
      });
      
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
      mountRef.current?.removeEventListener('click', handleClick);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
};

export default JerusalemCross;