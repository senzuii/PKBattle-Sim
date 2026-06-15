import { Move } from '../../../types/Pokemon';

const rockpolish: Move = {
  id: 'rockpolish',
  name: 'Rock Polish',
  type: 'Rock',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user polishes its body to reduce drag. It can sharply raise the Speed stat. ',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spe',
    stages: 2
  },
};

export default rockpolish;
