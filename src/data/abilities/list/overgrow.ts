import { Ability } from '../../../types/Pokemon';

export const overgrow: Ability = {
  id: "Overgrow",
  name: "Overgrow",
  description: "Powers up Grass-type moves in a pinch.",
  modifyBasePower: (attacker, _defender, move, basePower) =>
    attacker.ability === 'Overgrow' && move.type === 'Grass' && attacker.currentHp <= attacker.maxHp / 3 ? basePower * 1.5 : basePower,
};
