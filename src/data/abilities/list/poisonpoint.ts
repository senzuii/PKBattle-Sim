import { Ability } from '../../../types/Pokemon';

export const poisonpoint: Ability = {
  id: 'Poison Point',
  name: 'Poison Point',
  description: 'Contact with the Pokémon may poison the attacker.',
  onContactHit: (attacker, defender, move, logs) => {
      if (!attacker.status && !attacker.types.includes('Poison') && !attacker.types.includes('Steel') && Math.random() < 0.3) {
        attacker.status = 'Poison';
        logs.push(`[${defender.name}'s Poison Point]`);
        logs.push(`${attacker.name} was poisoned!`);
      }
    }
};
