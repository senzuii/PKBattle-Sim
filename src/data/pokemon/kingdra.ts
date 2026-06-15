import { PokemonBase } from '../../types/Pokemon';

export const kingdra: PokemonBase = {
  id: 'kingdra',
  name: 'Kingdra',
  types: ['Water', 'Dragon'],
  baseStats: {
    hp: 75,
    atk: 95,
    def: 95,
    spa: 95,
    spd: 95,
    spe: 85,
  },
  abilities: ['Swift Swim', 'Sniper', 'Damp'],
  learnset: [
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'hydropump' },
    { level: 1, moveId: 'smokescreen' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'twister' },
    { level: 1, moveId: 'whirlpool' },
    { level: 1, moveId: 'yawn' },
    { level: 1, moveId: 'dragonpulse' },
    { level: 14, moveId: 'focusenergy' },
    { level: 18, moveId: 'bubblebeam' },
    { level: 20, moveId: 'dragonbreath' },
    { level: 23, moveId: 'agility' },
    { level: 30, moveId: 'brine' },
    { level: 37, moveId: 'waterpulse' },
    { level: 37, moveId: 'laserfocus' },
    { level: 48, moveId: 'dragondance' },
    { level: 65, moveId: 'raindance' },
    { level: 72, moveId: 'wavecrash' }
  ]
};
