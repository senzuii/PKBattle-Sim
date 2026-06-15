import { Move } from '../../../types/Pokemon';

const spikes: Move = {
  id: 'spikes',
  name: 'Spikes',
  type: 'Ground',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Hurts foes when they switch out.',
  effect: { type: 'hazard', target: 'opponent', hazard: 'spikes' },
};

export default spikes;
