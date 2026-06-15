import { PokemonBase } from '../../types/Pokemon';

export const ariados: PokemonBase = {
  id: 'ariados',
  name: 'Ariados',
  types: ['Bug', 'Poison'],
  baseStats: {
    hp: 70,
    atk: 90,
    def: 70,
    spa: 60,
    spd: 70,
    spe: 40,
  },
  abilities: ['Swarm', 'Insomnia', 'Sniper'],
  learnset: [
    { level: 0, moveId: 'swordsdance' },
    { level: 1, moveId: 'poisonsting' },
    { level: 1, moveId: 'absorb' },
    { level: 1, moveId: 'stringshot' },
    { level: 1, moveId: 'focusenergy' },
    { level: 1, moveId: 'constrict' },
    { level: 1, moveId: 'scaryface' },
    { level: 1, moveId: 'bugbite' },
    { level: 1, moveId: 'fellstinger' },
    { level: 1, moveId: 'venomdrench' },
    { level: 8, moveId: 'infestation' },
    { level: 12, moveId: 'leechlife' },
    { level: 15, moveId: 'nightshade' },
    { level: 19, moveId: 'shadowsneak' },
    { level: 23, moveId: 'furyswipes' },
    { level: 28, moveId: 'suckerpunch' },
    { level: 31, moveId: 'agility' },
    { level: 32, moveId: 'spiderweb' },
    { level: 35, moveId: 'pinmissile' },
    { level: 41, moveId: 'psychic' },
    { level: 46, moveId: 'poisonjab' },
    { level: 50, moveId: 'crosspoison' },
    { level: 53, moveId: 'screech' },
    { level: 54, moveId: 'stickyweb' },
    { level: 59, moveId: 'toxicthread' }
  ]
};
