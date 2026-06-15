import { Move } from '../../../types/Pokemon';

const skittersmack: Move = {
  id: 'skittersmack',
  name: 'Skitter Smack',
  type: 'Bug',
  category: 'Physical',
  power: 70,
  accuracy: 90,
  pp: 10,
  description: 'The user skitters behind the target to attack. This also lowers the target’s Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -1,
    chance: 100
  },
};

export default skittersmack;
