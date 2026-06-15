import { Move } from '../../../types/Pokemon';

const lusterpurge: Move = {
  id: 'lusterpurge',
  name: 'Luster Purge',
  type: 'Psychic',
  category: 'Special',
  power: 95,
  accuracy: 100,
  pp: 5,
  description: 'A burst of light that may lower the target\'s Sp. Def.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 50,
  },
};

export default lusterpurge;
