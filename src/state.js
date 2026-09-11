// src/state.js
// Estado compartilhado do jogo (o que hoje vivia solto no index.js
// como variável global: `keys` e `lastKey`).

export const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}

// lastKey precisa de get/set porque, em ES Modules, quem importa
// uma variável não pode reatribuir o valor dela diretamente —
// só quem exporta pode mudar. Por isso os dois helpers abaixo.
let lastKey = ''

export function getLastKey() {
  return lastKey
}

export function setLastKey(key) {
  lastKey = key
}