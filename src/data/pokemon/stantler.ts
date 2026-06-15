import { PokemonBase } from '../../types/Pokemon';

export const stantler: PokemonBase = {
  id: 'stantler',
  name: 'Stantler',
  types: ['Normal'],
  baseStats: {
    hp: 73,
    atk: 95,
    def: 62,
    spa: 85,
    spd: 65,
    spe: 85,
  },
  abilities: ['Intimidate', 'Frisk', 'Sap Sipper'],
  learnset: [
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'mefirst' },
    { level: 3, moveId: 'leer' },
    { level: 5, moveId: 'confusion' },
    { level: 7, moveId: 'astonish' },
    { level: 9, moveId: 'hypnosis' },
    { level: 13, moveId: 'stomp' },
    { level: 15, moveId: 'calmmind' },
    { level: 16, moveId: 'sandattack' },
    { level: 21, moveId: 'takedown' },
    { level: 21, moveId: 'psyshieldbash' },
    { level: 23, moveId: 'confuseray' },
    { level: 29, moveId: 'extrasensory' },
    { level: 31, moveId: 'roleplay' },
    { level: 37, moveId: 'zenheadbutt' },
    { level: 43, moveId: 'jumpkick' },
    { level: 43, moveId: 'imprison' },
    { level: 43, moveId: 'lunge' },
    { level: 47, moveId: 'doubleedge' },
    { level: 49, moveId: 'captivate' },
    { level: 50, moveId: 'entrainment' }
  ]
};
