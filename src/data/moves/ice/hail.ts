import { Move } from '../../../types/Pokemon';

const hail: Move = {
  id: 'hail',
  name: 'Hail',
  type: 'Ice',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'Summons a hailstorm that strikes every turn.',
  effect: { type: 'weather', target: 'self', weather: 'Hail' },
};

export default hail;
