import { PokemonBase } from '../../types/Pokemon';

export const spinarak: PokemonBase = {
  id: 'spinarak',
  name: 'Spinarak',
  types: ['Bug', 'Poison'],
  baseStats: {
    hp: 40,
    atk: 60,
    def: 40,
    spa: 40,
    spd: 40,
    spe: 30,
  },
  abilities: ['Swarm', 'Insomnia', 'Sniper'],
  learnset: [
    { level: 1, moveId: 'poisonsting' },
    { level: 1, moveId: 'stringshot' },
    { level: 1, moveId: 'constrict' },
    { level: 5, moveId: 'absorb' },
    { level: 5, moveId: 'scaryface' },
    { level: 8, moveId: 'infestation' },
    { level: 12, moveId: 'leechlife' },
    { level: 15, moveId: 'nightshade' },
    { level: 19, moveId: 'shadowsneak' },
    { level: 22, moveId: 'furyswipes' },
    { level: 26, moveId: 'suckerpunch' },
    { level: 29, moveId: 'agility' },
    { level: 29, moveId: 'spiderweb' },
    { level: 33, moveId: 'pinmissile' },
    { level: 36, moveId: 'psychic' },
    { level: 40, moveId: 'poisonjab' },
    { level: 44, moveId: 'crosspoison' },
    { level: 45, moveId: 'screech' },
    { level: 47, moveId: 'stickyweb' },
    { level: 51, moveId: 'toxicthread' }
  ]
};
