import { Move } from '../../../types/Pokemon';

const heatwave: Move = {
  id: 'heatwave',
  name: 'Heat Wave',
  type: 'Fire',
  category: 'Special',
  power: 95,
  accuracy: 90,
  pp: 10,
  description: 'Exhales a hot breath on the foe. May inflict a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default heatwave;
