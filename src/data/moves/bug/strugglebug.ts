import { Move } from '../../../types/Pokemon';

const strugglebug: Move = {
  id: 'strugglebug',
  name: 'Struggle Bug',
  type: 'Bug',
  category: 'Special',
  power: 50,
  accuracy: 100,
  pp: 20,
  description: 'While resisting, the user attacks the opposing Pokémon. The targets’ Sp. Atk stat is reduced.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 100
  },
};

export default strugglebug;
