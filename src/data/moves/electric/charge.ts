import { Move } from '../../../types/Pokemon';

const charge: Move = {
  id: 'charge',
  name: 'Charge',
  type: 'Electric',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Charges power to boost the electric move used next.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spd',
    stages: 1
  },
};

export default charge;
