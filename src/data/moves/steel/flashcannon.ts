import { Move } from '../../../types/Pokemon';

const flashcannon: Move = {
  id: 'flashcannon',
  name: 'Flash Cannon',
  type: 'Steel',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 10,
  description: 'The user gathers all its light energy and releases it at once. It may also lower the foe’s Sp. Def stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default flashcannon;
