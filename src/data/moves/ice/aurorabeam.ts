import { Move } from '../../../types/Pokemon';

const aurorabeam: Move = {
  id: 'aurorabeam',
  name: 'Aurora Beam',
  type: 'Ice',
  category: 'Special',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may lower ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1,
    chance: 10
  },
};

export default aurorabeam;
