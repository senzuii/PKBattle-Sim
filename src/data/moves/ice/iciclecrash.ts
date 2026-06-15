import { Move } from '../../../types/Pokemon';

const iciclecrash: Move = {
  id: 'iciclecrash',
  name: 'Icicle Crash',
  type: 'Ice',
  category: 'Physical',
  power: 85,
  accuracy: 90,
  pp: 10,
  description: 'The user attacks by harshly dropping an icicle onto the target. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default iciclecrash;
