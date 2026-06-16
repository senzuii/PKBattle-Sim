import { Ability } from '../../../types/Pokemon';

export const keeneye: Ability = {
  id: 'Keen Eye',
  name: 'Keen Eye',
  description: 'Prevents other Pokémon from lowering accuracy.',
  canLowerStat: (_pokemon, stat) => stat !== 'accuracy',
};
