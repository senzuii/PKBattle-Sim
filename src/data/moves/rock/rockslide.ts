import { Move } from '../../../types/Pokemon';

const rockslide: Move = {
  id: 'rockslide',
  name: 'Rock Slide',
  type: 'Rock',
  category: 'Physical',
  power: 75,
  accuracy: 90,
  pp: 10,
  description: 'An attack that may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default rockslide;
