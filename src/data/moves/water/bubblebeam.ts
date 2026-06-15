import { Move } from '../../../types/Pokemon';

const bubblebeam: Move = {
  id: 'bubblebeam',
  name: 'Bubble Beam',
  type: 'Water',
  category: 'Special',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may lower SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 10
  },
};

export default bubblebeam;
