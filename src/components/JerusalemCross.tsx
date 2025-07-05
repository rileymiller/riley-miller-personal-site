import React, { useRef, useEffect } from "react"
import * as THREE from "three"

const JerusalemCross: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Small delay to ensure container has final dimensions
    const timer = setTimeout(() => {
      if (!mountRef.current) return

      // Physics state for each small cross
      const crossPhysics = [
        { velocity: 0, amplitude: 1, damping: 0.95 },
        { velocity: 0, amplitude: 1, damping: 0.95 },
        { velocity: 0, amplitude: 1, damping: 0.95 },
        { velocity: 0, amplitude: 1, damping: 0.95 },
      ]

      // Get container dimensions
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = null // Transparent background

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // Enable transparency
      })

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      mountRef.current.appendChild(renderer.domElement)

      // Enhanced lighting for metallic reflections
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
      scene.add(ambientLight)

      // Key light
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
      keyLight.position.set(5, 10, 5)
      keyLight.castShadow = true
      scene.add(keyLight)

      // Fill light
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
      fillLight.position.set(-5, 0, 5)
      scene.add(fillLight)

      // Rim light for edge highlights
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8)
      rimLight.position.set(0, 5, -10)
      scene.add(rimLight)

      // Point lights for specular highlights
      const pointLight1 = new THREE.PointLight(0xffffff, 0.5)
      pointLight1.position.set(10, 10, 10)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0xffffff, 0.3)
      pointLight2.position.set(-10, -10, 10)
      scene.add(pointLight2)

      // Create Potent Cross Geometry with bookends (potent cross)
      const createPotentCrossGeometry = (
        width: number,
        height: number,
        depth: number,
        armThickness: number
      ) => {
        const shape = new THREE.Shape()

        // Create cross shape with bookends
        const w = width / 2
        const h = height / 2
        const armW = armThickness
        const bookendWidth = armThickness * 3.0 // Width of the bookend
        const bookendOffset = armThickness // How far from the edge

        // Start from top bookend
        shape.moveTo(-bookendWidth, h)
        shape.lineTo(bookendWidth, h)
        shape.lineTo(bookendWidth, h - bookendOffset)
        shape.lineTo(armW, h - bookendOffset)
        shape.lineTo(armW, armW)

        // Right arm with bookend
        shape.lineTo(w - bookendOffset, armW)
        shape.lineTo(w - bookendOffset, bookendWidth)
        shape.lineTo(w, bookendWidth)
        shape.lineTo(w, -bookendWidth)
        shape.lineTo(w - bookendOffset, -bookendWidth)
        shape.lineTo(w - bookendOffset, -armW)
        shape.lineTo(armW, -armW)

        // Bottom arm with bookend
        shape.lineTo(armW, -h + bookendOffset)
        shape.lineTo(bookendWidth, -h + bookendOffset)
        shape.lineTo(bookendWidth, -h)
        shape.lineTo(-bookendWidth, -h)
        shape.lineTo(-bookendWidth, -h + bookendOffset)
        shape.lineTo(-armW, -h + bookendOffset)
        shape.lineTo(-armW, -armW)

        // Left arm with bookend
        shape.lineTo(-w + bookendOffset, -armW)
        shape.lineTo(-w + bookendOffset, -bookendWidth)
        shape.lineTo(-w, -bookendWidth)
        shape.lineTo(-w, bookendWidth)
        shape.lineTo(-w + bookendOffset, bookendWidth)
        shape.lineTo(-w + bookendOffset, armW)
        shape.lineTo(-armW, armW)

        // Close at top
        shape.lineTo(-armW, h - bookendOffset)
        shape.lineTo(-bookendWidth, h - bookendOffset)
        shape.closePath()

        const extrudeSettings = {
          depth: depth,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelSegments: 8,
        }

        return new THREE.ExtrudeGeometry(shape, extrudeSettings)
      }
      // Create Greek Cross geometry
      const createGreekCrossGeometry = (
        width: number,
        height: number,
        depth: number,
        armThickness: number
      ) => {
        const shape = new THREE.Shape()

        // Create cross shape with specified arm thickness
        const w = width / 2
        const h = height / 2
        const armW = armThickness

        shape.moveTo(-armW, h)
        shape.lineTo(armW, h)
        shape.lineTo(armW, armW)
        shape.lineTo(w, armW)
        shape.lineTo(w, -armW)
        shape.lineTo(armW, -armW)
        shape.lineTo(armW, -h)
        shape.lineTo(-armW, -h)
        shape.lineTo(-armW, -armW)
        shape.lineTo(-w, -armW)
        shape.lineTo(-w, armW)
        shape.lineTo(-armW, armW)
        shape.closePath()

        const extrudeSettings = {
          depth: depth,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelSegments: 8,
        }

        return new THREE.ExtrudeGeometry(shape, extrudeSettings)
      }

      // Iridescent metallic material
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x222222,
        emissiveIntensity: 0.1,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        reflectivity: 1.0,
        ior: 2.5,
        iridescence: 1.0,
        iridescenceIOR: 2.0,
        iridescenceThicknessRange: [100, 400],
      })

      // Create main cross - thin and tall
      const mainCross = new THREE.Mesh(
        createPotentCrossGeometry(2.8, 2.8, 0.2, 0.15),
        material
      )
      scene.add(mainCross)

      // Create four smaller crosses - skinnier
      const smallCrossGeometry = createGreekCrossGeometry(0.5, 0.5, 0.15, 0.04)

      // Position in center of each quadrant
      // Main cross extends to ±1.4 horizontally and ±1.4 vertically
      // Arm thickness is 0.15, so quadrants are from ±0.15 to ±1.4
      // Center of quadrants would be at:
      const positions = [
        { x: 0.775, y: 0.775 }, // Top right quadrant center
        { x: -0.775, y: 0.775 }, // Top left quadrant center
        { x: 0.775, y: -0.775 }, // Bottom right quadrant center
        { x: -0.775, y: -0.775 }, // Bottom left quadrant center
      ]

      const smallCrosses = positions.map(pos => {
        const cross = new THREE.Mesh(smallCrossGeometry, material)
        cross.position.set(pos.x, pos.y, 0.1)
        return cross
      })

      // Create a group for rotation
      const crossGroup = new THREE.Group()
      crossGroup.add(mainCross)
      smallCrosses.forEach(cross => crossGroup.add(cross))
      scene.add(crossGroup)

      // Raycaster for mouse interaction
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const mouseWorld = new THREE.Vector3()

      // Store target rotations for smooth animation
      const targetRotations = smallCrosses.map(() => ({ x: 0, y: 0, z: 0 }))

      // Handle mouse move for cursor and tilt effect
      const handleMouseMove = (event: MouseEvent) => {
        if (!mountRef.current) return

        const rect = mountRef.current.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        // Convert mouse position to world coordinates
        mouseWorld.set(mouse.x * 3, mouse.y * 3, 0)

        // Update cursor based on hover
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(smallCrosses)
        mountRef.current.style.cursor =
          intersects.length > 0 ? "pointer" : "default"
      }

      mountRef.current.addEventListener("mousemove", handleMouseMove)

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)

        // Gentle rotation for the entire group
        crossGroup.rotation.y += 0.005
        crossGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
        
        // Physics-based swinging motion for small crosses with mouse following
        const time = Date.now() * 0.001
        smallCrosses.forEach((cross, index) => {
          const physics = crossPhysics[index]
          const phaseOffset = index * Math.PI * 0.5

          // Update physics
          physics.velocity *= physics.damping
          physics.amplitude = Math.max(1, physics.amplitude * 0.98) // Gradually return to normal

          // Base swinging with physics amplification
          const swingAmplitude = 0.15 * physics.amplitude
          const swayAmplitude = 0.1 * physics.amplitude

          // Calculate direction from cross to mouse
          const crossWorldPos = new THREE.Vector3()
          cross.getWorldPosition(crossWorldPos)

          const dirToMouse = new THREE.Vector3()
            .subVectors(mouseWorld, crossWorldPos)
            .normalize()

          // Calculate tilt angles based on mouse direction
          const tiltStrength = 0.3 // How much the crosses tilt
          const targetTiltX = dirToMouse.y * tiltStrength
          const targetTiltZ = -dirToMouse.x * tiltStrength

          // Store target rotations
          targetRotations[index].x = targetTiltX
          targetRotations[index].z = targetTiltZ

          // Smoothly interpolate to target rotation
          const lerpFactor = 0.1
          const mouseTiltX = THREE.MathUtils.lerp(
            cross.rotation.x -
              Math.sin(time * 1.2 + phaseOffset + physics.velocity) *
                swingAmplitude,
            targetRotations[index].x,
            lerpFactor
          )
          const mouseTiltZ = THREE.MathUtils.lerp(
            cross.rotation.z -
              Math.sin(time * 0.8 + phaseOffset + Math.PI * 0.25) *
                swayAmplitude,
            targetRotations[index].z,
            lerpFactor
          )

          // Apply combined rotation (swing + mouse tilt)
          cross.rotation.x =
            Math.sin(time * 1.2 + phaseOffset + physics.velocity) *
              swingAmplitude +
            mouseTiltX
          cross.rotation.z =
            Math.sin(time * 0.8 + phaseOffset + Math.PI * 0.25) *
              swayAmplitude +
            mouseTiltZ
          cross.rotation.y =
            Math.sin(time * 0.6 + phaseOffset) * 0.05 * physics.amplitude
        })

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current) return

        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        )
      }

      window.addEventListener("resize", handleResize)

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        mountRef.current?.removeEventListener("mousemove", handleMouseMove)
        if (
          mountRef.current &&
          renderer.domElement.parentNode === mountRef.current
        ) {
          mountRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }, 0) // End of setTimeout

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`w-full h-full block ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export default JerusalemCross
