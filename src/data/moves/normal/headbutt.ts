import { Move } from '../../../types/Pokemon';

const headbutt: Move = {
  id: 'headbutt',
  name: 'Headbutt',
  type: 'Normal',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may make foe flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default headbutt;
