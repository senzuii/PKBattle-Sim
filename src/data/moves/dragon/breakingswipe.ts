import { Move } from '../../../types/Pokemon';

const breakingswipe: Move = {
  id: 'breakingswipe',
  name: 'Breaking Swipe',
  type: 'Dragon',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 15,
  description: 'The user swings its tough tail wildly and attacks opposing Pokémon. This also lowers their Attack stats.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1,
    chance: 100
  },
};

export default breakingswipe;
