import { Move } from '../../../types/Pokemon';

const feint: Move = {
  id: 'feint',
  name: 'Feint',
  type: 'Normal',
  category: 'Physical',
  power: 30,
  accuracy: 100,
  pp: 10,
  description: 'An attack that hits a foe using Protect or Detect. It also lifts the effects of those moves.',
};

export default feint;
