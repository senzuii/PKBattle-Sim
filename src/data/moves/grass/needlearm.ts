import { Move } from '../../../types/Pokemon';

const needlearm: Move = {
  id: 'needlearm',
  name: 'Needle Arm',
  type: 'Grass',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 15,
  description: 'Attacks with thorny arms and may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30,
  },
};

export default needlearm;
