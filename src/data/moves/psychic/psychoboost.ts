import { Move } from '../../../types/Pokemon';

const psychoboost: Move = {
  id: 'psychoboost',
  name: 'Psycho Boost',
  type: 'Psychic',
  category: 'Special',
  power: 140,
  accuracy: 90,
  pp: 5,
  description: 'A powerful attack, but it sharply lowers the user\'s Sp. Atk.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spa',
    stages: -2,
  },
};

export default psychoboost;
