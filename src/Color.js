export default class Color {
  constructor (r, g, b) {
    this.r = Math.round(r * 255)
    if (this.r >= 255) this.r = 255
    this.g = Math.round(g * 255)
    if (this.g >= 255) this.g = 255
    this.b = Math.round(b * 255)
    if (this.b >= 255) this.b = 255
  }
  rgb () {
    return `rgba(${this.r}, ${this.g}, ${this.b}, 1)`
  }
}
