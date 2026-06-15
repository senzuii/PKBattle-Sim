import { Move } from '../../../types/Pokemon';

const sandattack: Move = {
  id: 'sandattack',
  name: 'Sand Attack',
  type: 'Ground',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'Reduces accuracy by throwing sand.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1
  },
};

export default sandattack;
