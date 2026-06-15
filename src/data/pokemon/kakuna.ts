import { PokemonBase } from '../../types/Pokemon';

export const kakuna: PokemonBase = {
  "id": "kakuna",
  "name": "Kakuna",
  "types": [
    "Bug",
    "Poison"
  ],
  "baseStats": {
    "hp": 45,
    "atk": 25,
    "def": 50,
    "spa": 25,
    "spd": 25,
    "spe": 35
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
