import { Move } from '../../../types/Pokemon';

const poisonjab: Move = {
  id: 'poisonjab',
  name: 'Poison Jab',
  type: 'Poison',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 20,
  description: 'The foe is stabbed with a tentacle or arm steeped in poison. It may also poison the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Poison',
    chance: 30
  },
};

export default poisonjab;
