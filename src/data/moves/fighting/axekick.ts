import { Move } from '../../../types/Pokemon';

const axekick: Move = {
  id: 'axekick',
  name: 'Axe Kick',
  type: 'Fighting',
  category: 'Physical',
  power: 120,
  accuracy: 90,
  pp: 10,
  description: 'The user attacks by kicking up into the air and slamming its heel down upon the target. This may also confuse the target. If it misses, the user takes damage instead.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 30
  },
};

export default axekick;
