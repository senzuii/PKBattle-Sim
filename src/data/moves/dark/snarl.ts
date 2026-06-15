import { Move } from '../../../types/Pokemon';

const snarl: Move = {
  id: 'snarl',
  name: 'Snarl',
  type: 'Dark',
  category: 'Special',
  power: 55,
  accuracy: 95,
  pp: 15,
  description: 'The user yells as if it is ranting about something, making the target’s Sp. Atk stat decrease.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 100
  },
};

export default snarl;
