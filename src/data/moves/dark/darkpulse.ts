import { Move } from '../../../types/Pokemon';

const darkpulse: Move = {
  id: 'darkpulse',
  name: 'Dark Pulse',
  type: 'Dark',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'The user releases a horrible aura imbued with dark thoughts. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 20
  },
};

export default darkpulse;
