import { Move } from '../../../types/Pokemon';

const hypnosis: Move = {
  id: 'hypnosis',
  name: 'Hypnosis',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 60,
  pp: 20,
  description: 'May put the foe to sleep.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Sleep'
  },
};

export default hypnosis;
