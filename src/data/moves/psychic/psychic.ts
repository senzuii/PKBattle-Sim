import { Move } from '../../../types/Pokemon';

const psychic: Move = {
  id: 'psychic',
  name: 'Psychic',
  type: 'Psychic',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'An attack that may lower SPCL.DEF.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default psychic;
