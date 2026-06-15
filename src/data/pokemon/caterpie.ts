import { PokemonBase } from '../../types/Pokemon';

export const caterpie: PokemonBase = {
  "id": "caterpie",
  "name": "Caterpie",
  "types": [
    "Bug"
  ],
  "baseStats": {
    "hp": 45,
    "atk": 30,
    "def": 35,
    "spa": 20,
    "spd": 20,
    "spe": 45
  },
  "abilities": [
    "Shield dust",
    "Run away"
  ],
  "learnset": [
    {
      "level": 1,
      "moveId": "tackle"
    },
    {
      "level": 1,
      "moveId": "stringshot"
    },
    {
      "level": 1,
      "moveId": "snore"
    },
    {
      "level": 1,
      "moveId": "electroweb"
    },
    {
      "level": 15,
      "moveId": "bugbite"
    }
  ]
};
