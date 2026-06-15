import { Ability } from '../../../types/Pokemon';

export const shielddust: Ability = {
  id: 'Shield Dust',
  name: 'Shield Dust',
  description: 'Blocks the additional effects of moves.',
  modifySecondaryChance: (_pokemon, chance, role) =>
    role === 'defender' ? 0 : chance,
};
