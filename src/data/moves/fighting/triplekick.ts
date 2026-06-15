import { Move } from '../../../types/Pokemon';

const triplekick: Move = {
  id: 'triplekick',
  name: 'Triple Kick',
  type: 'Fighting',
  category: 'Physical',
  power: 10,
  accuracy: 90,
  pp: 10,
  description: 'A consecutive three-kick attack that becomes more powerful with each successive hit.',
  multiHit: [3, 3],
};

export default triplekick;
