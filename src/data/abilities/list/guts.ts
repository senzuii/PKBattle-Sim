import { Ability } from '../../../types/Pokemon';

export const guts: Ability = {
  id: "Guts",
  name: "Guts",
  description: "Boosts Attack if the Pokémon has a status condition.",
  getStatMultiplier: (pokemon, stat) => stat === 'atk' && pokemon.status ? 1.5 : 1.0,
};
