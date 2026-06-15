import { Ability } from '../../../types/Pokemon';

export const hugepower: Ability = {
  id: "Huge Power",
  name: "Huge Power",
  description: "Doubles the Pokémon’s Attack stat.",
  getStatMultiplier: (_pokemon, stat) => stat === 'atk' ? 2.0 : 1.0,
};
