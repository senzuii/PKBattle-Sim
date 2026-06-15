import { Move } from '../../../types/Pokemon';

const energyball: Move = {
  id: 'energyball',
  name: 'Energy Ball',
  type: 'Grass',
  category: 'Special',
  power: 90,
  accuracy: 100,
  pp: 10,
  description: 'The user draws power from nature and fires it at the foe. It may also lower the target’s Sp. Def.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -1,
    chance: 10
  },
};

export default energyball;
