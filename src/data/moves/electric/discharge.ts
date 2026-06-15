import { Move } from '../../../types/Pokemon';

const discharge: Move = {
  id: 'discharge',
  name: 'Discharge',
  type: 'Electric',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'A flare of electricity is loosed to strike all Pokémon in battle. It may also cause paralysis.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default discharge;
