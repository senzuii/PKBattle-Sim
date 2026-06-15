import { Ability } from '../../../types/Pokemon';

export const intimidate: Ability = {
  id: "Intimidate",
  name: "Intimidate",
  description: "Lowers the foe’s Attack stat on entry.",
  onSwitchIn: (pokemon, opponent, logs) => {
    if (!opponent || opponent.currentHp <= 0 || opponent.statStages.atk <= -6) return;
    opponent.statStages.atk = Math.max(-6, opponent.statStages.atk - 1);
    logs.push(`${pokemon.name}'s Intimidate cut ${opponent.name}'s Attack!`);
  },
};
