import { Move } from '../../../types/Pokemon';

const mirrorshot: Move = {
  id: 'mirrorshot',
  name: 'Mirror Shot',
  type: 'Steel',
  category: 'Special',
  power: 65,
  accuracy: 85,
  pp: 10,
  description: 'The user looses a flash of energy from its polished body. It may also lower the target’s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 30
  },
};

export default mirrorshot;
