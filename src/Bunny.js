import Animal from './Animal.js'
import Vector2D from './Vector2D.js'
import Color from './Color.js'
import { randomNumber } from './Utils.js'
/*
function normalRandom () {
  var pos = [Math.random(), Math.random()]
  while (Math.sin(pos[0] * Math.PI) > pos[1]) {
    pos = [ Math.random(), Math.random() ]
  }
  return pos[0]
}
*/
export default class Bunny extends Animal {
  constructor (x, y, population, gens) {
    super(x, y)
    this.hungry = 100
    this.population = population
    this.maxSize = 100
    if (gens) {
      this.gens = {
        VISGEN: gens.VISGEN + (randomNumber(2.5)),
        VECGEN: gens.VECGEN + (randomNumber(0.25)),
        REPGEN: gens.REPGEN + (randomNumber(0.25))
      }
    } else {
      this.gens = {
        VISGEN: Math.random() + 10,
        VECGEN: Math.random(),
        REPGEN: Math.random()
      }
    }

    this.color = new Color(this.gens.VISGEN, this.gens.VECGEN, this.gens.REPGEN).rgb()
    this.random = new Vector2D(randomNumber(500), randomNumber(500))
    this.random.add(this.position)
  }

  haveChilds () {
    let child = new Bunny(this.position.x + randomNumber(this.size * 2), this.position.y + randomNumber(this.size * 2), this.population, this.gens)
    this.population.push(child)
  }

  die () {
    this.population.splice(this.population.indexOf(this), 1)
  }

  getOld () {
    this.hungry -= this.gens.REPGEN * 0.1
    this.size = this.hungry / 10
    if (this.hungry <= 0) {
      this.die()
      return false
    } else return true
  }

  moveRandom () {
    if (Vector2D.sub(this.position, this.random).mag() < 10) {
      this.random = new Vector2D(randomNumber(1500), randomNumber(1500))
    }
    this.position.moveTowards(this.random, this.gens.VECGEN * 3)
  }

  findNearest (positions) {
    let relativo = positions.map((x) => Vector2D.sub(x, this.position))
    let distances = relativo.map((x) => x.mag())
    let distance = Math.min(...distances)

    let index = distances.indexOf(distance)
    let position = positions[index]

    return {distance, position, index}
  }

  think (food, foodPos, predatorsPos) {
    if (this.getOld()) {
      let nearestFood = this.findNearest(foodPos)
      let nearestPredator = this.findNearest(predatorsPos)

      if (nearestPredator.distance < this.gens.VISGEN * 10) {
        this.position.moveTowards(nearestPredator.position, -this.gens.VECGEN * 3)
        this.random = new Vector2D(randomNumber(1500), randomNumber(1500))
      } else if (nearestFood.distance < this.gens.VISGEN * 10) this.position.moveTowards(nearestFood.position, this.gens.VECGEN * 3)
      else this.moveRandom()

      if (nearestFood.distance < this.size * 2) {
        this.hungry += 5
        food.splice(nearestFood.index, 1)
        if (this.size >= this.maxSize) {
          this.hungry = 100
          this.haveChilds()
        }
        if (Math.random() < this.gens.REPGEN * 0.1) this.haveChilds()
      }
    }
  }
}
