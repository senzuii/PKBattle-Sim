import { Move } from '../../../types/Pokemon';

const leer: Move = {
  id: 'leer',
  name: 'Leer',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'Reduces the foe\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1
  },
};

export default leer;
