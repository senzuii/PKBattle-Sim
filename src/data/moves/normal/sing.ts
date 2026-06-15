import { Move } from '../../../types/Pokemon';

const sing: Move = {
  id: 'sing',
  name: 'Sing',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 55,
  pp: 15,
  description: 'May cause the foe to fall asleep.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default sing;
