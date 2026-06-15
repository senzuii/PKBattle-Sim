import { Move } from '../../../types/Pokemon';

const blizzard: Move = {
  id: 'blizzard',
  name: 'Blizzard',
  type: 'Ice',
  category: 'Special',
  power: 110,
  accuracy: 70,
  pp: 5,
  description: 'An attack that may freeze the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Freeze',
    chance: 10
  },
};

export default blizzard;
