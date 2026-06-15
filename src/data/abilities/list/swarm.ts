import { Ability } from '../../../types/Pokemon';

export const swarm: Ability = {
  id: "Swarm",
  name: "Swarm",
  description: "Powers up Bug-type moves in a pinch.",
  modifyBasePower: (attacker, _defender, move, basePower) =>
    attacker.ability === 'Swarm' && move.type === 'Bug' && attacker.currentHp <= attacker.maxHp / 3 ? basePower * 1.5 : basePower,
};
