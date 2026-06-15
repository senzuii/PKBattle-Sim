import { Move } from '../../../types/Pokemon';

const submission: Move = {
  id: 'submission',
  name: 'Submission',
  type: 'Fighting',
  category: 'Physical',
  power: 80,
  accuracy: 80,
  pp: 20,
  description: 'An attack that al­ so hurts the user.',
  effect: { type: 'recoil', target: 'self', percent: 25 },
};

export default submission;
