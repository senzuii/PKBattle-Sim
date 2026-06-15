import { Move } from '../../../types/Pokemon';

const featherdance: Move = {
  id: 'featherdance',
  name: 'Feather Dance',
  type: 'Flying',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'Envelops the foe with down to sharply reduce ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -2
  },
};

export default featherdance;
