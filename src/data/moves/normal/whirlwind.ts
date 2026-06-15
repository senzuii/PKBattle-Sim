import { Move } from '../../../types/Pokemon';

const whirlwind: Move = {
  id: 'whirlwind',
  name: 'Whirlwind',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Blows away the foe & ends battle.',
  effect: {
    type: 'force_switch',
    target: 'opponent',
  },
};

export default whirlwind;
