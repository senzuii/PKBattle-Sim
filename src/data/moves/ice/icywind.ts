import { Move } from '../../../types/Pokemon';

const icywind: Move = {
  id: 'icywind',
  name: 'Icy Wind',
  type: 'Ice',
  category: 'Special',
  power: 55,
  accuracy: 95,
  pp: 15,
  description: 'An icy attack that lowers SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default icywind;
