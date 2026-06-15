import { Move } from '../../../types/Pokemon';

const playrough: Move = {
  id: 'playrough',
  name: 'Play Rough',
  type: 'Fairy',
  category: 'Physical',
  power: 90,
  accuracy: 90,
  pp: 10,
  description: 'The user plays rough with the target and attacks it. This may also lower the target’s Attack stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1,
    chance: 10
  },
};

export default playrough;
