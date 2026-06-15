import { Move } from '../../../types/Pokemon';

const poltergeist: Move = {
  id: 'poltergeist',
  name: 'Poltergeist',
  type: 'Ghost',
  category: 'Physical',
  power: 110,
  accuracy: 90,
  pp: 5,
  description: 'The user attacks the target by controlling the target’s item. The move fails if the target doesn’t have an item.',
};

export default poltergeist;
