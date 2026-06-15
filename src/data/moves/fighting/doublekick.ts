import { Move } from '../../../types/Pokemon';

const doublekick: Move = {
  id: 'doublekick',
  name: 'Double Kick',
  type: 'Fighting',
  category: 'Physical',
  power: 30,
  accuracy: 100,
  pp: 30,
  description: 'A double kicking attack.',
  multiHit: [2, 2],
};

export default doublekick;
