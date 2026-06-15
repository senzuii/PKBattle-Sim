import { Move } from '../../../types/Pokemon';

const earthpower: Move = {
  id: 'earthpower',
  name: 'Earth Power',
  type: 'Ground',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'The user makes the ground under the foe erupt with power. It may also lower the target’s Sp. Def.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default earthpower;
