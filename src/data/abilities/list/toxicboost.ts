import { Ability } from '../../../types/Pokemon';

export const toxicboost: Ability = {
  id: "Toxic Boost",
  name: "Toxic Boost",
  description: "Boosts Attack when poisoned.",
  getStatMultiplier: (pokemon, stat) =>
    stat === 'atk' && (pokemon.status === 'Poison' || pokemon.status === 'Toxic') ? 1.5 : 1.0,
};
