// src/data/oresMapData.js
import { charactersMapData } from './characters.js'
import { OreType } from './ores.js'
import { MAP_COLUMNS } from '../config.js'

// Símbolo numérico de cada minério no mapa (mesma lógica do 1025/1026/1031
// usados em collisions.js/characters.js, só que numa faixa própria pra não colidir)
export const OreSymbol = {
  [OreType.COAL]: 2000,
  [OreType.COPPER]: 2001,
  [OreType.IRON]: 2002,
  [OreType.GOLD]: 2003,
  [OreType.SILVER]: 2004,
  [OreType.MITHRIL]: 2005,
  [OreType.ADAMANTITE]: 2006,
}

// Caminho inverso: a partir do símbolo do mapa, descobrir qual OreType é
export const OreSymbolToType = Object.fromEntries(
  Object.entries(OreSymbol).map(([type, symbol]) => [symbol, type])
)

// Mapa de minérios: começa tudo vazio (mesmo tamanho do mapa de personagens)
export const oresMapData = new Array(charactersMapData.length).fill(0)

function setOre(row, col, oreType) {
  oresMapData[row * MAP_COLUMNS + col] = OreSymbol[oreType]
}

// Veios de teste, colocados perto do Villager (que está na linha 35, coluna 19)
// pra você achar fácil no jogo. Se cair em cima de parede/água, é só mudar a coluna.
setOre(18, 22, OreType.COAL)
setOre(18, 23, OreType.COPPER)
setOre(18, 24, OreType.IRON)