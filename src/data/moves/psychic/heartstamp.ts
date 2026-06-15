import { Move } from '../../../types/Pokemon';

const heartstamp: Move = {
  id: 'heartstamp',
  name: 'Heart Stamp',
  type: 'Psychic',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 25,
  description: 'The user unleashes a vicious blow after its cute act makes the target less wary. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default heartstamp;
