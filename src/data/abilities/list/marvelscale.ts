import { Ability } from '../../../types/Pokemon';

export const marvelscale: Ability = {
  id: "Marvel Scale",
  name: "Marvel Scale",
  description: "Boosts Defense if the Pokémon has a status condition.",
  getStatMultiplier: (pokemon, stat) => stat === 'def' && pokemon.status ? 1.5 : 1.0,
};
