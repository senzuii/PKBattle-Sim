import { PokemonBase } from '../../types/Pokemon';

export const magikarp: PokemonBase = {
  "id": "magikarp",
  "name": "Magikarp",
  "types": [
    "Water"
  ],
  "baseStats": {
    "hp": 20,
    "atk": 10,
    "def": 55,
    "spa": 15,
    "spd": 20,
    "spe": 80
  },
  "abilities": [
    "Swift swim",
    "Rattled"
  ],
  "learnset": [
    {
      "level": 1,
      "moveId": "hydropump"
    },
    {
      "level": 1,
      "moveId": "splash"
    },
    {
      "level": 1,
      "moveId": "bounce"
    },
    {
      "level": 15,
      "moveId": "tackle"
    },
    {
      "level": 30,
      "moveId": "flail"
    }
  ]
};
