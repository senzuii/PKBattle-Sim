import { Ability } from '../../../types/Pokemon';

export const thickfat: Ability = {
  id: "Thick Fat",
  name: "Thick Fat",
  description: "Halves damage from Fire- and Ice-type moves.",
  modifyBasePower: (_attacker, defender, move, basePower) =>
    defender.ability === 'Thick Fat' && (move.type === 'Fire' || move.type === 'Ice') ? basePower * 0.5 : basePower,
};
