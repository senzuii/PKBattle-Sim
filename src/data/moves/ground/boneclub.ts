import { Move } from '../../../types/Pokemon';

const boneclub: Move = {
  id: 'boneclub',
  name: 'Bone Club',
  type: 'Ground',
  category: 'Physical',
  power: 65,
  accuracy: 85,
  pp: 20,
  description: 'An attack that may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 10
  },
};

export default boneclub;
