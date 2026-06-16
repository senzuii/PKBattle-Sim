import { Move } from '../../../types/Pokemon';

const wrap: Move = {
  id: 'wrap',
  name: 'Wrap',
  type: 'Normal',
  category: 'Physical',
  power: 15,
  accuracy: 90,
  pp: 20,
  description: 'Squeezes the foe for 2-5 turns.',
  effect: { type: 'trap', target: 'opponent' },
};

export default wrap;
