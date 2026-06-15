import { Move } from '../../../types/Pokemon';

const amnesia: Move = {
  id: 'amnesia',
  name: 'Amnesia',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Sharply raises the user\'s SPCL.DEF.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spd',
    stages: 2
  },
};

export default amnesia;
