import { PokemonBase } from '../../types/Pokemon';

export const ditto: PokemonBase = {
  "id": "ditto",
  "name": "Ditto",
  "types": [
    "Normal"
  ],
  "baseStats": {
    "hp": 48,
    "atk": 48,
    "def": 48,
    "spa": 48,
    "spd": 48,
    "spe": 48
  },
  "abilities": [
    "Limber",
    "Imposter"
  ],
  "learnset": [
    {
      "level": 1,
      "moveId": "transform"
    }
  ]
};
