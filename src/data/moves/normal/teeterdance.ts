import { Move } from '../../../types/Pokemon';

const teeterdance: Move = {
  id: 'teeterdance',
  name: 'Teeter Dance',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Confuses all POKéMON on the scene.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion'
  },
};

export default teeterdance;
