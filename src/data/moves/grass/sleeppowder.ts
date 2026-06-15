import { Move } from '../../../types/Pokemon';

const sleeppowder: Move = {
  id: 'sleeppowder',
  name: 'Sleep Powder',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 75,
  pp: 15,
  description: 'May cause the foe to fall asleep.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default sleeppowder;
