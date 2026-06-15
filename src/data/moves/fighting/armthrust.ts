import { Move } from '../../../types/Pokemon';

const armthrust: Move = {
  id: 'armthrust',
  name: 'Arm Thrust',
  type: 'Fighting',
  category: 'Physical',
  power: 15,
  accuracy: 100,
  pp: 20,
  description: 'Straight-arm punches that strike 2-5 times in a row.',
  multiHit: [2, 5],
};

export default armthrust;
