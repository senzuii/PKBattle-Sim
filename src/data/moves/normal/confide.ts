import { Move } from '../../../types/Pokemon';

const confide: Move = {
  id: 'confide',
  name: 'Confide',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user tells the target a secret, and the target loses its ability to concentrate. This lowers the target’s Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1
  },
};

export default confide;
