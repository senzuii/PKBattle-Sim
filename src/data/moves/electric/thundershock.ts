import { Move } from '../../../types/Pokemon';

const thundershock: Move = {
  id: 'thundershock',
  name: 'Thunder Shock',
  type: 'Electric',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 30,
  description: 'An electrical attack that may paralyze the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 10
  },
};

export default thundershock;
