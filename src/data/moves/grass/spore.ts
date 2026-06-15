import { Move } from '../../../types/Pokemon';

const spore: Move = {
  id: 'spore',
  name: 'Spore',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'A move that induces sleep.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default spore;
