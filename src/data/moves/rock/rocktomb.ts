import { Move } from '../../../types/Pokemon';

const rocktomb: Move = {
  id: 'rocktomb',
  name: 'Rock Tomb',
  type: 'Rock',
  category: 'Physical',
  power: 60,
  accuracy: 95,
  pp: 15,
  description: 'Stops the foe from moving with rocks and cuts SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default rocktomb;
