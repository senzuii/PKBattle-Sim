import { Move } from '../../../types/Pokemon';

const moonblast: Move = {
  id: 'moonblast',
  name: 'Moonblast',
  type: 'Fairy',
  category: 'Special',
  power: 95,
  accuracy: 100,
  pp: 15,
  description: 'Borrowing the power of the moon, the user attacks the target. This may also lower the target’s Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 30
  },
};

export default moonblast;
