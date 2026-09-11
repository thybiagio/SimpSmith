// src/systems/input.js
import { keys, setLastKey } from '../state.js'
import { audio } from '../data/audio.js'

export function setupInput(player) {
  window.addEventListener('keydown', (e) => {
    if (player.isInteracting) {
      switch (e.key) {
        case ' ':
          player.interactionAsset.dialogueIndex++

          const { dialogueIndex, dialogue } = player.interactionAsset
          if (dialogueIndex <= dialogue.length - 1) {
            document.querySelector('#characterDialogueBox').innerHTML =
              player.interactionAsset.dialogue[dialogueIndex]
            return
          }

          // finish conversation
          player.isInteracting = false
          player.interactionAsset.dialogueIndex = 0
          document.querySelector('#characterDialogueBox').style.display = 'none'

          break
      }
      return
    }

    switch (e.key) {
      case 'e':
        // Prioridade 1: NPC com diálogo (comportamento já existente)
        if (player.interactionAsset) {
          const firstMessage = player.interactionAsset.dialogue[0]
          document.querySelector('#characterDialogueBox').innerHTML = firstMessage
          document.querySelector('#characterDialogueBox').style.display = 'flex'
          player.isInteracting = true
          break
        }

        // Prioridade 2: veio de minério por perto
        if (player.nearbyOre && !player.nearbyOre.depleted) {
          const ore = player.nearbyOre
          const mined = ore.hit()

          if (mined) {
            // Só um log por enquanto — é aqui que o inventário vai entrar depois
            console.log(`Minerou: ${ore.data.name} (+${ore.data.baseValue} de valor base)`)
            player.nearbyOre = null
          }
        }
        break
      case 'w':
        keys.w.pressed = true
        setLastKey('w')
        break
      case 'a':
        keys.a.pressed = true
        setLastKey('a')
        break
      case 's':
        keys.s.pressed = true
        setLastKey('s')
        break
      case 'd':
        keys.d.pressed = true
        setLastKey('d')
        break
    }
  })

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 's':
        keys.s.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
    }
  })

  let clicked = false
  addEventListener('click', () => {
    if (!clicked) {
      audio.Map.play()
      clicked = true
    }
  })
}