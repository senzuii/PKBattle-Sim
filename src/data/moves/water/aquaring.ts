import { Move } from '../../../types/Pokemon';

const aquaring: Move = {
  id: 'aquaring',
  name: 'Aqua Ring',
  type: 'Water',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user envelops itself in a veil made of water. It regains some HP on every turn.',
  effect: { type: 'heal', target: 'self', percent: 6 },
};

export default aquaring;
