import { PokemonBase } from '../../types/Pokemon';

export const politoed: PokemonBase = {
  id: 'politoed',
  name: 'Politoed',
  types: ['Water'],
  baseStats: {
    hp: 90,
    atk: 75,
    def: 75,
    spa: 90,
    spd: 100,
    spe: 70,
  },
  abilities: ['Water Absorb', 'Damp', 'Drizzle'],
  learnset: [
    { level: 0, moveId: 'bounce' },
    { level: 1, moveId: 'pound' },
    { level: 1, moveId: 'doubleslap' },
    { level: 1, moveId: 'bodyslam' },
    { level: 1, moveId: 'doubleedge' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'hydropump' },
    { level: 1, moveId: 'bubblebeam' },
    { level: 1, moveId: 'hypnosis' },
    { level: 1, moveId: 'bellydrum' },
    { level: 1, moveId: 'perishsong' },
    { level: 1, moveId: 'swagger' },
    { level: 1, moveId: 'raindance' },
    { level: 1, moveId: 'hypervoice' },
    { level: 1, moveId: 'mudshot' },
    { level: 1, moveId: 'earthpower' }
  ]
};
