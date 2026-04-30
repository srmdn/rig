export function animateFavicon() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')!

  const DURATION = 2000 // ms — matches SVG animation

  function drawFrame(timestamp: number) {
    const progress = (timestamp % DURATION) / DURATION

    // opacity curve: 0→0.75 over first 8%, hold, 0.75→0 over last 12%
    let opacity = 0
    if (progress < 0.08) opacity = (progress / 0.08) * 0.75
    else if (progress < 0.88) opacity = 0.75
    else opacity = ((1 - progress) / 0.12) * 0.75

    const scanY = progress * 24 // translateY 0→24px

    ctx.clearRect(0, 0, 32, 32)

    // background with rounded corners
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.roundRect(0, 0, 32, 32, 4)
    ctx.fill()

    // R glyph
    ctx.fillStyle = '#cfcecd'
    ctx.fillRect(6, 5, 5, 22)        // stem
    ctx.fillRect(11, 5, 10, 4)       // top bar
    ctx.beginPath()
    ctx.roundRect(19, 5, 4, 13, 2)   // bowl right (rx=2)
    ctx.fill()
    ctx.fillRect(11, 14, 10, 4)      // mid bar
    ctx.beginPath()                  // leg
    ctx.moveTo(11, 18)
    ctx.lineTo(16, 18)
    ctx.lineTo(27, 27)
    ctx.lineTo(22, 27)
    ctx.closePath()
    ctx.fill()

    // scanline clipped to icon bounds
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(0, 0, 32, 32, 4)
    ctx.clip()
    ctx.fillStyle = `rgba(245,245,245,${opacity})`
    ctx.fillRect(3, 4 + scanY, 26, 1.5)
    ctx.restore()

    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (link) link.href = canvas.toDataURL()

    requestAnimationFrame(drawFrame)
  }

  requestAnimationFrame(drawFrame)
}
