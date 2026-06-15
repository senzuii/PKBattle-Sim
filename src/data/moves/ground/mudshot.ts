import { Move } from '../../../types/Pokemon';

const mudshot: Move = {
  id: 'mudshot',
  name: 'Mud Shot',
  type: 'Ground',
  category: 'Special',
  power: 55,
  accuracy: 95,
  pp: 15,
  description: 'Hurls mud at the foe and reduces SPEED.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default mudshot;
