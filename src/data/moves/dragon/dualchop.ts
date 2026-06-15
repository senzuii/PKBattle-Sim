import { Move } from '../../../types/Pokemon';

const dualchop: Move = {
  id: 'dualchop',
  name: 'Dual Chop',
  type: 'Dragon',
  category: 'Physical',
  power: 40,
  accuracy: 90,
  pp: 15,
  description: 'The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.',
  multiHit: [2, 2],
};

export default dualchop;
