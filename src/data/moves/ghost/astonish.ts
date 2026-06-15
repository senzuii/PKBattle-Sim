import { Move } from '../../../types/Pokemon';

const astonish: Move = {
  id: 'astonish',
  name: 'Astonish',
  type: 'Ghost',
  category: 'Physical',
  power: 30,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may shock the foe into flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default astonish;
