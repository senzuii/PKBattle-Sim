import { Move } from '../../../types/Pokemon';

const sacredfire: Move = {
  id: 'sacredfire',
  name: 'Sacred Fire',
  type: 'Fire',
  category: 'Physical',
  power: 100,
  accuracy: 95,
  pp: 5,
  description: 'The target is razed with a mystical fire of great intensity. This may also leave the target with a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 50
  },
};

export default sacredfire;
