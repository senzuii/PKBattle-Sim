import { Move } from '../../../types/Pokemon';

const sunnyday: Move = {
  id: 'sunnyday',
  name: 'Sunny Day',
  type: 'Fire',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Boosts fire-type moves for 5 turns.',
  effect: { type: 'weather', target: 'self', weather: 'Sun' },
};

export default sunnyday;
