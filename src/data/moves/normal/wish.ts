import { Move } from '../../../types/Pokemon';

const wish: Move = {
  id: 'wish',
  name: 'Wish',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'A wish that restores HP. It takes time to work.',
  effect: { type: 'wish', target: 'self' },
};

export default wish;
