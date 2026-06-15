import { Move } from '../../../types/Pokemon';

const zenheadbutt: Move = {
  id: 'zenheadbutt',
  name: 'Zen Headbutt',
  type: 'Psychic',
  category: 'Physical',
  power: 80,
  accuracy: 90,
  pp: 15,
  description: 'The user focuses its willpower to its head and rams the foe. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 20
  },
};

export default zenheadbutt;
