import { Move } from '../../../types/Pokemon';

const quiverdance: Move = {
  id: 'quiverdance',
  name: 'Quiver Dance',
  type: 'Bug',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user lightly performs a beautiful, mystic dance. It boosts the user’s Sp. Atk, Sp. Def, and Speed stats.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spa',
    stages: 1
  },
};

export default quiverdance;
