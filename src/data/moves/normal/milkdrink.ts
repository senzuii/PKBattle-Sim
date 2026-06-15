import { Move } from '../../../types/Pokemon';

const milkdrink: Move = {
  id: 'milkdrink',
  name: 'Milk Drink',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'The user restores its own HP by up to half of its max HP.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default milkdrink;
