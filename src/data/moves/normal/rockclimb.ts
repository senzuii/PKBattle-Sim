import { Move } from '../../../types/Pokemon';

const rockclimb: Move = {
  id: 'rockclimb',
  name: 'Rock Climb',
  type: 'Normal',
  category: 'Physical',
  power: 90,
  accuracy: 85,
  pp: 20,
  description: 'A charging attack that may also leave the foe confused. It can also be used to scale rocky walls.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 20
  },
};

export default rockclimb;
