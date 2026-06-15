import { Move } from '../../../types/Pokemon';

const bravebird: Move = {
  id: 'bravebird',
  name: 'Brave Bird',
  type: 'Flying',
  category: 'Physical',
  power: 120,
  accuracy: 100,
  pp: 15,
  description: 'The user tucks in its wings and charges from a low altitude. The user also takes serious damage.',
  effect: { type: 'recoil', target: 'self', percent: 33 },
};

export default bravebird;
