import { Move } from '../../../types/Pokemon';

const growth: Move = {
  id: 'growth',
  name: 'Growth',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Raises the Special Attack and Attack stats.',
  effect: { type: 'stat_change', target: 'self', stat: 'spa', stages: 1 },
  secondaryEffect: { type: 'stat_change', target: 'self', stat: 'atk', stages: 1 },
};

export default growth;
