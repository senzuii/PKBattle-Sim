import { Move } from '../../../types/Pokemon';

const sludge: Move = {
  id: 'sludge',
  name: 'Sludge',
  type: 'Poison',
  category: 'Special',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 30
  },
};

export default sludge;
