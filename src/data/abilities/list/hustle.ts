import { Ability } from '../../../types/Pokemon';

export const hustle: Ability = {
  id: 'Hustle',
  name: 'Hustle',
  description: 'Raises Attack, but lowers accuracy.',
  getStatMultiplier: (pokemon, stat) => stat === 'atk' ? 1.5 : 1.0,
    modifyAccuracy: (pokemon, accuracy) => accuracy * 0.8
};
