import { Move } from '../../../types/Pokemon';

const toxicspikes: Move = {
  id: 'toxicspikes',
  name: 'Toxic Spikes',
  type: 'Poison',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user lays a trap of poison spikes at the foe’s feet. They poison foes that switch into battle.',
  effect: { type: 'hazard', target: 'opponent', hazard: 'toxicspikes' },
};

export default toxicspikes;
