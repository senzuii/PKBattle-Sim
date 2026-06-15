import { Move } from '../../../types/Pokemon';

const crunch: Move = {
  id: 'crunch',
  name: 'Crunch',
  type: 'Dark',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may lower SPCL.DEF.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 20
  },
};

export default crunch;
