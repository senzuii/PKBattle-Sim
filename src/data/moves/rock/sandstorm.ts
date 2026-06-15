import { Move } from '../../../types/Pokemon';

const sandstorm: Move = {
  id: 'sandstorm',
  name: 'Sandstorm',
  type: 'Rock',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'Inflicts damage every turn.',
  effect: { type: 'weather', target: 'self', weather: 'Sandstorm' },
};

export default sandstorm;
