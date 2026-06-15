import { Move } from '../../../types/Pokemon';

const headsmash: Move = {
  id: 'headsmash',
  name: 'Head Smash',
  type: 'Rock',
  category: 'Physical',
  power: 150,
  accuracy: 80,
  pp: 5,
  description: 'The user delivers a life-endangering head butt at full power. The user also takes terrible damage.',
  effect: { type: 'recoil', target: 'self', percent: 50 },
};

export default headsmash;
