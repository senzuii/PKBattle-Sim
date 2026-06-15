import { Ability } from '../../../types/Pokemon';

export const technician: Ability = {
  id: "Technician",
  name: "Technician",
  description: "Powers up the Pokémon’s weaker moves.",
  modifyBasePower: (attacker, _defender, _move, basePower) =>
    attacker.ability === 'Technician' && basePower <= 60 ? basePower * 1.5 : basePower,
};
