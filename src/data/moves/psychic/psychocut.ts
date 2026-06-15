import { Move } from '../../../types/Pokemon';

const psychocut: Move = {
  id: 'psychocut',
  name: 'Psycho Cut',
  type: 'Psychic',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 20,
  description: 'The user tears at the foe with blades formed by psychic power. It has a high critical-hit ratio.',
  critRatio: 2,
};

export default psychocut;
