import { Move } from '../../../types/Pokemon';

const sludgewave: Move = {
  id: 'sludgewave',
  name: 'Sludge Wave',
  type: 'Poison',
  category: 'Special',
  power: 95,
  accuracy: 100,
  pp: 10,
  description: 'It swamps the area around the user with a giant sludge wave. It may also poison those hit.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 10
  },
};

export default sludgewave;
