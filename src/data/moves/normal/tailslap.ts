import { Move } from '../../../types/Pokemon';

const tailslap: Move = {
  id: 'tailslap',
  name: 'Tail Slap',
  type: 'Normal',
  category: 'Physical',
  power: 25,
  accuracy: 85,
  pp: 10,
  description: 'The user attacks by striking the target with its hard tail. It hits the target two to five times in a row.',
  multiHit: [2, 5],
};

export default tailslap;
