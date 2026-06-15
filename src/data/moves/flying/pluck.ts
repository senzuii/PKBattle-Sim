import { Move } from '../../../types/Pokemon';

const pluck: Move = {
  id: 'pluck',
  name: 'Pluck',
  type: 'Flying',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 20,
  description: 'The user pecks the foe. If the foe is holding a Berry, the user plucks it and gains its effect.',
};

export default pluck;
