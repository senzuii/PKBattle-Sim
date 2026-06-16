import { Ability } from '../../../types/Pokemon';

export const flashfire: Ability = {
  id: 'Flash Fire',
  name: 'Flash Fire',
  description: 'Makes the Pokémon immune to Fire-type moves.',
  interceptMove: (_attacker, defender, move, logs) => {
    if (move.type === 'Fire') {
      logs.push(`[${defender.name}'s Flash Fire]`);
      logs.push(`It doesn't affect ${defender.name}...`);
      return true;
    }
    return false;
  },
};
