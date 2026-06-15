import { Move } from '../../../types/Pokemon';

const bugbuzz: Move = {
  id: 'bugbuzz',
  name: 'Bug Buzz',
  type: 'Bug',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'The user vibrates its wings to generate a damaging sound wave. It may also lower the foe’s Sp. Def stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default bugbuzz;
