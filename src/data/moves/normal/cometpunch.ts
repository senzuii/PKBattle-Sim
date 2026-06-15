import { Move } from '../../../types/Pokemon';

const cometpunch: Move = {
  id: 'cometpunch',
  name: 'Comet Punch',
  type: 'Normal',
  category: 'Physical',
  power: 18,
  accuracy: 85,
  pp: 15,
  description: 'Repeatedly punches 2-5 times.',
  multiHit: [2, 5],
};

export default cometpunch;
