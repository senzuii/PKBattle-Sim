import { Move } from '../../../types/Pokemon';

const hyperfang: Move = {
  id: 'hyperfang',
  name: 'Hyper Fang',
  type: 'Normal',
  category: 'Physical',
  power: 80,
  accuracy: 90,
  pp: 15,
  description: 'An attack that may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 10
  },
};

export default hyperfang;
