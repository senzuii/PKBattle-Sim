import { Move } from '../../../types/Pokemon';

const mudslap: Move = {
  id: 'mudslap',
  name: 'Mud-Slap',
  type: 'Ground',
  category: 'Special',
  power: 20,
  accuracy: 100,
  pp: 10,
  description: 'Reduces the foe\'s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 100
  },
};

export default mudslap;
