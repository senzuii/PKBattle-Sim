import { Move } from '../../../types/Pokemon';

const zapcannon: Move = {
  id: 'zapcannon',
  name: 'Zap Cannon',
  type: 'Electric',
  category: 'Special',
  power: 120,
  accuracy: 50,
  pp: 5,
  description: 'An attack that always paralyzes.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 100
  },
};

export default zapcannon;
