import { Move } from '../../../types/Pokemon';

const megadrain: Move = {
  id: 'megadrain',
  name: 'Mega Drain',
  type: 'Grass',
  category: 'Special',
  power: 40,
  accuracy: 100,
  pp: 15,
  description: 'Steals 1/2 of the damage inflicted.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default megadrain;
