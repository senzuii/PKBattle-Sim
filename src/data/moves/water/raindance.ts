import { Move } from '../../../types/Pokemon';

const raindance: Move = {
  id: 'raindance',
  name: 'Rain Dance',
  type: 'Water',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Boosts the power of WATER- type moves for 5 turns.',
  effect: { type: 'weather', target: 'self', weather: 'Rain' },
};

export default raindance;
