import { Move } from '../../../types/Pokemon';

const cosmicpower: Move = {
  id: 'cosmicpower',
  name: 'Cosmic Power',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Raises DEFENSE and SP. DEF with a mystic power.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 1
  },
};

export default cosmicpower;
