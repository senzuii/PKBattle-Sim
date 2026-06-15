import { Move } from '../../../types/Pokemon';

const stomp: Move = {
  id: 'stomp',
  name: 'Stomp',
  type: 'Normal',
  category: 'Physical',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'An attack that may cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default stomp;
