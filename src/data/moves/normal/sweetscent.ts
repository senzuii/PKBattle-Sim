import { Move } from '../../../types/Pokemon';

const sweetscent: Move = {
  id: 'sweetscent',
  name: 'Sweet Scent',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Reduces the foe\'s evasiveness.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'evasion',
    stages: -2
  },
};

export default sweetscent;
