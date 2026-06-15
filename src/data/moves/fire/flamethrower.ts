import { Move } from '../../../types/Pokemon';

const flamethrower: Move = {
  id: 'flamethrower',
  name: 'Flamethrower',
  type: 'Fire',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 15,
  description: 'An attack that may inflict a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default flamethrower;
