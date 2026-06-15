import { Move } from '../../../types/Pokemon';

const twister: Move = {
  id: 'twister',
  name: 'Twister',
  type: 'Dragon',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 20,
  description: 'Whips up a tornado to attack.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 20
  },
};

export default twister;
