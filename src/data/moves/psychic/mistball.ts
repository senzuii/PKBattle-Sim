import { Move } from '../../../types/Pokemon';

const mistball: Move = {
  id: 'mistball',
  name: 'Mist Ball',
  type: 'Psychic',
  category: 'Special',
  power: 95,
  accuracy: 100,
  pp: 5,
  description: 'A flurry of down that may lower the target\'s Sp. Atk.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 50,
  },
};

export default mistball;
