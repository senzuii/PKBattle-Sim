import { Move } from '../../../types/Pokemon';

const acidspray: Move = {
  id: 'acidspray',
  name: 'Acid Spray',
  type: 'Poison',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 20,
  description: 'The user spits fluid that works to melt the target. This harshly reduces the target’s Sp. Def stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -2,
    chance: 100
  },
};

export default acidspray;
