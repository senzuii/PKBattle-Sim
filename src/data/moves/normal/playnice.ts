import { Move } from '../../../types/Pokemon';

const playnice: Move = {
  id: 'playnice',
  name: 'Play Nice',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user and the target become friends, and the target loses its will to fight. This lowers the target’s Attack stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1
  },
};

export default playnice;
