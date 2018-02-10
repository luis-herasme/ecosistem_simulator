import Vector2D from './Vector2D.js'
import render from './render.js'

export default class Animal {
  constructor (x, y) {
    this.position = new Vector2D(x, y)
  }

  display () {
    if (this.size > 0) {
      if (!this.coyote) {
        render.circleText(this.position.x, this.position.y, this.size, this.color, this.hungry)
        // render.strokeCircle(this.position.x, this.position.y, this.gens.VISGEN * 10, this.color, 0.2)
      } else {
        render.rect(this.position.x, this.position.y, this.size, this.size, this.color)
        render.text(this.hungry.toFixed(2), this.position.x, this.position.y, '#fff', 'center')
      }
    }
  }
}
