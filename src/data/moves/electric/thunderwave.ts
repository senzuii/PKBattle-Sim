import { Move } from '../../../types/Pokemon';

const thunderwave: Move = {
  id: 'thunderwave',
  name: 'Thunder Wave',
  type: 'Electric',
  category: 'Status',
  power: 0,
  accuracy: 90,
  pp: 20,
  description: 'A move that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis'
  },
};

export default thunderwave;
