import { Move } from '../../../types/Pokemon';

const freezedry: Move = {
  id: 'freezedry',
  name: 'Freeze-Dry',
  type: 'Ice',
  category: 'Special',
  power: 70,
  accuracy: 100,
  pp: 20,
  description: 'The user rapidly cools the target. This may also leave the target frozen. This move is super effective on Water types.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Freeze',
    chance: 10
  },
};

export default freezedry;
