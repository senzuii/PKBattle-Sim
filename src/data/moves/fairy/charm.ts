import { Move } from '../../../types/Pokemon';

const charm: Move = {
  id: 'charm',
  name: 'Charm',
  type: 'Fairy',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Sharply lowers the foe\'s ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -2
  },
};

export default charm;
