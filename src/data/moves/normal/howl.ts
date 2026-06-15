import { Move } from '../../../types/Pokemon';

const howl: Move = {
  id: 'howl',
  name: 'Howl',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 40,
  description: 'Howls to raise the spirit and boosts ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 1
  },
};

export default howl;
