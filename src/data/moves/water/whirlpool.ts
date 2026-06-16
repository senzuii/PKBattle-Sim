import { Move } from '../../../types/Pokemon';

const whirlpool: Move = {
  id: 'whirlpool',
  name: 'Whirlpool',
  type: 'Water',
  category: 'Special',
  power: 35,
  accuracy: 85,
  pp: 15,
  description: 'Traps the foe for 2-5 turns.',
  effect: { type: 'trap', target: 'opponent' },
};

export default whirlpool;
