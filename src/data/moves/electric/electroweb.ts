import { Move } from '../../../types/Pokemon';

const electroweb: Move = {
  id: 'electroweb',
  name: 'Electroweb',
  type: 'Electric',
  category: 'Special',
  power: 55,
  accuracy: 95,
  pp: 15,
  description: 'The user captures and attacks opposing Pokémon by using an electric net. It reduces the targets’ Speed stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default electroweb;
