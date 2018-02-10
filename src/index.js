import Bunny from './Bunny'
import Plant from './Plant'
import Coyote from './Coyote'
import events from './events'
import render from './Render'
import { start } from './charts'
import { randomNumber } from './Utils'

let plantas = []
let coyotes = []
let conejos = []

for (let i = 0; i < 100; i++) {
  plantas.push(new Plant(randomNumber(window.innerWidth * 1), randomNumber(window.innerHeight * 1), 0.24, 15))
  conejos.push(new Bunny(randomNumber(window.innerWidth * 1), randomNumber(window.innerHeight * 1), conejos))
}
for (let i = 0; i < 25; i++) {
  coyotes.push(new Coyote(randomNumber(window.innerWidth * 1), randomNumber(window.innerHeight * 1)))
}

events(conejos, plantas, coyotes)
start(plantas, conejos, coyotes)

setInterval(() => {
  render.clear('#111')

  let posicionesPlantas = plantas.map((x) => x.position)
  let posicionesCoyotes = coyotes.map((x) => x.position)
  let posicionesConejos = conejos.map((x) => x.position)

  if (conejos.length < 10) conejos.push(new Bunny(randomNumber(window.innerWidth), randomNumber(window.innerHeight), conejos))
  if (plantas.length < 400) {
    for (; plantas.length < 400;) plantas.push(new Plant(randomNumber(window.innerWidth * 1), randomNumber(window.innerHeight * 1), 0.5, 15))
  }

  plantas.forEach((x) => {
    x.display()
    x.grow(plantas)
  })

  conejos.forEach((conejo) => {
    conejo.think(plantas, posicionesPlantas, posicionesCoyotes)
    conejo.display()
  })

  coyotes.forEach((coyote) => {
    coyote.think(conejos, posicionesConejos, coyotes)
    coyote.display()
  })
}, 0)
