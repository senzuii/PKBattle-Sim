import { Move } from '../../../types/Pokemon';

const psybeam: Move = {
  id: 'psybeam',
  name: 'Psybeam',
  type: 'Psychic',
  category: 'Special',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may confuse the foe.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 10
  },
};

export default psybeam;
