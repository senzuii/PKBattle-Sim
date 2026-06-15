import { Move } from '../../../types/Pokemon';

const copycat: Move = {
  id: 'copycat',
  name: 'Copycat',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user mimics the move used immediately before it. The move fails if no other move has been used yet.',
};

export default copycat;
