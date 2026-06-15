import { Move } from '../../../types/Pokemon';

const furyattack: Move = {
  id: 'furyattack',
  name: 'Fury Attack',
  type: 'Normal',
  category: 'Physical',
  power: 15,
  accuracy: 85,
  pp: 20,
  description: 'Jabs the target 2-5 times.',
  multiHit: [2, 5],
};

export default furyattack;
