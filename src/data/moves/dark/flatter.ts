import { Move } from '../../../types/Pokemon';

const flatter: Move = {
  id: 'flatter',
  name: 'Flatter',
  type: 'Dark',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'Confuses the foe, but raises its SP. ATK.',
  effect: { type: 'stat_change', target: 'opponent', stat: 'spa', stages: 1 },
  secondaryEffect: { type: 'volatile_status', target: 'opponent', volatileStatus: 'Confusion' },
};

export default flatter;
