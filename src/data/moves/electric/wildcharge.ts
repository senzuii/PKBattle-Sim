import { Move } from '../../../types/Pokemon';

const wildcharge: Move = {
  id: 'wildcharge',
  name: 'Wild Charge',
  type: 'Electric',
  category: 'Physical',
  power: 90,
  accuracy: 100,
  pp: 15,
  description: 'The user shrouds itself in electricity and smashes into its target. It also damages the user a little.',
  effect: { type: 'recoil', target: 'self', percent: 25 },
};

export default wildcharge;
