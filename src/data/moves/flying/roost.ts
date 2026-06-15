import { Move } from '../../../types/Pokemon';

const roost: Move = {
  id: 'roost',
  name: 'Roost',
  type: 'Flying',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'The user lands and rests its body. It restores the user’s HP by up to half of its max HP.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default roost;
