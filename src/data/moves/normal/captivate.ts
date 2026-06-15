import { Move } from '../../../types/Pokemon';

const captivate: Move = {
  id: 'captivate',
  name: 'Captivate',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'If it is the opposite gender of the user, the foe is charmed into sharply lowering its Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -2
  },
};

export default captivate;
