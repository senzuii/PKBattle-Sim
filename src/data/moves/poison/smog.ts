import { Move } from '../../../types/Pokemon';

const smog: Move = {
  id: 'smog',
  name: 'Smog',
  type: 'Poison',
  category: 'Special',
  power: 30,
  accuracy: 70,
  pp: 20,
  description: 'An attack that may poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 40
  },
};

export default smog;
