import { Move } from '../../../types/Pokemon';

const thunder: Move = {
  id: 'thunder',
  name: 'Thunder',
  type: 'Electric',
  category: 'Special',
  power: 110,
  accuracy: 70,
  pp: 10,
  description: 'An attack that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default thunder;
