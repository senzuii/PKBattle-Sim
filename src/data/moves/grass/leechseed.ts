import { Move } from '../../../types/Pokemon';

const leechseed: Move = {
  id: 'leechseed',
  name: 'Leech Seed',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 90,
  pp: 10,
  description: 'Steals HP from the foe on every turn.',
  effect: { type: 'leech_seed', target: 'opponent' },
};

export default leechseed;
