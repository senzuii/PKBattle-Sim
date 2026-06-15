import { Move } from '../../../types/Pokemon';

const supersonic: Move = {
  id: 'supersonic',
  name: 'Supersonic',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 55,
  pp: 20,
  description: 'Sound waves that cause confusion.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion'
  },
};

export default supersonic;
