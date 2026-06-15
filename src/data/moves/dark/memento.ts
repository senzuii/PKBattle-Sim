import { Move } from '../../../types/Pokemon';

const memento: Move = {
  id: 'memento',
  name: 'Memento',
  type: 'Dark',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'The user faints and lowers the foe’s abilities.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -2
  },
};

export default memento;
