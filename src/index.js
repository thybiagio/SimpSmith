// src/main.js
import { canvas, c } from './canvas.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config.js'
import { keys, getLastKey } from './state.js'
import { Sprite } from './entities/Sprite.js'
import { buildWorld } from './systems/world.js'
import { setupInput } from './systems/input.js'
import { rectangularCollision, checkForCharacterCollision } from './systems/collision.js'

const { boundaries, characters } = buildWorld()

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
  position: {
    x: CANVAS_WIDTH / 2 - 192 / 4 / 2,
    y: CANVAS_HEIGHT / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: { max: 4, hold: 10 },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: { x: 0, y: 0 },
  image
})

const foreground = new Sprite({
  position: { x: 0, y: 0 },
  image: foregroundImage
})

// posiciona background/foreground no mesmo offset usado pelo mundo
import { MAP_OFFSET } from './config.js'
background.position.x = MAP_OFFSET.x
background.position.y = MAP_OFFSET.y
foreground.position.x = MAP_OFFSET.x
foreground.position.y = MAP_OFFSET.y

const movables = [background, ...boundaries, foreground, ...characters]
const renderables = [background, ...boundaries, ...characters, player, foreground]

setupInput(player)

function animate() {
  window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  const lastKey = getLastKey()

  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({ characters, player, characterOffset: { x: 0, y: 3 } })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y + 3 }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving) movables.forEach((movable) => { movable.position.y += 3 })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({ characters, player, characterOffset: { x: 3, y: 0 } })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x + 3, y: boundary.position.y }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving) movables.forEach((movable) => { movable.position.x += 3 })
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({ characters, player, characterOffset: { x: 0, y: -3 } })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y - 3 }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving) movables.forEach((movable) => { movable.position.y -= 3 })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({ characters, player, characterOffset: { x: -3, y: 0 } })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x - 3, y: boundary.position.y }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving) movables.forEach((movable) => { movable.position.x -= 3 })
  }
}

animate()