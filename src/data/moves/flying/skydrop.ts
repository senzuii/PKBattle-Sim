import { Move } from '../../../types/Pokemon';

const skydrop: Move = {
  id: 'skydrop',
  name: 'Sky Drop',
  type: 'Flying',
  category: 'Physical',
  power: 60,
  accuracy: 100,
  pp: 10,
  description: 'The user takes the target into the sky, then drops it during the next turn. The target cannot attack while in the sky.',
};

export default skydrop;
