import { Move } from '../../../types/Pokemon';

const absorb: Move = {
  id: 'absorb',
  name: 'Absorb',
  type: 'Grass',
  category: 'Special',
  power: 20,
  accuracy: 100,
  pp: 25,
  description: 'Steals 1/2 of the damage inflicted.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default absorb;
