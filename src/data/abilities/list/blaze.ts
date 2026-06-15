import { Ability } from '../../../types/Pokemon';

export const blaze: Ability = {
  id: "Blaze",
  name: "Blaze",
  description: "Powers up Fire-type moves in a pinch.",
  modifyBasePower: (attacker, _defender, move, basePower) =>
    attacker.ability === 'Blaze' && move.type === 'Fire' && attacker.currentHp <= attacker.maxHp / 3 ? basePower * 1.5 : basePower,
};
