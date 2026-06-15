import { Move } from '../../../types/Pokemon';

const glare: Move = {
  id: 'glare',
  name: 'Glare',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'A move that may cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis'
  },
};

export default glare;
