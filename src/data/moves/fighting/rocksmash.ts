import { Move } from '../../../types/Pokemon';

const rocksmash: Move = {
  id: 'rocksmash',
  name: 'Rock Smash',
  type: 'Fighting',
  category: 'Physical',
  power: 40,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may lower DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 50
  },
};

export default rocksmash;
