import { Move } from '../../../types/Pokemon';

const airslash: Move = {
  id: 'airslash',
  name: 'Air Slash',
  type: 'Flying',
  category: 'Special',
  power: 75,
  accuracy: 95,
  pp: 15,
  description: 'The user attacks with a blade of air that slices even the sky. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default airslash;
