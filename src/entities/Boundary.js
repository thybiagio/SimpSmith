// src/entities/Boundary.js
import { c } from '../canvas.js'
import { TILE_SIZE } from '../config.js'

export class Boundary {
  static width = TILE_SIZE
  static height = TILE_SIZE

  constructor({ position }) {
    this.position = position
    this.width = TILE_SIZE
    this.height = TILE_SIZE
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}