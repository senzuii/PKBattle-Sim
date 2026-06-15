import { PokemonBase } from '../../types/Pokemon';

export const natu: PokemonBase = {
  id: 'natu',
  name: 'Natu',
  types: ['Psychic', 'Flying'],
  baseStats: {
    hp: 40,
    atk: 50,
    def: 45,
    spa: 70,
    spd: 45,
    spe: 70,
  },
  abilities: ['Synchronize', 'Early Bird', 'Magic Bounce'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'peck' },
    { level: 5, moveId: 'storedpower' },
    { level: 6, moveId: 'nightshade' },
    { level: 9, moveId: 'teleport' },
    { level: 12, moveId: 'luckychant' },
    { level: 15, moveId: 'confuseray' },
    { level: 17, moveId: 'miracleeye' },
    { level: 20, moveId: 'mefirst' },
    { level: 20, moveId: 'ominouswind' },
    { level: 26, moveId: 'psychoshift' },
    { level: 28, moveId: 'wish' },
    { level: 30, moveId: 'futuresight' },
    { level: 30, moveId: 'powerswap' },
    { level: 33, moveId: 'psychic' },
    { level: 35, moveId: 'guardswap' }
  ]
};
