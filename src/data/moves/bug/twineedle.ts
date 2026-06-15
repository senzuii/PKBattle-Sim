import { Move } from '../../../types/Pokemon';

const twineedle: Move = {
  id: 'twineedle',
  name: 'Twineedle',
  type: 'Bug',
  category: 'Physical',
  power: 25,
  accuracy: 100,
  pp: 20,
  description: 'Jabs the foe twice using stingers.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 20
  },
  multiHit: [2, 2],
};

export default twineedle;
