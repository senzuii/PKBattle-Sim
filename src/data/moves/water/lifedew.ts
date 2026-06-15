import { Move } from '../../../types/Pokemon';

const lifedew: Move = {
  id: 'lifedew',
  name: 'Life Dew',
  type: 'Water',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'The user scatters mysterious water around and restores the HP of itself and its ally Pokémon in the battle.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 4) * 100)
  },
};

export default lifedew;
