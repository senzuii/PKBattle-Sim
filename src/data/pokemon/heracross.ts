import { PokemonBase } from '../../types/Pokemon';

export const heracross: PokemonBase = {
  id: 'heracross',
  name: 'Heracross',
  types: ['Bug', 'Fighting'],
  baseStats: {
    hp: 80,
    atk: 125,
    def: 75,
    spa: 40,
    spd: 95,
    spe: 85,
  },
  abilities: ['Swarm', 'Guts', 'Moxie'],
  learnset: [
    { level: 1, moveId: 'hornattack' },
    { level: 1, moveId: 'tackle' },
    { level: 1, moveId: 'leer' },
    { level: 1, moveId: 'endure' },
    { level: 1, moveId: 'armthrust' },
    { level: 1, moveId: 'bulletseed' },
    { level: 1, moveId: 'nightslash' },
    { level: 5, moveId: 'furyattack' },
    { level: 5, moveId: 'rocksmash' },
    { level: 7, moveId: 'feint' },
    { level: 9, moveId: 'pinmissile' },
    { level: 10, moveId: 'aerialace' },
    { level: 16, moveId: 'chipaway' },
    { level: 19, moveId: 'counter' },
    { level: 19, moveId: 'brickbreak' },
    { level: 21, moveId: 'slash' },
    { level: 28, moveId: 'takedown' },
    { level: 29, moveId: 'swordsdance' },
    { level: 34, moveId: 'closecombat' },
    { level: 37, moveId: 'doubleedge' },
    { level: 37, moveId: 'megahorn' },
    { level: 40, moveId: 'throatchop' },
    { level: 43, moveId: 'reversal' },
    { level: 45, moveId: 'thrash' }
  ]
};
