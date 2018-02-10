import Vector2D from './Vector2D.js'
import render from './render.js'
import { randomSign } from './Utils'

export default class Planta {
  constructor (x, y, gr, plantSize) {
    this.position = new Vector2D(x, y)
    this.plantSize = plantSize
    this.color = '#00FF00'
    this.gr = gr
    this.size = 3
    this.CHILDS = 0
  }
  display () {
    render.circle(this.position.x, this.position.y, this.size, this.color)
  }
  grow (plantas) {
    this.size += this.gr / 2

    if (this.size > this.plantSize) {
      this.size = 3
      if (plantas.length < 1000) {
        plantas.push(new Planta(this.position.x + randomSign(this.size * 7), this.position.y + randomSign(this.size * 7), this.gr, this.plantSize))
      }
    }

    if (this.size > 10 * (this.CHILDS + 1)) {
      if (plantas.length < 1000) {
        plantas.push(new Planta(this.position.x + randomSign(this.size * 7), this.position.y + randomSign(this.size * 7), this.gr, this.plantSize))
        this.CHILDS += 1
      }
    }
  }
}
