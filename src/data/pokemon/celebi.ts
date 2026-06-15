import { PokemonBase } from '../../types/Pokemon';

export const celebi: PokemonBase = {
  id: 'celebi',
  name: 'Celebi',
  types: ['Psychic', 'Grass'],
  baseStats: {
    hp: 100,
    atk: 100,
    def: 100,
    spa: 100,
    spd: 100,
    spe: 100,
  },
  abilities: ['Natural Cure'],
  learnset: [
    { level: 1, moveId: 'leechseed' },
    { level: 1, moveId: 'confusion' },
    { level: 1, moveId: 'recover' },
    { level: 1, moveId: 'healbell' },
    { level: 10, moveId: 'safeguard' },
    { level: 10, moveId: 'magicalleaf' },
    { level: 20, moveId: 'batonpass' },
    { level: 20, moveId: 'ancientpower' },
    { level: 30, moveId: 'futuresight' },
    { level: 40, moveId: 'lifedew' },
    { level: 46, moveId: 'naturalgift' },
    { level: 50, moveId: 'perishsong' },
    { level: 55, moveId: 'healblock' },
    { level: 73, moveId: 'healingwish' },
    { level: 82, moveId: 'leafstorm' }
  ]
};
