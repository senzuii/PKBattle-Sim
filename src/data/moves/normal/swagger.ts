import { Move } from '../../../types/Pokemon';

const swagger: Move = {
  id: 'swagger',
  name: 'Swagger',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 85,
  pp: 15,
  description: 'Causes confusion and raises ATTACK.',
  effect: { type: 'stat_change', target: 'opponent', stat: 'atk', stages: 2 },
  secondaryEffect: { type: 'volatile_status', target: 'opponent', volatileStatus: 'Confusion' },
};

export default swagger;
