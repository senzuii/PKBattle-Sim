import { Move } from '../../../types/Pokemon';

const nuzzle: Move = {
  id: 'nuzzle',
  name: 'Nuzzle',
  type: 'Electric',
  category: 'Physical',
  power: 20,
  accuracy: 100,
  pp: 20,
  description: 'The user attacks by nuzzling its electrified cheeks against the target. This also leaves the target with paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 100
  },
};

export default nuzzle;
