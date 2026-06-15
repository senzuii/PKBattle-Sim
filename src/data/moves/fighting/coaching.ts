import { Move } from '../../../types/Pokemon';

const coaching: Move = {
  id: 'coaching',
  name: 'Coaching',
  type: 'Fighting',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 10,
  description: 'The user properly coaches its ally Pokémon, boosting their Attack and Defense stats.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: 1
  },
};

export default coaching;
