import { Move } from '../../../types/Pokemon';

const acidarmor: Move = {
  id: 'acidarmor',
  name: 'Acid Armor',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Sharply raises the user\'s DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'def',
    stages: 2
  },
};

export default acidarmor;
