import { Move } from '../../../types/Pokemon';

const faketears: Move = {
  id: 'faketears',
  name: 'Fake Tears',
  type: 'Dark',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Feigns crying to sharply lower the foe’s SP. DEF.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spd',
    stages: -2
  },
};

export default faketears;
