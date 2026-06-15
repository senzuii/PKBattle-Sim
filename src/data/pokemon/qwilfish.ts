import { PokemonBase } from '../../types/Pokemon';

export const qwilfish: PokemonBase = {
  id: 'qwilfish',
  name: 'Qwilfish',
  types: ['Water', 'Poison'],
  baseStats: {
    hp: 65,
    atk: 95,
    def: 85,
    spa: 55,
    spd: 55,
    spe: 85,
  },
  abilities: ['Poison Point', 'Swift Swim', 'Intimidate'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'poisonsting' },
    { level: 1, moveId: 'watergun' },
    { level: 1, moveId: 'hydropump' },
    { level: 1, moveId: 'spikes' },
    { level: 1, moveId: 'destinybond' },
    { level: 1, moveId: 'fellstinger' },
    { level: 4, moveId: 'harden' },
    { level: 9, moveId: 'minimize' },
    { level: 13, moveId: 'bubble' },
    { level: 17, moveId: 'rollout' },
    { level: 21, moveId: 'pinmissile' },
    { level: 21, moveId: 'toxicspikes' },
    { level: 24, moveId: 'brine' },
    { level: 25, moveId: 'stockpile' },
    { level: 25, moveId: 'spitup' },
    { level: 25, moveId: 'revenge' },
    { level: 28, moveId: 'poisonjab' },
    { level: 33, moveId: 'takedown' },
    { level: 44, moveId: 'toxic' },
    { level: 45, moveId: 'aquatail' },
    { level: 52, moveId: 'acupressure' }
  ]
};
