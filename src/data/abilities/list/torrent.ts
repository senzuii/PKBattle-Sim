import { Ability } from '../../../types/Pokemon';

export const torrent: Ability = {
  id: "Torrent",
  name: "Torrent",
  description: "Powers up Water-type moves in a pinch.",
  modifyBasePower: (attacker, _defender, move, basePower) =>
    move.type === 'Water' && attacker.currentHp <= attacker.maxHp / 3 ? basePower * 1.5 : basePower,
};
