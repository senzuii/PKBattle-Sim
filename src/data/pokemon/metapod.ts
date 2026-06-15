import { PokemonBase } from '../../types/Pokemon';

export const metapod: PokemonBase = {
  "id": "metapod",
  "name": "Metapod",
  "types": [
    "Bug"
  ],
  "baseStats": {
    "hp": 50,
    "atk": 20,
    "def": 55,
    "spa": 25,
    "spd": 25,
    "spe": 30
  },
  "abilities": [
    "Shed skin"
  ],
  "learnset": [
    {
      "level": 1,
      "moveId": "stringshot"
    },
    {
      "level": 1,
      "moveId": "harden"
    },
    {
      "level": 1,
      "moveId": "irondefense"
    },
    {
      "level": 1,
      "moveId": "bugbite"
    },
    {
      "level": 1,
      "moveId": "electroweb"
    }
  ]
};
