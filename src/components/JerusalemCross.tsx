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
      
      // Add a subtle shadow plane
      const shadowPlaneGeometry = new THREE.PlaneGeometry(10, 10)
      const shadowPlaneMaterial = new THREE.ShadowMaterial({
        opacity: 0.3,
      })
      const shadowPlane = new THREE.Mesh(shadowPlaneGeometry, shadowPlaneMaterial)
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.y = -2
      shadowPlane.receiveShadow = true
      scene.add(shadowPlane)

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // Enable transparency
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        },
      })
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      mountRef.current.appendChild(renderer.domElement)

      // Soft ambient light for bone white
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)

      // Main directional light for strong shadows
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
      mainLight.position.set(5, 8, 8)
      mainLight.castShadow = true
      mainLight.shadow.mapSize.width = 2048
      mainLight.shadow.mapSize.height = 2048
      mainLight.shadow.camera.near = 0.5
      mainLight.shadow.camera.far = 50
      mainLight.shadow.camera.left = -10
      mainLight.shadow.camera.right = 10
      mainLight.shadow.camera.top = 10
      mainLight.shadow.camera.bottom = -10
      scene.add(mainLight)

      // Soft fill light from opposite side
      const fillLight = new THREE.DirectionalLight(0xfaf5e9, 0.5)
      fillLight.position.set(-8, 3, 5)
      scene.add(fillLight)

      // Bottom up light for ambient occlusion effect
      const bottomLight = new THREE.DirectionalLight(0xe8dcc0, 0.3)
      bottomLight.position.set(0, -10, 5)
      scene.add(bottomLight)

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
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 16,
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
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 16,
        }

        return new THREE.ExtrudeGeometry(shape, extrudeSettings)
      }

      // Create subtle texture map for bone white surface
      const textureSize = 512
      const bumpCanvas = document.createElement("canvas")
      bumpCanvas.width = textureSize
      bumpCanvas.height = textureSize
      const bumpCtx = bumpCanvas.getContext("2d")!

      // Light gray background for subtle texture
      bumpCtx.fillStyle = "#f0f0f0"
      bumpCtx.fillRect(0, 0, textureSize, textureSize)

      // Subtle organic texture
      const bumpRadius = 15
      const spacing = 40

      for (let x = bumpRadius; x < textureSize; x += spacing) {
        for (let y = bumpRadius; y < textureSize; y += spacing) {
          // Add some offset for organic feel
          const offsetX = (Math.random() - 0.5) * 6
          const offsetY = (Math.random() - 0.5) * 6

          // Create subtle gradient for bone texture
          const gradient = bumpCtx.createRadialGradient(
            x + offsetX,
            y + offsetY,
            0,
            x + offsetX,
            y + offsetY,
            bumpRadius
          )
          gradient.addColorStop(0, "#ffffff")
          gradient.addColorStop(0.5, "#f8f8f8")
          gradient.addColorStop(1, "#e8e8e8")

          bumpCtx.fillStyle = gradient
          bumpCtx.beginPath()
          bumpCtx.arc(x + offsetX, y + offsetY, bumpRadius, 0, Math.PI * 2)
          bumpCtx.fill()
        }
      }

      const bumpTexture = new THREE.CanvasTexture(bumpCanvas)
      bumpTexture.wrapS = THREE.RepeatWrapping
      bumpTexture.wrapT = THREE.RepeatWrapping
      bumpTexture.repeat.set(2, 2)

      // Bone white material with subtle texture
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xfefefe, // Brighter, almost pure white
        bumpMap: bumpTexture,
        bumpScale: 0.02, // Subtle bump
        emissive: 0xffffff,
        emissiveIntensity: 0.08, // Slightly increased self-illumination
        metalness: 0.0, // Non-metallic for bone appearance
        roughness: 0.3, // Slightly rough for bone texture
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        reflectivity: 0.5,
        ior: 1.5,
        sheen: 0.1,
        sheenRoughness: 0.5,
        sheenColor: 0xffffff,
      })


      // Create main cross - thin and tall
      const mainCrossGeometry = createPotentCrossGeometry(2.8, 2.8, 0.2, 0.15)
      const mainCross = new THREE.Mesh(mainCrossGeometry, material)
      mainCross.castShadow = true
      mainCross.receiveShadow = true
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
        cross.castShadow = true
        cross.receiveShadow = true

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

        // Pan back and forth across 90 degrees (π/2 radians)
        const panTime = Date.now() * 0.0003 // Slower panning speed
        const panAngle = Math.sin(panTime) * (Math.PI / 4) // -45° to +45° = 90° total
        crossGroup.rotation.y = panAngle

        // Keep subtle vertical tilt
        crossGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.02

        // Physics-based swinging motion for small crosses with mouse following
        const time = Date.now() * 0.001
        smallCrosses.forEach((cross, index) => {
          const physics = crossPhysics[index]
          const phaseOffset = index * Math.PI * 0.5

          // Update physics
          physics.velocity *= physics.damping
          physics.amplitude = Math.max(1, physics.amplitude * 0.98) // Gradually return to normal

          // Reduced swinging motion
          const swingAmplitude = 0.05 * physics.amplitude
          const swayAmplitude = 0.03 * physics.amplitude

          // Calculate direction from cross to mouse
          const crossWorldPos = new THREE.Vector3()
          cross.getWorldPosition(crossWorldPos)

          const dirToMouse = new THREE.Vector3()
            .subVectors(mouseWorld, crossWorldPos)
            .normalize()

          // Calculate tilt angles based on mouse direction
          const tiltStrength = 0.15 // Reduced tilt strength
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
