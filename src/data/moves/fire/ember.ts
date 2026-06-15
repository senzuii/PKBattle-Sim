import { Move } from '../../../types/Pokemon';

const ember: Move = {
  id: 'ember',
  name: 'Ember',
  type: 'Fire',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 25,
  description: 'The foe is attacked with small flames. The foe may suffer a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default ember;
