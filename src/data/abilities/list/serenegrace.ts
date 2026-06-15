import { Ability } from '../../../types/Pokemon';

export const serenegrace: Ability = {
  id: 'Serene Grace',
  name: 'Serene Grace',
  description: 'Raises the likelihood of added effects appearing.',
  modifySecondaryChance: (_pokemon, chance, role) =>
    role === 'attacker' ? chance * 2 : chance,
};
