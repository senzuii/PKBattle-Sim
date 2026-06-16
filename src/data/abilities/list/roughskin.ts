import { Ability } from '../../../types/Pokemon';

export const roughskin: Ability = {
  id: 'Rough Skin',
  name: 'Rough Skin',
  description: 'Hurts attackers that make contact.',
  onContactHit: (attacker, defender, _move, logs) => {
    const dmg = Math.max(1, Math.floor(attacker.maxHp / 8));
    attacker.currentHp = Math.max(0, attacker.currentHp - dmg);
    logs.push(`[${defender.name}'s Rough Skin]`);
    logs.push(`${attacker.name} was hurt!`);
  },
};
