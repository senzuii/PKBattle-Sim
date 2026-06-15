import { Move } from '../../../types/Pokemon';

const babydolleyes: Move = {
  id: 'babydolleyes',
  name: 'Baby-Doll Eyes',
  type: 'Fairy',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'The user stares at the target with its baby-doll eyes, which lowers its Attack stat. This move always goes first.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1
  },
};

export default babydolleyes;
