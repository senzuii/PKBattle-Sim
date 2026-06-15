import { Move } from '../../../types/Pokemon';

const flash: Move = {
  id: 'flash',
  name: 'Flash',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Blinds the foe to reduce accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1
  },
};

export default flash;
