// src/data/ores.js

// Identificadores únicos de cada tipo de minério.
// Usar constantes evita erro de digitação ao referenciar o minério em outros arquivos.
export const OreType = {
  COAL: 'coal',
  COPPER: 'copper',
  IRON: 'iron',
  GOLD: 'gold',
  SILVER: 'silver',
  MITHRIL: 'mithril',
  ADAMANTITE: 'adamantite',
};

// Dados de cada minério, baseados na seção 5.3 do GDD.
// - name: nome exibido (pt-BR)
// - tier: ordem de progressão (1 = mais básico, 7 = mais raro), usado depois
//         para decidir quais minas/regiões liberam qual minério
// - hitsToBreak: quantos golpes (pressionar E) até o veio ser minerado
// - baseValue: valor de venda base, usado futuramente pelo sistema econômico
// - color: cor provisória do veio no canvas, até termos sprite
export const ores = {
  [OreType.COAL]: {
    id: OreType.COAL,
    name: 'Carvão',
    tier: 1,
    hitsToBreak: 2,
    baseValue: 2,
    color: '#2b2b2b',
  },
  [OreType.COPPER]: {
    id: OreType.COPPER,
    name: 'Cobre',
    tier: 1,
    hitsToBreak: 3,
    baseValue: 4,
    color: '#c07a4a',
  },
  [OreType.IRON]: {
    id: OreType.IRON,
    name: 'Ferro',
    tier: 2,
    hitsToBreak: 4,
    baseValue: 8,
    color: '#8d8d8d',
  },
  [OreType.GOLD]: {
    id: OreType.GOLD,
    name: 'Ouro',
    tier: 3,
    hitsToBreak: 5,
    baseValue: 20,
    color: '#e6c229',
  },
  [OreType.SILVER]: {
    id: OreType.SILVER,
    name: 'Prata',
    tier: 3,
    hitsToBreak: 5,
    baseValue: 16,
    color: '#d7d9dd',
  },
  [OreType.MITHRIL]: {
    id: OreType.MITHRIL,
    name: 'Mithril',
    tier: 4,
    hitsToBreak: 7,
    baseValue: 45,
    color: '#4fd0c9',
  },
  [OreType.ADAMANTITE]: {
    id: OreType.ADAMANTITE,
    name: 'Adamantita',
    tier: 5,
    hitsToBreak: 9,
    baseValue: 80,
    color: '#7d3cff',
  },
};

// Função utilitária: retorna os dados de um minério a partir do id.
// Vai ser útil no inventário/crafting mais pra frente.
export function getOreData(oreId) {
  return ores[oreId] ?? null;
}