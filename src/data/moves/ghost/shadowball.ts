import { Move } from '../../../types/Pokemon';

const shadowball: Move = {
  id: 'shadowball',
  name: 'Shadow Ball',
  type: 'Ghost',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may lower SPCL.DEF.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 20
  },
};

export default shadowball;
