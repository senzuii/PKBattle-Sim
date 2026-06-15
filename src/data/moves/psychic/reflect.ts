import { Move } from '../../../types/Pokemon';

const reflect: Move = {
  id: 'reflect',
  name: 'Reflect',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Raises DEFENSE with a barrier.',
  effect: {
    type: 'screen',
    target: 'self',
    screen: 'reflect',
  },
};

export default reflect;
