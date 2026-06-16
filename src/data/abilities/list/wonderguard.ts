import { Ability } from '../../../types/Pokemon';
import { getEffectiveness } from '../../../types/TypeChart';

export const wonderguard: Ability = {
  id: 'Wonder Guard',
  name: 'Wonder Guard',
  description: 'Only super-effective moves will hit.',
  // interceptMove only fires for damaging moves (status moves still land).
  interceptMove: (attacker, defender, move, logs) => {
    if (move.power <= 0) return false; // status-like / fixed-damage: let it through
    const eff = getEffectiveness(move.type, defender.types, attacker.ability === 'Scrappy');
    if (eff < 2) {
      logs.push(`[${defender.name}'s Wonder Guard]`);
      logs.push(`It doesn't affect ${defender.name}...`);
      return true;
    }
    return false;
  },
};
