import { PokemonBase } from '../../types/Pokemon';

export const scizor: PokemonBase = {
  id: 'scizor',
  name: 'Scizor',
  types: ['Bug', 'Steel'],
  baseStats: {
    hp: 70,
    atk: 130,
    def: 100,
    spa: 55,
    spd: 80,
    spe: 65,
  },
  abilities: ['Swarm', 'Technician', 'Light Metal'],
  learnset: [
    { level: 0, moveId: 'bulletpunch' },
    { level: 1, moveId: 'wingattack' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'agility' },
    { level: 1, moveId: 'quickattack' },
    { level: 1, moveId: 'falseswipe' },
    { level: 1, moveId: 'furycutter' },
    { level: 1, moveId: 'feint' },
    { level: 1, moveId: 'airslash' },
    { level: 5, moveId: 'focusenergy' },
    { level: 6, moveId: 'silverwind' },
    { level: 9, moveId: 'pursuit' },
    { level: 11, moveId: 'aerialace' },
    { level: 12, moveId: 'metalclaw' },
    { level: 14, moveId: 'doublehit' },
    { level: 16, moveId: 'doubleteam' },
    { level: 24, moveId: 'slash' },
    { level: 25, moveId: 'swordsdance' },
    { level: 32, moveId: 'irondefense' },
    { level: 33, moveId: 'razorwind' },
    { level: 34, moveId: 'xscissor' },
    { level: 34, moveId: 'ironhead' },
    { level: 43, moveId: 'closecombat' },
    { level: 44, moveId: 'laserfocus' },
    { level: 45, moveId: 'nightslash' }
  ]
};
