import { Move } from '../../../types/Pokemon';

const doubleedge: Move = {
  id: 'doubleedge',
  name: 'Double-Edge',
  type: 'Normal',
  category: 'Physical',
  power: 120,
  accuracy: 100,
  pp: 15,
  description: 'A tackle that also hurts the user.',
  effect: { type: 'recoil', target: 'self', percent: 33 },
};

export default doubleedge;
