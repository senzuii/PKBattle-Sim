import { Move } from '../../../types/Pokemon';

const dragonrush: Move = {
  id: 'dragonrush',
  name: 'Dragon Rush',
  type: 'Dragon',
  category: 'Physical',
  power: 100,
  accuracy: 75,
  pp: 10,
  description: 'The user tackles the foe while exhibiting overwhelming menace. It may also make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 20
  },
};

export default dragonrush;
