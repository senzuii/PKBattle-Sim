import { PokemonBase } from '../../types/Pokemon';

export const yanma: PokemonBase = {
  id: 'yanma',
  name: 'Yanma',
  types: ['Bug', 'Flying'],
  baseStats: {
    hp: 65,
    atk: 65,
    def: 45,
    spa: 75,
    spd: 45,
    spe: 95,
  },
  abilities: ['Speed Boost', 'Compound Eyes', 'Frisk'],
  learnset: [
    { level: 1, moveId: 'gust' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'foresight' },
    { level: 11, moveId: 'doubleteam' },
    { level: 11, moveId: 'silverwind' },
    { level: 14, moveId: 'sonicboom' },
    { level: 14, moveId: 'aircutter' },
    { level: 14, moveId: 'aerialace' },
    { level: 17, moveId: 'detect' },
    { level: 18, moveId: 'hypnosis' },
    { level: 22, moveId: 'supersonic' },
    { level: 25, moveId: 'airslash' },
    { level: 27, moveId: 'uproar' },
    { level: 30, moveId: 'stringshot' },
    { level: 30, moveId: 'pursuit' },
    { level: 30, moveId: 'bugbite' },
    { level: 33, moveId: 'ancientpower' },
    { level: 37, moveId: 'wingattack' },
    { level: 37, moveId: 'swift' },
    { level: 43, moveId: 'screech' },
    { level: 43, moveId: 'bugbuzz' },
    { level: 49, moveId: 'uturn' }
  ]
};
