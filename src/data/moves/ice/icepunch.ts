import { Move } from '../../../types/Pokemon';

const icepunch: Move = {
  id: 'icepunch',
  name: 'Ice Punch',
  type: 'Ice',
  category: 'Physical',
  power: 75,
  accuracy: 100,
  pp: 15,
  description: 'An icy punch. May cause freezing.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Freeze',
    chance: 10
  },
};

export default icepunch;
