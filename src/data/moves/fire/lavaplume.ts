import { Move } from '../../../types/Pokemon';

const lavaplume: Move = {
  id: 'lavaplume',
  name: 'Lava Plume',
  type: 'Fire',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'An inferno of scarlet flames washes over all Pokémon in battle. It may also inflict burns.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 30
  },
};

export default lavaplume;
