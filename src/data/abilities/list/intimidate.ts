import { Ability } from '../../../types/Pokemon';

export const intimidate: Ability = {
  id: "Intimidate",
  name: "Intimidate",
  description: "Lowers the foe’s Attack stat on entry.",
  onSwitchIn: (pokemon, opponent, logs) => {
    if (!opponent || opponent.currentHp <= 0 || opponent.statStages.atk <= -6) return;
    // Clear Body / White Smoke / Hyper Cutter block Intimidate.
    const guard = opponent.ability;
    if (guard === 'Clear Body' || guard === 'White Smoke' || guard === 'Hyper Cutter') {
      logs.push(`[${opponent.name}'s ${guard}]`);
      logs.push(`${opponent.name}'s Attack was not lowered!`);
      return;
    }
    opponent.statStages.atk = Math.max(-6, opponent.statStages.atk - 1);
    logs.push(`${pokemon.name}'s Intimidate cut ${opponent.name}'s Attack!`);
  },
};
