import { Ability } from '../../../types/Pokemon';

export const lightningrod: Ability = {
  id: 'Lightning Rod',
  name: 'Lightning Rod',
  description: 'Draws in Electric moves to raise Sp. Atk.',
  interceptMove: (_attacker, defender, move, logs) => {
    if (move.type === 'Electric') {
      logs.push(`[${defender.name}'s Lightning Rod]`);
      if (defender.statStages.spa < 6) {
        defender.statStages.spa = Math.min(6, defender.statStages.spa + 1);
        logs.push(`${defender.name}'s Sp. Atk rose!`);
      } else {
        logs.push(`It doesn't affect ${defender.name}...`);
      }
      return true;
    }
    return false;
  },
};
