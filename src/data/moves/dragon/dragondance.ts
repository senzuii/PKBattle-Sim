import { Move } from '../../../types/Pokemon';

const dragondance: Move = {
  id: 'dragondance',
  name: 'Dragon Dance',
  type: 'Dragon',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'A mystical dance that ups ATTACK and SPEED.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default dragondance;
