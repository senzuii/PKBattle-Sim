import { Move } from '../../../types/Pokemon';

const assist: Move = {
  id: 'assist',
  name: 'Assist',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Attacks randomly with one of the partner’s moves.',
};

export default assist;
