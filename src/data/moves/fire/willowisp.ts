import { Move } from '../../../types/Pokemon';

const willowisp: Move = {
  id: 'willowisp',
  name: 'Will-O-Wisp',
  type: 'Fire',
  category: 'Status',
  power: 0,
  accuracy: 85,
  pp: 15,
  description: 'Inflicts a burn on the foe with intense fire.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn'
  },
};

export default willowisp;
