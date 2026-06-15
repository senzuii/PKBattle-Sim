import { Move } from '../../../types/Pokemon';

const constrict: Move = {
  id: 'constrict',
  name: 'Constrict',
  type: 'Normal',
  category: 'Physical',
  power: 10,
  accuracy: 100,
  pp: 35,
  description: 'An attack that may lower SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 10
  },
};

export default constrict;
