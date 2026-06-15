import { CustomPokemon } from '../types/Pokemon';

export interface PresetOpponent {
  id: string;
  name: string;
  generation: number | null;
  pokemon: CustomPokemon[];
}

export const PRESETS: PresetOpponent[] = [
  {
    id: 'brock',
    name: 'Gym Leader Brock',
    generation: 1,
    pokemon: [
      {
        speciesId: 'onix',
        level: 14,
        moves: ['tackle', 'bide', 'bind', 'rockthrow'],
        ability: 'Rock Head',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      }
    ],
  },
  {
    id: 'misty',
    name: 'Gym Leader Misty',
    generation: 1,
    pokemon: [
      {
        speciesId: 'starmie',
        level: 21,
        moves: ['tackle', 'watergun', 'rapidspin', 'swift'], // bubblebeam usually but let's just put basic moves
        ability: 'Natural Cure',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      }
    ],
  },
  {
    id: 'cheren',
    name: 'Gym Leader Cheren',
    generation: 5,
    pokemon: [
      {
        speciesId: 'herdier',
        level: 13,
        moves: ['tackle', 'bite', 'workup', 'leer'],
        ability: 'Intimidate',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      }
    ],
  },
  {
    id: 'cynthia',
    name: 'Champion Cynthia',
    generation: 4,
    pokemon: [
      {
        speciesId: 'garchomp',
        level: 62,
        moves: ['dragonrush', 'earthquake', 'brickbreak', 'gigaimpact'],
        ability: 'Sand Veil',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 }, // just random max evs
      }
    ],
  },
  {
    id: 'leon',
    name: 'Champion Leon',
    generation: 8,
    pokemon: [
      {
        speciesId: 'charizard',
        level: 65,
        moves: ['flamethrower', 'airslash', 'dragonpulse', 'solarbeam'],
        ability: 'Blaze',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 },
      }
    ]
  },
  {
    id: 'nemona',
    name: 'Champion Nemona',
    generation: 9,
    pokemon: [
      {
        speciesId: 'quaquaval',
        level: 66,
        moves: ['aquastep', 'closecombat', 'icebreaker', 'aerialace'], // generic moves
        ability: 'Torrent',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 },
      }
    ]
  }
];
