import { PokemonBase } from '../../types/Pokemon';

export const mantine: PokemonBase = {
  id: 'mantine',
  name: 'Mantine',
  types: ['Water', 'Flying'],
  baseStats: {
    hp: 85,
    atk: 40,
    def: 70,
    spa: 80,
    spd: 140,
    spe: 70,
  },
  abilities: ['Swift Swim', 'Water Absorb', 'Water Veil'],
  learnset: [
    { level: 1, moveId: 'wingattack' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'supersonic' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'psybeam' },
    { level: 1, moveId: 'bubblebeam' },
    { level: 1, moveId: 'bubble' },
    { level: 1, moveId: 'signalbeam' },
    { level: 1, moveId: 'bulletseed' },
    { level: 1, moveId: 'roost' },
    { level: 9, moveId: 'aerialace' },
    { level: 11, moveId: 'confuseray' },
    { level: 12, moveId: 'waterpulse' },
    { level: 13, moveId: 'headbutt' },
    { level: 16, moveId: 'wideguard' },
    { level: 19, moveId: 'agility' },
    { level: 21, moveId: 'airslash' },
    { level: 22, moveId: 'takedown' },
    { level: 36, moveId: 'aquaring' },
    { level: 37, moveId: 'hydropump' },
    { level: 40, moveId: 'bounce' },
    { level: 47, moveId: 'doubleedge' }
  ]
};
