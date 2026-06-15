import { Move } from '../../../types/Pokemon';

const crushclaw: Move = {
  id: 'crushclaw',
  name: 'Crush Claw',
  type: 'Normal',
  category: 'Physical',
  power: 75,
  accuracy: 95,
  pp: 10,
  description: 'Tears at the foe with sharp claws. May lower DEFENSE.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'def',
    stages: -1,
    chance: 50
  },
};

export default crushclaw;
