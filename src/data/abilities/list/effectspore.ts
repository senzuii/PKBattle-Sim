import { Ability } from '../../../types/Pokemon';

export const effectspore: Ability = {
  id: 'Effect Spore',
  name: 'Effect Spore',
  description: 'Contact may inflict poison, sleep, or paralysis.',
  onContactHit: (attacker, defender, _move, logs) => {
    if (attacker.status || attacker.types.includes('Grass')) return;
    if (Math.random() >= 0.3) return;
    const roll = Math.random();
    if (roll < 1 / 3) {
      attacker.status = 'Poison';
      logs.push(`[${defender.name}'s Effect Spore]`);
      logs.push(`${attacker.name} was poisoned!`);
    } else if (roll < 2 / 3) {
      attacker.status = 'Paralysis';
      logs.push(`[${defender.name}'s Effect Spore]`);
      logs.push(`${attacker.name} is paralyzed! It may be unable to move!`);
    } else {
      attacker.status = 'Sleep';
      attacker.statusTurns = 1 + Math.floor(Math.random() * 3);
      logs.push(`[${defender.name}'s Effect Spore]`);
      logs.push(`${attacker.name} fell asleep!`);
    }
  },
};
