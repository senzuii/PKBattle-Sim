import { Move } from '../../../types/Pokemon';

const pounce: Move = {
  id: 'pounce',
  name: 'Pounce',
  type: 'Bug',
  category: 'Physical',
  power: 50,
  accuracy: 100,
  pp: 20,
  description: 'The user attacks by pouncing on the target. This also lowers the target\'s Speed stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -1,
    chance: 100
  },
};

export default pounce;
