import { Move } from '../../../types/Pokemon';

const poisonfang: Move = {
  id: 'poisonfang',
  name: 'Poison Fang',
  type: 'Poison',
  category: 'Physical',
  power: 50,
  accuracy: 100,
  pp: 15,
  description: 'A sharp-fanged attack. May badly poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Toxic',
    chance: 50
  },
};

export default poisonfang;
