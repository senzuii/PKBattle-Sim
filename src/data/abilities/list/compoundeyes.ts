import { Ability } from '../../../types/Pokemon';

export const compoundeyes: Ability = {
  id: "Compound Eyes",
  name: "Compound Eyes",
  description: "The Pokémon’s accuracy is boosted.",
  modifyAccuracy: (_pokemon, accuracy) => accuracy * 1.3,
};
