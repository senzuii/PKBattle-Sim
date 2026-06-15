import { Move } from '../../../types/Pokemon';

const takedown: Move = {
  id: 'takedown',
  name: 'Take Down',
  type: 'Normal',
  category: 'Physical',
  power: 90,
  accuracy: 85,
  pp: 20,
  description: 'A tackle that also hurts the user.',
  effect: { type: 'recoil', target: 'self', percent: 25 },
};

export default takedown;
