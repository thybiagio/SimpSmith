// src/entities/OreVein.js
import { c } from '../canvas.js'
import { getOreData } from '../data/ores.js'
import { TILE_SIZE } from '../config.js'

export class OreVein {
  constructor({ position, oreType }) {
    this.position = position
    this.oreType = oreType
    this.data = getOreData(oreType)
    this.hitsRemaining = this.data.hitsToBreak
    this.depleted = false
    this.width = TILE_SIZE
    this.height = TILE_SIZE
  }

  // Chamado a cada golpe (tecla E) enquanto o jogador estiver perto do veio.
  // Retorna true no golpe que esgota o veio (pra sinalizar "minério coletado").
  hit() {
    if (this.depleted) return false

    this.hitsRemaining -= 1
    if (this.hitsRemaining <= 0) {
      this.depleted = true
      return true
    }
    return false
  }

  draw() {
    if (this.depleted) return

    c.fillStyle = this.data.color
    c.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE)

    c.strokeStyle = 'black'
    c.lineWidth = 2
    c.strokeRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE)
  }
}