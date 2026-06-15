import { Move } from '../../../types/Pokemon';

const rollingkick: Move = {
  id: 'rollingkick',
  name: 'Rolling Kick',
  type: 'Fighting',
  category: 'Physical',
  power: 60,
  accuracy: 85,
  pp: 15,
  description: 'A fast, spinning kick.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default rollingkick;
