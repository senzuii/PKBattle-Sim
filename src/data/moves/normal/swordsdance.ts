import { Move } from '../../../types/Pokemon';

const swordsdance: Move = {
  id: 'swordsdance',
  name: 'Swords Dance',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'A dance that in­ creases ATTACK.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'atk',
    stages: 2
  },
};

export default swordsdance;
