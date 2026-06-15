import { Move } from '../../../types/Pokemon';

const muddywater: Move = {
  id: 'muddywater',
  name: 'Muddy Water',
  type: 'Water',
  category: 'Special',
  power: 90,
  accuracy: 85,
  pp: 10,
  description: 'Attacks with muddy water. May lower accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 30
  },
};

export default muddywater;
