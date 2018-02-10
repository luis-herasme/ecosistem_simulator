const canvasWindow = document.getElementById('lienzo')

let pos = { x: 0, y: 0 }

canvasWindow.width = window.innerWidth
canvasWindow.height = window.innerHeight

const context = canvasWindow.getContext('2d')
context.font = '10px Arial'
context.textAlign = 'center'

let scale = {
  scale: 1
}

function rect (x, y, w, h, color) {
  x = x * scale.scale
  y = y * scale.scale
  h = h * scale.scale
  w = w * scale.scale
  context.beginPath()
  context.fillStyle = color
  context.rect(x, y, w, h)
  context.stroke()
  context.fill()
}

function text (texto, x, y, color) {
  x = x * scale.scale
  y = y * scale.scale
  context.fillStyle = color
  context.fillText(texto, x, y)
}

function circleText (positionX, positionY, size, color, texto) {
  positionX = positionX * scale.scale
  positionY = positionY * scale.scale
  size = size * scale.scale
  context.beginPath()
  context.fillStyle = color
  context.arc(positionX, positionY, size, 0, 2 * Math.PI)
  context.lineWidth = 5
  context.stroke()
  context.fill()
  if (texto) {
    context.fillStyle = '#ffffff'
    context.fillText(texto.toFixed(2), positionX, positionY - size)
  }
}

function circle (x, y, size, color) {
  x = x * scale.scale
  y = y * scale.scale
  size = size * scale.scale
  context.beginPath()
  context.fillStyle = color
  context.arc(x, y, size, 0, 2 * Math.PI)
  context.fill()
}

function strokeCircle (x, y, size, color, a) {
  /*
  if (a) {
    context.save()
    context.globalAlpha = a
  }
  */
  x = x * scale.scale
  y = y * scale.scale
  size = size * scale.scale
  context.strokeStyle = color
  context.beginPath()
  context.arc(x, y, size, 0, 2 * Math.PI)
  context.lineWidth = 5
  context.stroke()
  context.strokeStyle = '#000'
  /*
  if (a) {
    context.restore()
    context.globalAlpha = 1
  }
  */
}

function clear (color = '#2F2F3F') {
  context.fillStyle = color
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.fillRect(0, 0, canvasWindow.width, canvasWindow.height)
  context.restore()
}

module.exports = { strokeCircle, scale, text, circleText, circle, rect, clear, context, pos }
