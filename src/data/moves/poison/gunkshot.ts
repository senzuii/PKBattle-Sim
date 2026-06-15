import { Move } from '../../../types/Pokemon';

const gunkshot: Move = {
  id: 'gunkshot',
  name: 'Gunk Shot',
  type: 'Poison',
  category: 'Physical',
  power: 120,
  accuracy: 80,
  pp: 5,
  description: 'The user shoots filthy garbage at the foe to attack. It may also poison the target.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 30
  },
};

export default gunkshot;
