import { Move } from '../../../types/Pokemon';

const bulldoze: Move = {
  id: 'bulldoze',
  name: 'Bulldoze',
  type: 'Ground',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 20,
  description: 'The user stomps down on the ground and attacks everything in the area. Hit Pokémon’s Speed stat is reduced.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default bulldoze;
