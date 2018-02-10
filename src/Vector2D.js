export default class Vector2 {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  add (vector) {
    this.x += vector.x
    this.y += vector.y
  }
  sub (vector) {
    this.x -= vector.x
    this.y -= vector.y
  }
  mult (scalar) {
    this.x = this.x * scalar
    this.y = this.y * scalar
  }
  zero () {
    this.x = 0
    this.y = 0
  }
  random (x, y) {
    this.x = Math.random() * x
    this.y = Math.random() * y
  }
  inverse () {
    this.x = -1 * this.x
    this.y = -1 * this.y
  }
  addPolarAngle (angle) {
    let r = this.mag()
    let newAngle = this.polar() + angle
    this.x = r * Math.cos(newAngle)
    this.y = r * Math.sin(newAngle)
  }
  polar () {
    return Math.atan2(this.y, this.x)
  }
  copy () {
    return new Vector2(this.x, this.y)
  }
  limit (scalar) {
    let vr = new Vector2(0, 0)
    if (this.mag() > scalar) {
      vr = Vector2.normalize(this)
      vr.mult(scalar)
      this.x = vr.x
      this.y = vr.y
    }
  }
  equals (vector) {
    if (this.x === vector.x && this.y === vector.y) return true
    else return false
  }
  mag () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  moveTowards (vector, speed = 1, stop = 1) {
    let rest = Vector2.sub(vector, this)
    if (rest.mag() > stop) {
      rest = Vector2.normalize(rest)
      rest.mult(speed)
      this.add(rest)
    }
  }
  static inverse (v) {
    return new Vector2(-1 * v.x, -1 * v.y)
  }
  static distance (v1, v2) {
    return this.sub(v1, v2).mag()
  }
  static normalize (v) {
    let m = v.mag()
    if (isNaN(m) || m === 0) m = 1
    let vr = new Vector2(0, 0)
    vr.x = v.x / m
    vr.y = v.y / m
    return vr
  }
  static sub (v1, v2) {
    let v3 = new Vector2(0, 0)
    v3.x = v1.x - v2.x
    v3.y = v1.y - v2.y
    return v3
  }
}
