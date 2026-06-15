import { Move } from '../../../types/Pokemon';

const snore: Move = {
  id: 'snore',
  name: 'Snore',
  type: 'Normal',
  category: 'Special',
  power: 50,
  accuracy: 100,
  pp: 15,
  description: 'An attack useable only while asleep.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default snore;
