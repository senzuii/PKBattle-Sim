import { Ability } from '../../../types/Pokemon';

export const voltabsorb: Ability = {
  id: 'Volt Absorb',
  name: 'Volt Absorb',
  description: 'Absorbs Electric-type moves to restore HP.',
  interceptMove: (attacker, defender, move, logs) => {
      if (move.type === 'Electric') {
        logs.push(`[${defender.name}'s Volt Absorb]`);
        if (defender.currentHp < defender.maxHp) {
          defender.currentHp = Math.min(defender.maxHp, defender.currentHp + Math.floor(defender.maxHp / 4));
          logs.push(`${defender.name} restored its HP!`);
        } else {
          logs.push(`${defender.name}'s HP is full!`);
        }
        return true;
      }
      return false;
    }
};
