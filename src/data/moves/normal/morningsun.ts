import { Move } from '../../../types/Pokemon';

const morningsun: Move = {
  id: 'morningsun',
  name: 'Morning Sun',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Restores HP (varies by time).',
  effect: { type: 'heal', target: 'self', percent: 50 },
};

export default morningsun;
