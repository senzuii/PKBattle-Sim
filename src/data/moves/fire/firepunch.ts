import { Move } from '../../../types/Pokemon';

const firepunch: Move = {
  id: 'firepunch',
  name: 'Fire Punch',
  type: 'Fire',
  category: 'Physical',
  power: 75,
  accuracy: 100,
  pp: 15,
  description: 'A fiery punch. May cause a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default firepunch;
