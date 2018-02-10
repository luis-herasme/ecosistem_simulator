import render from './render'
import Bunny from './Bunny'
import Plant from './Plant'
import Coyote from './Coyote'

let mouse = {
  x: 0,
  y: 0
}

export default function initEvents (conejos, plantas, coyotes) {
  let last = {
    w: 0,
    a: 0,
    s: 0,
    d: 0
  }

  document.addEventListener('keyup', function (e) {
    if (e.key === 'w') {
      last.w = 0
    } else if (e.key === 's') {
      last.s = 0
    } else if (e.key === 'a') {
      last.a = 0
    } else if (e.key === 'd') {
      last.d = 0
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'g') {
      //  generate()
    }
    if (e.key === 'w') {
      last.w += 1
      render.pos.y += 25 + last.w
      render.context.translate(0, 25 + last.w)
    }
    if (e.key === 's') {
      last.s += 1
      render.pos.y -= 25 + last.s
      render.context.translate(0, -25 - last.s)
    }
    if (e.key === 'd') {
      last.d += 1
      render.pos.x -= 25 + last.d
      render.context.translate(-25 - last.d, 0)
    }
    if (e.key === 'a') {
      last.a += 1
      render.pos.x += 25 + last.a
      render.context.translate(25 + last.a, 0)
    }
    if (e.key === '+') {
      render.scale.scale += 0.1
    }
    if (e.key === '-') {
      render.scale.scale -= 0.1
    }
    if (e.key === 'r') {
      coyotes.push(new Coyote((mouse.x - render.pos.x) / render.scale.scale, (mouse.y - render.pos.y) / render.scale.scale))
    }
  })
  document.addEventListener('click', addPlant)
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    conejos.push(new Bunny((e.clientX - render.pos.x) / render.scale.scale, (e.clientY - render.pos.y) / render.scale.scale, conejos))
  })

  function addPlant (e) {
    plantas.push(new Plant((e.clientX - render.pos.x) / render.scale.scale, (e.clientY - render.pos.y) / render.scale.scale, 0.05, 15))
  }
}
