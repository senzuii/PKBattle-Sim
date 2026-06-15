import { Move } from '../../../types/Pokemon';

const tickle: Move = {
  id: 'tickle',
  name: 'Tickle',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Makes the foe laugh to lower ATTACK and DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1
  },
};

export default tickle;
