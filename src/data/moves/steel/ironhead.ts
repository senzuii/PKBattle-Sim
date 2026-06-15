import { Move } from '../../../types/Pokemon';

const ironhead: Move = {
  id: 'ironhead',
  name: 'Iron Head',
  type: 'Steel',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'The foe slams the target with its steel-hard head. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default ironhead;
