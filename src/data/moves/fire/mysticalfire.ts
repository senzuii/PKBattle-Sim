import { Move } from '../../../types/Pokemon';

const mysticalfire: Move = {
  id: 'mysticalfire',
  name: 'Mystical Fire',
  type: 'Fire',
  category: 'Special',
  power: 75,
  accuracy: 100,
  pp: 10,
  description: 'The user attacks by breathing a special, hot fire. This also lowers the target’s Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 100
  },
};

export default mysticalfire;
