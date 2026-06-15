import { Move } from '../../../types/Pokemon';

const moonlight: Move = {
  id: 'moonlight',
  name: 'Moonlight',
  type: 'Fairy',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Restores HP (varies by time).',
  effect: { type: 'heal', target: 'self', percent: 50 },
};

export default moonlight;
