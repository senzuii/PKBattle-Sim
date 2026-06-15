import { Ability } from '../../../types/Pokemon';

export const immunity: Ability = {
  id: 'Immunity',
  name: 'Immunity',
  description: 'Prevents the Pokémon from getting poisoned.',
  canApplyStatus: (pokemon, status) => status !== 'Poison' && status !== 'Toxic'
};
