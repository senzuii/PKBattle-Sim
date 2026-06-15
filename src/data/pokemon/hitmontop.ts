import { PokemonBase } from '../../types/Pokemon';

export const hitmontop: PokemonBase = {
  id: 'hitmontop',
  name: 'Hitmontop',
  types: ['Fighting'],
  baseStats: {
    hp: 50,
    atk: 95,
    def: 95,
    spa: 35,
    spd: 110,
    spe: 70,
  },
  abilities: ['Intimidate', 'Technician', 'Steadfast'],
  learnset: [
    { level: 0, moveId: 'rollingkick' },
    { level: 0, moveId: 'triplekick' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'focusenergy' },
    { level: 1, moveId: 'detect' },
    { level: 1, moveId: 'pursuit' },
    { level: 1, moveId: 'rapidspin' },
    { level: 1, moveId: 'fakeout' },
    { level: 1, moveId: 'helpinghand' },
    { level: 1, moveId: 'revenge' },
    { level: 1, moveId: 'endeavor' },
    { level: 1, moveId: 'feint' },
    { level: 1, moveId: 'closecombat' },
    { level: 8, moveId: 'gyroball' },
    { level: 21, moveId: 'wideguard' },
    { level: 21, moveId: 'quickguard' },
    { level: 24, moveId: 'suckerpunch' },
    { level: 28, moveId: 'counter' },
    { level: 28, moveId: 'agility' },
    { level: 32, moveId: 'dig' }
  ]
};
