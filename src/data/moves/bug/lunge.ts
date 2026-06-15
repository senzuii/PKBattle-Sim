import { Move } from '../../../types/Pokemon';

const lunge: Move = {
  id: 'lunge',
  name: 'Lunge',
  type: 'Bug',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'The user makes a lunge at the target, attacking with full force. This also lowers the target’s Attack stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1,
    chance: 100
  },
};

export default lunge;
