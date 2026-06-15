import { Move } from '../../../types/Pokemon';

const bubble: Move = {
  id: 'bubble',
  name: 'Bubble',
  type: 'Water',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 30,
  description: 'An attack that may reduce SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 10
  },
};

export default bubble;
