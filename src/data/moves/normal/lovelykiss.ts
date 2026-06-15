import { Move } from '../../../types/Pokemon';

const lovelykiss: Move = {
  id: 'lovelykiss',
  name: 'Lovely Kiss',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 75,
  pp: 10,
  description: 'May cause the foe to fall asleep.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default lovelykiss;
