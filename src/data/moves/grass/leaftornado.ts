import { Move } from '../../../types/Pokemon';

const leaftornado: Move = {
  id: 'leaftornado',
  name: 'Leaf Tornado',
  type: 'Grass',
  category: 'Special',
  power: 65,
  accuracy: 90,
  pp: 10,
  description: 'The user attacks its target by encircling it in sharp leaves. This attack may also lower the target’s accuracy.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'accuracy',
    stages: -1,
    chance: 50
  },
};

export default leaftornado;
