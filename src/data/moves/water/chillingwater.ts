import { Move } from '../../../types/Pokemon';

const chillingwater: Move = {
  id: 'chillingwater',
  name: 'Chilling Water',
  type: 'Water',
  category: 'Special',
  power: 50,
  accuracy: 100,
  pp: 20,
  description: 'The user attacks the target by showering it with water that\'s so cold it saps the target\'s power. This also lowers the target\'s Attack stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'atk',
    stages: -1,
    chance: 100
  },
};

export default chillingwater;
