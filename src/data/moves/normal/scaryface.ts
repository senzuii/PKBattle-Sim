import { Move } from '../../../types/Pokemon';

const scaryface: Move = {
  id: 'scaryface',
  name: 'Scary Face',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'Sharply reduces the foe\'s SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -2
  },
};

export default scaryface;
