import Animal from './Animal'
import Vector2D from './Vector2D'
import { randomNumber } from './Utils'

export default class Coyote extends Animal {
  constructor (x, y, v) {
    super(x, y)
    this.hungry = 100
    this.color = '#ff0000'
    this.coyote = true
    this.size = 10
    this.maxVelocity = Math.random() * 6
    if (v) this.maxVelocity = v + (randomNumber(Math.random() * 0.5))
    this.random = new Vector2D(randomNumber(200), randomNumber(200))
    this.random.add(this.position)
  }

  moveRandom () {
    if (Vector2D.sub(this.position, this.random).mag() < 10) {
      this.random = new Vector2D(randomNumber(200), randomNumber(200))
      this.random.add(this.position)
    }
    this.position.moveTowards(this.random, this.maxVelocity)
  }

  findNearest (positions) {
    let relativo = positions.map((x) => Vector2D.sub(x, this.position))
    let distances = relativo.map((x) => x.mag())
    let distance = Math.min(...distances)

    let index = distances.indexOf(distance)
    let position = positions[index]

    return {distance, position, index}
  }

  haveChilds (population) {
    population.push(new Coyote(this.position.x + randomNumber(this.size * 2), this.position.y + randomNumber(this.size * 2), this.maxVelocity))
  }

  think (comida, posiciones, poblacion) {
    this.hungry -= 0.3 * (100 / poblacion.length)
    let nearestFood = this.findNearest(posiciones)

    if (nearestFood.distance < this.size) {
      this.size += 5
      this.hungry += 10
      comida.splice(nearestFood.index, 1)
      if (this.size > 25) {
        this.size = 10
        this.haveChilds(poblacion)
      }
    } else {
      if (this.hungry <= 0) poblacion.splice(poblacion.indexOf(this), 1)
      if (nearestFood.distance < 200) this.position.moveTowards(nearestFood.position, this.maxVelocity)
      else this.moveRandom()
    }
  }
}
