import { Move } from '../../../types/Pokemon';

const thunderbolt: Move = {
  id: 'thunderbolt',
  name: 'Thunderbolt',
  type: 'Electric',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 10
  },
};

export default thunderbolt;
