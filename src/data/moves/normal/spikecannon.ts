import { Move } from '../../../types/Pokemon';

const spikecannon: Move = {
  id: 'spikecannon',
  name: 'Spike Cannon',
  type: 'Normal',
  category: 'Physical',
  power: 20,
  accuracy: 100,
  pp: 15,
  description: 'Fires spikes to hit 2-5 times.',
  multiHit: [2, 5],
};

export default spikecannon;
