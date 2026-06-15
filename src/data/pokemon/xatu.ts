import { PokemonBase } from '../../types/Pokemon';

export const xatu: PokemonBase = {
  id: 'xatu',
  name: 'Xatu',
  types: ['Psychic', 'Flying'],
  baseStats: {
    hp: 65,
    atk: 75,
    def: 70,
    spa: 95,
    spd: 70,
    spe: 95,
  },
  abilities: ['Synchronize', 'Early Bird', 'Magic Bounce'],
  learnset: [
    { level: 0, moveId: 'airslash' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'peck' },
    { level: 1, moveId: 'teleport' },
    { level: 1, moveId: 'nightshade' },
    { level: 1, moveId: 'tailwind' },
    { level: 1, moveId: 'storedpower' },
    { level: 12, moveId: 'luckychant' },
    { level: 15, moveId: 'confuseray' },
    { level: 17, moveId: 'miracleeye' },
    { level: 20, moveId: 'mefirst' },
    { level: 20, moveId: 'ominouswind' },
    { level: 28, moveId: 'psychoshift' },
    { level: 29, moveId: 'wish' },
    { level: 34, moveId: 'powerswap' },
    { level: 34, moveId: 'guardswap' },
    { level: 35, moveId: 'psychic' },
    { level: 35, moveId: 'futuresight' }
  ]
};
