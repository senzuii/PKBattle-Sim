import { Move } from '../../../types/Pokemon';

const fakeout: Move = {
  id: 'fakeout',
  name: 'Fake Out',
  type: 'Normal',
  category: 'Physical',
  power: 40,
  accuracy: 100,
  pp: 10,
  description: 'A 1st-turn, 1st-strike move that causes flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 100
  },
};

export default fakeout;
