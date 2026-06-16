import { Ability } from '../../../types/Pokemon';

export const stormdrain: Ability = {
  id: 'Storm Drain',
  name: 'Storm Drain',
  description: 'Draws in Water moves to raise Sp. Atk.',
  interceptMove: (_attacker, defender, move, logs) => {
    if (move.type === 'Water') {
      logs.push(`[${defender.name}'s Storm Drain]`);
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
