import { Ability } from '../../../types/Pokemon';

export const levitate: Ability = {
  id: 'Levitate',
  name: 'Levitate',
  description: 'Gives immunity to Ground-type moves.',
  interceptMove: (attacker, defender, move, logs) => {
      if (move.type === 'Ground') {
        logs.push(`[${defender.name}'s Levitate]`);
        logs.push(`It doesn't affect ${defender.name}...`);
        return true;
      }
      return false;
    }
};
