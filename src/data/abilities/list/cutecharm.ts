import { Ability } from '../../../types/Pokemon';

export const cutecharm: Ability = {
  id: 'Cute Charm',
  name: 'Cute Charm',
  description: 'Contact with the Pokémon may cause infatuation.',
  onContactHit: (attacker, defender, _move, logs) => {
    const a = attacker.gender;
    const d = defender.gender;
    if (!a || !d || a === 'N' || d === 'N' || a === d) return;
    if (attacker.volatileStatuses.includes('Infatuation')) return;
    if (Math.random() < 0.3) {
      attacker.volatileStatuses.push('Infatuation');
      logs.push(`[${defender.name}'s Cute Charm]`);
      logs.push(`${attacker.name} fell in love!`);
    }
  },
};
