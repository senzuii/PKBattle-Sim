import { Move } from '../../../types/Pokemon';

const focusblast: Move = {
  id: 'focusblast',
  name: 'Focus Blast',
  type: 'Fighting',
  category: 'Special',
  power: 120,
  accuracy: 70,
  pp: 5,
  description: 'The user heightens its mental focus and unleashes its power. It may also lower the target’s Sp. Def.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default focusblast;
