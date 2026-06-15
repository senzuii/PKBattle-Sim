import { Move } from '../../../types/Pokemon';

const hurricane: Move = {
  id: 'hurricane',
  name: 'Hurricane',
  type: 'Flying',
  category: 'Special',
  power: 110,
  accuracy: 70,
  pp: 10,
  description: 'The user attacks by wrapping its opponent in a fierce wind that flies up into the sky. It may also confuse the target.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 30
  },
};

export default hurricane;
