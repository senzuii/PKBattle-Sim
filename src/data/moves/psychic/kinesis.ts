import { Move } from '../../../types/Pokemon';

const kinesis: Move = {
  id: 'kinesis',
  name: 'Kinesis',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 80,
  pp: 15,
  description: 'Reduces the foe\'s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1
  },
};

export default kinesis;
