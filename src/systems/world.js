// src/systems/world.js
import { Boundary } from '../entities/Boundary.js'
import { Character } from '../entities/Character.js'
import { OreVein } from '../entities/OreVein.js'
import { collisions } from '../data/collisions.js'
import { charactersMapData } from '../data/characters.js'
import { oresMapData, OreSymbolToType } from '../data/oresMapData.js'
import { MAP_OFFSET, MAP_COLUMNS } from '../config.js'

export function buildWorld() {
  const collisionsMap = []
  for (let i = 0; i < collisions.length; i += MAP_COLUMNS) {
    collisionsMap.push(collisions.slice(i, MAP_COLUMNS + i))
  }

  const charactersMap = []
  for (let i = 0; i < charactersMapData.length; i += MAP_COLUMNS) {
    charactersMap.push(charactersMapData.slice(i, MAP_COLUMNS + i))
  }

  const oresMap = []
  for (let i = 0; i < oresMapData.length; i += MAP_COLUMNS) {
    oresMap.push(oresMapData.slice(i, MAP_COLUMNS + i))
  }

  const boundaries = []

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025)
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + MAP_OFFSET.x,
              y: i * Boundary.height + MAP_OFFSET.y
            }
          })
        )
    })
  })

  const characters = []
  const villagerImg = new Image()
  villagerImg.src = './img/villager/Idle.png'

  const oldManImg = new Image()
  oldManImg.src = './img/oldMan/Idle.png'

  charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      // 1026 === villager
      if (symbol === 1026) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + MAP_OFFSET.x,
              y: i * Boundary.height + MAP_OFFSET.y
            },
            image: villagerImg,
            frames: { max: 4, hold: 60 },
            scale: 3,
            animate: true,
            dialogue: ['...', 'Estou cansado!']
          })
        )
      }
      // 1031 === oldMan
      else if (symbol === 1031) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + MAP_OFFSET.x,
              y: i * Boundary.height + MAP_OFFSET.y
            },
            image: oldManImg,
            frames: { max: 4, hold: 60 },
            scale: 3,
            dialogue: ['Meus Ossos Doem.']
          })
        )
      }

      if (symbol !== 0) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + MAP_OFFSET.x,
              y: i * Boundary.height + MAP_OFFSET.y
            }
          })
        )
      }
    })
  })

  // Veios de minério: mesmo padrão dos personagens (posição + boundary própria,
  // pra bloquear passagem e obrigar o jogador a interagir de um tile ao lado)
  const ores = []

  oresMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 0) return

      const oreType = OreSymbolToType[symbol]
      if (!oreType) return

      ores.push(
        new OreVein({
          position: {
            x: j * Boundary.width + MAP_OFFSET.x,
            y: i * Boundary.height + MAP_OFFSET.y
          },
          oreType
        })
      )

      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + MAP_OFFSET.x,
            y: i * Boundary.height + MAP_OFFSET.y
          }
        })
      )
    })
  })

  return { boundaries, characters, ores }
}