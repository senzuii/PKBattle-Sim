import { Ability } from '../../../types/Pokemon';

export const chlorophyll: Ability = {
  id: 'Chlorophyll',
  name: 'Chlorophyll',
  description: 'Boosts Speed in sunshine.',
  getSpeedMultiplier: (pokemon, weather) => weather === 'Sun' ? 2.0 : 1.0
};
