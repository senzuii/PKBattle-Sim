import { Move } from '../../../types/Pokemon';

const mudbomb: Move = {
  id: 'mudbomb',
  name: 'Mud Bomb',
  type: 'Ground',
  category: 'Special',
  power: 65,
  accuracy: 85,
  pp: 10,
  description: 'The user launches a hard-packed mud ball to attack. It may also lower the target’s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 30
  },
};

export default mudbomb;
