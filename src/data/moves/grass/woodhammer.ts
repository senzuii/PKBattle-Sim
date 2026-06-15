import { Move } from '../../../types/Pokemon';

const woodhammer: Move = {
  id: 'woodhammer',
  name: 'Wood Hammer',
  type: 'Grass',
  category: 'Physical',
  power: 120,
  accuracy: 100,
  pp: 15,
  description: 'The user slams its rugged body into the foe to attack. The user also sustains serious damage.',
  effect: { type: 'recoil', target: 'self', percent: 33 },
};

export default woodhammer;
