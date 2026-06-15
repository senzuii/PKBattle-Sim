import { Move } from '../../../types/Pokemon';

const dynamicpunch: Move = {
  id: 'dynamicpunch',
  name: 'Dynamic Punch',
  type: 'Fighting',
  category: 'Physical',
  power: 100,
  accuracy: 50,
  pp: 5,
  description: 'An attack that always confuses.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 100
  },
};

export default dynamicpunch;
