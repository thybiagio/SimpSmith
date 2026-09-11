// src/systems/collision.js

export function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

export function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  player.interactionAsset = null
  // monitor for character collision
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      player.interactionAsset = character
      break
    }
  }
}

// Mesmo padrão acima, mas para veios de minério.
// Usa um campo separado (player.nearbyOre) pra não conflitar com o
// diálogo de NPC — se o player estiver perto de um NPC E de um veio ao
// mesmo tempo, a tecla E prioriza o NPC (decisão feita no input.js).
export function checkForOreCollision({
  ores,
  player,
  oreOffset = { x: 0, y: 0 }
}) {
  player.nearbyOre = null

  for (let i = 0; i < ores.length; i++) {
    const ore = ores[i]
    if (ore.depleted) continue

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...ore,
          position: {
            x: ore.position.x + oreOffset.x,
            y: ore.position.y + oreOffset.y
          }
        }
      })
    ) {
      player.nearbyOre = ore
      break
    }
  }
}