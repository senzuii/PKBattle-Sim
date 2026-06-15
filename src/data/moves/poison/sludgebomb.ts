import { Move } from '../../../types/Pokemon';

const sludgebomb: Move = {
  id: 'sludgebomb',
  name: 'Sludge Bomb',
  type: 'Poison',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'An attack that may poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 30
  },
};

export default sludgebomb;
