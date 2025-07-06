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

      // Minimal ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
      scene.add(ambientLight)

      // Main spotlight from top right to bottom left
      const spotlight = new THREE.SpotLight(0xffffff, 2.5)
      spotlight.position.set(8, 8, 10) // Top right position
      spotlight.target.position.set(-2, -2, 0) // Aim toward bottom left
      spotlight.angle = Math.PI / 6 // 30 degree cone
      spotlight.penumbra = 0.3 // Soft edges
      spotlight.decay = 1.5
      spotlight.distance = 30
      spotlight.castShadow = true
      scene.add(spotlight)
      scene.add(spotlight.target)

      // Add brighter white light to enhance white piping
      const whiteLight = new THREE.PointLight(0xffffff, 0.5, 20)
      whiteLight.position.set(0, 0, 5)
      scene.add(whiteLight)

      // Subtle fill light to prevent complete darkness
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
      fillLight.position.set(-5, -5, 5)
      scene.add(fillLight)

      // Rim light for edge definition
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.5)
      rimLight.position.set(0, 0, -10)
      scene.add(rimLight)

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

      // Create white bump map for jet black surface
      const textureSize = 512
      const bumpCanvas = document.createElement("canvas")
      bumpCanvas.width = textureSize
      bumpCanvas.height = textureSize
      const bumpCtx = bumpCanvas.getContext("2d")!

      // Black background (no bump)
      bumpCtx.fillStyle = "#000000"
      bumpCtx.fillRect(0, 0, textureSize, textureSize)

      // White raised bumps
      const bumpRadius = 20
      const spacing = 48

      for (let x = bumpRadius; x < textureSize; x += spacing) {
        for (let y = bumpRadius; y < textureSize; y += spacing) {
          // Add some offset for organic feel
          const offsetX = (Math.random() - 0.5) * 4
          const offsetY = (Math.random() - 0.5) * 4

          // Create gradient for raised bump effect (white = raised)
          const gradient = bumpCtx.createRadialGradient(
            x + offsetX,
            y + offsetY,
            0,
            x + offsetX,
            y + offsetY,
            bumpRadius
          )
          gradient.addColorStop(0, "#ffffff")
          gradient.addColorStop(0.7, "#808080")
          gradient.addColorStop(1, "#000000")

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

      // Jet black material
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x0A0A0A, // Jet black matching the CSS
        bumpMap: bumpTexture, // White bumps on black surface
        bumpScale: 0.05,
        emissive: 0x000000,
        emissiveIntensity: 0.0,
        metalness: 0.95,
        roughness: 0.05, // Very low for high gloss
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        reflectivity: 1.0,
        ior: 2.4,
        anisotropy: 0.8,
        anisotropyRotation: Math.PI / 4,
        sheen: 0.3,
        sheenRoughness: 0.2,
        sheenColor: 0x111111,
      })

      // White material for edge piping - clean and bright
      const whiteMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // White
        emissive: 0xffffff,
        emissiveIntensity: 1, // Increased brightness
        metalness: 0.0,
        roughness: 0.0, // Smoother for more shine
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        reflectivity: 1.0,
      })

      // Helper function to create white piping on all edges
      const createWhitePiping = (
        geometry: THREE.ExtrudeGeometry,
        thickness: number = 0.02
      ) => {
        // Create edges geometry for all edges
        const edges = new THREE.EdgesGeometry(geometry, 1) // Low angle to get ALL edges

        // Convert edges to a tube geometry for thick piping
        const pipingGroup = new THREE.Group()

        // Get positions from edges geometry
        const positions = edges.attributes.position.array

        // Create tubes for each edge
        for (let i = 0; i < positions.length; i += 6) {
          const start = new THREE.Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          )
          const end = new THREE.Vector3(
            positions[i + 3],
            positions[i + 4],
            positions[i + 5]
          )

          // Create path for tube
          const path = new THREE.LineCurve3(start, end)
          const tubeGeometry = new THREE.TubeGeometry(
            path,
            2,
            thickness,
            8,
            false
          )

          const tubeMesh = new THREE.Mesh(tubeGeometry, whiteMaterial)
          pipingGroup.add(tubeMesh)
        }

        return pipingGroup
      }

      // Create main cross - thin and tall
      const mainCrossGeometry = createPotentCrossGeometry(2.8, 2.8, 0.2, 0.15)
      const mainCross = new THREE.Mesh(mainCrossGeometry, material)
      scene.add(mainCross)

      // No white piping - removed for cleaner look

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

        // No white piping - removed for cleaner look

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
