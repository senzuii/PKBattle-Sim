import { Ability } from '../../../types/Pokemon';

export const purepower: Ability = {
  id: "Pure Power",
  name: "Pure Power",
  description: "Doubles the Pokémon’s Attack stat.",
  getStatMultiplier: (_pokemon, stat) => stat === 'atk' ? 2.0 : 1.0,
};
