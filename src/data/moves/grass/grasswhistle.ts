import { Move } from '../../../types/Pokemon';

const grasswhistle: Move = {
  id: 'grasswhistle',
  name: 'Grass Whistle',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 55,
  pp: 15,
  description: 'Lulls the foe into sleep with a pleasant melody.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default grasswhistle;
