import { Move } from '../../../types/Pokemon';

const mistyexplosion: Move = {
  id: 'mistyexplosion',
  name: 'Misty Explosion',
  type: 'Fairy',
  category: 'Special',
  power: 100,
  accuracy: 100,
  pp: 5,
  description: 'The user attacks everything around it and faints upon using this move. This move’s power is increased on Misty Terrain.',
  flags: { selfDestruct: true },
};

export default mistyexplosion;
