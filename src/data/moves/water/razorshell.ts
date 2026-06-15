import { Move } from '../../../types/Pokemon';

const razorshell: Move = {
  id: 'razorshell',
  name: 'Razor Shell',
  type: 'Water',
  category: 'Physical',
  power: 75,
  accuracy: 95,
  pp: 10,
  description: 'The user cuts its target with sharp shells. This attack may also lower the target’s Defense stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 50
  },
};

export default razorshell;
