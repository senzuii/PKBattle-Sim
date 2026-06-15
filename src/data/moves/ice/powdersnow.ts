import { Move } from '../../../types/Pokemon';

const powdersnow: Move = {
  id: 'powdersnow',
  name: 'Powder Snow',
  type: 'Ice',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 25,
  description: 'An attack that may cause freezing.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Freeze',
    chance: 10
  },
};

export default powdersnow;
