import { Ability } from '../../../types/Pokemon';

export const quickfeet: Ability = {
  id: "Quick Feet",
  name: "Quick Feet",
  description: "Boosts Speed if the Pokémon has a status condition.",
  getSpeedMultiplier: (pokemon) => pokemon.status ? 1.5 : 1.0,
};
