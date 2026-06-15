import { Ability } from '../../../types/Pokemon';

export const waterveil: Ability = {
  id: "Water Veil",
  name: "Water Veil",
  description: "Prevents the Pokémon from getting a burn.",
  canApplyStatus: (_pokemon, status) => status !== 'Burn',
};
