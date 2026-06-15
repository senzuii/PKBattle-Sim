import { Move } from '../../../types/Pokemon';

const gigadrain: Move = {
  id: 'gigadrain',
  name: 'Giga Drain',
  type: 'Grass',
  category: 'Special',
  power: 75,
  accuracy: 100,
  pp: 10,
  description: 'Steals 1/2 of the damage inflicted.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default gigadrain;
