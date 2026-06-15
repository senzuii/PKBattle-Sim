import { Move } from '../../../types/Pokemon';

const liquidation: Move = {
  id: 'liquidation',
  name: 'Liquidation',
  type: 'Water',
  category: 'Physical',
  power: 85,
  accuracy: 100,
  pp: 10,
  description: 'The user slams into the target using a full-force blast of water. This may also lower the target’s Defense stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 20
  },
};

export default liquidation;
