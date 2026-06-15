import { PokemonBase } from '../../types/Pokemon';

export const weedle: PokemonBase = {
  "id": "weedle",
  "name": "Weedle",
  "types": [
    "Bug",
    "Poison"
  ],
  "baseStats": {
    "hp": 40,
    "atk": 35,
    "def": 30,
    "spa": 20,
    "spd": 20,
    "spe": 50
  },
  "abilities": [
    "Shield dust",
    "Run away"
  ],
  "learnset": [
    {
      "level": 1,
      "moveId": "poisonsting"
    },
    {
      "level": 1,
      "moveId": "stringshot"
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
