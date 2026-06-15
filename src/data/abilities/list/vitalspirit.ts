import { Ability } from '../../../types/Pokemon';

export const vitalspirit: Ability = {
  id: "Vital Spirit",
  name: "Vital Spirit",
  description: "Prevents the Pokémon from falling asleep.",
  canApplyStatus: (_pokemon, status) => status !== 'Sleep',
};
