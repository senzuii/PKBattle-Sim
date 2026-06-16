import { Ability } from '../../../types/Pokemon';

export const sapsipper: Ability = {
  id: 'Sap Sipper',
  name: 'Sap Sipper',
  description: 'Absorbs Grass moves to raise Attack.',
  interceptMove: (_attacker, defender, move, logs) => {
    if (move.type === 'Grass') {
      logs.push(`[${defender.name}'s Sap Sipper]`);
      if (defender.statStages.atk < 6) {
        defender.statStages.atk = Math.min(6, defender.statStages.atk + 1);
        logs.push(`${defender.name}'s Attack rose!`);
      } else {
        logs.push(`It doesn't affect ${defender.name}...`);
      }
      return true;
    }
    return false;
  },
};
