import { Move } from '../../../types/Pokemon';

const synthesis: Move = {
  id: 'synthesis',
  name: 'Synthesis',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Restores HP (varies by time).',
  effect: { type: 'heal', target: 'self', percent: 50 },
};

export default synthesis;
