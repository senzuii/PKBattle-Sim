import { Move } from '../../../types/Pokemon';

const lowsweep: Move = {
  id: 'lowsweep',
  name: 'Low Sweep',
  type: 'Fighting',
  category: 'Physical',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'The user attacks the target’s legs swiftly, reducing the target’s Speed stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default lowsweep;
