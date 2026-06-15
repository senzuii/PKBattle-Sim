import { Move } from '../../../types/Pokemon';

const bite: Move = {
  id: 'bite',
  name: 'Bite',
  type: 'Dark',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 25,
  description: 'An attack that may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default bite;
