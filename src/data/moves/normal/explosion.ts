import { Move } from '../../../types/Pokemon';

const explosion: Move = {
  id: 'explosion',
  name: 'Explosion',
  type: 'Normal',
  category: 'Physical',
  power: 250,
  accuracy: 100,
  pp: 5,
  description: 'Very powerful but makes user faint.',
  flags: { selfDestruct: true },
};

export default explosion;
