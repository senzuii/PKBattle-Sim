import { Move } from '../../../types/Pokemon';

const pinmissile: Move = {
  id: 'pinmissile',
  name: 'Pin Missile',
  type: 'Bug',
  category: 'Physical',
  power: 25,
  accuracy: 95,
  pp: 20,
  description: 'Fires pins that strike 2-5 times.',
  multiHit: [2, 5],
};

export default pinmissile;
