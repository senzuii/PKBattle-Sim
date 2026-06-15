import { Move } from '../../../types/Pokemon';

const nastyplot: Move = {
  id: 'nastyplot',
  name: 'Nasty Plot',
  type: 'Dark',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user stimulates its brain by thinking bad thoughts. It sharply raises the user’s Sp. Atk.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spa',
    stages: 2
  },
};

export default nastyplot;
