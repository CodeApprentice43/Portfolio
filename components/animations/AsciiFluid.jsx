"use client"

import { useEffect, useRef } from 'react'

export const AsciiFluid = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    // ASCII characters for density mapping - subtle but visible
    const density = ' .·∘○'

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Balanced grid spacing
    const cols = Math.floor(canvas.width / 20)
    const rows = Math.floor(canvas.height / 25)

    const draw = () => {
      ctx.fillStyle = '#0D1117'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '10px monospace'
      time += 0.015 // Slow but noticeable animation

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 20
          const y = j * 25

          // Create gentle fluid wave effect
          const wave1 = Math.sin(i * 0.12 + time) * Math.cos(j * 0.12 + time * 0.4)
          const wave2 = Math.sin(i * 0.06 + j * 0.06 + time * 0.6)

          // Combine waves for subtle motion
          const wave = (wave1 + wave2) / 2

          // Map wave value to ASCII character
          const charIndex = Math.floor(((wave + 1) / 2) * (density.length - 1))
          const char = density[charIndex]

          // Visible but not distracting
          const intensity = (wave + 1) / 2

          // Show characters in wave ranges - more visible
          if (intensity > 0.45) {
            const alpha = 0.2 + intensity * 0.35 // More visible opacity
            ctx.fillStyle = `rgba(31, 111, 235, ${alpha})` // Using theme blue #1F6FEB
            ctx.fillText(char, x, y)
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
