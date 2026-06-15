import { Move } from '../../../types/Pokemon';

const agility: Move = {
  id: 'agility',
  name: 'Agility',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'Sharply increases the user\'s SPEED.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spe',
    stages: 2
  },
};

export default agility;
