import { Ability } from '../../../types/Pokemon';

export const magmaarmor: Ability = {
  id: "Magma Armor",
  name: "Magma Armor",
  description: "Prevents the Pokémon from becoming frozen.",
  canApplyStatus: (_pokemon, status) => status !== 'Freeze',
};
