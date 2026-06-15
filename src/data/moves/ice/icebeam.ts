import { Move } from '../../../types/Pokemon';

const icebeam: Move = {
  id: 'icebeam',
  name: 'Ice Beam',
  type: 'Ice',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'An attack that may freeze the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Freeze',
    chance: 10
  },
};

export default icebeam;
