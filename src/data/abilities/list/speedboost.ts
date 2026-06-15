import { Ability } from '../../../types/Pokemon';

export const speedboost: Ability = {
  id: "Speed Boost",
  name: "Speed Boost",
  description: "Its Speed rises every turn.",
  onEndOfTurn: (pokemon, logs) => {
    if (pokemon.currentHp <= 0 || pokemon.statStages.spe >= 6) return;
    pokemon.statStages.spe = Math.min(6, pokemon.statStages.spe + 1);
    logs.push(`${pokemon.name}'s Speed Boost raised its Speed!`);
  },
};
