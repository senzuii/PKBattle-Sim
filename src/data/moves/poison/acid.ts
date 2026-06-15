import { Move } from '../../../types/Pokemon';

const acid: Move = {
  id: 'acid',
  name: 'Acid',
  type: 'Poison',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 30,
  description: 'An attack that may lower DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default acid;
