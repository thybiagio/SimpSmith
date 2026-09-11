// src/config.js
// Constantes de configuração do jogo — tudo que hoje estava
// espalhado como número solto ("magic number") no index.js.

export const TILE_SIZE = 48       // tamanho de cada tile do mapa, em pixels
export const MAP_COLUMNS = 70     // quantas colunas tem cada linha do mapa

export const CANVAS_WIDTH = 1024
export const CANVAS_HEIGHT = 576

// deslocamento inicial do mapa/câmera em relação ao canvas
export const MAP_OFFSET = {
  x: -735,
  y: -650
}