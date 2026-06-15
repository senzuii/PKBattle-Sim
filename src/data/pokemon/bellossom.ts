import { PokemonBase } from '../../types/Pokemon';

export const bellossom: PokemonBase = {
  id: 'bellossom',
  name: 'Bellossom',
  types: ['Grass'],
  baseStats: {
    hp: 75,
    atk: 80,
    def: 95,
    spa: 90,
    spd: 100,
    spe: 50,
  },
  abilities: ['Chlorophyll', 'Healer'],
  learnset: [
    { level: 0, moveId: 'magicalleaf' },
    { level: 0, moveId: 'petalblizzard' },
    { level: 1, moveId: 'acid' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'megadrain' },
    { level: 1, moveId: 'growth' },
    { level: 1, moveId: 'poisonpowder' },
    { level: 1, moveId: 'stunspore' },
    { level: 1, moveId: 'sleeppowder' },
    { level: 1, moveId: 'petaldance' },
    { level: 1, moveId: 'toxic' },
    { level: 1, moveId: 'gigadrain' },
    { level: 1, moveId: 'sweetscent' },
    { level: 1, moveId: 'moonlight' },
    { level: 1, moveId: 'sunnyday' },
    { level: 1, moveId: 'leafblade' },
    { level: 1, moveId: 'leafstorm' },
    { level: 1, moveId: 'quiverdance' },
    { level: 1, moveId: 'grassyterrain' },
    { level: 1, moveId: 'moonblast' },
    { level: 55, moveId: 'solarbeam' }
  ]
};
