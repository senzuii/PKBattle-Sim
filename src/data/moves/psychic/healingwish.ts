import { Move } from '../../../types/Pokemon';

const healingwish: Move = {
  id: 'healingwish',
  name: 'Healing Wish',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'The user faints. In return, the Pokémon taking its place will have its HP restored and status cured.',
};

export default healingwish;
