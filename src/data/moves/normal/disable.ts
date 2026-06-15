import { Move } from '../../../types/Pokemon';

const disable: Move = {
  id: 'disable',
  name: 'Disable',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Disables the foe\'s most recent move.',
};

export default disable;
