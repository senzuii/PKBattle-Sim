import { Ability } from '../../../types/Pokemon';

export const staticAbility: Ability = {
  id: 'Static',
  name: 'Static',
  description: 'Contact with the Pokémon may cause paralysis.',
  onContactHit: (attacker, defender, _move, logs) => {
    if (!attacker.status && !attacker.types.includes('Electric') && Math.random() < 0.3) {
      attacker.status = 'Paralysis';
      logs.push(`[${defender.name}'s Static]`);
      logs.push(`${attacker.name} is paralyzed! It may be unable to move!`);
    }
  },
};
