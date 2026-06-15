import { Move } from '../../../types/Pokemon';

const confusion: Move = {
  id: 'confusion',
  name: 'Confusion',
  type: 'Psychic',
  category: 'Special',
  power: 50,
  accuracy: 100,
  pp: 25,
  description: 'The foe is hit by a weak telekinetic force. It may also leave the foe confused.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 10
  },
};

export default confusion;
