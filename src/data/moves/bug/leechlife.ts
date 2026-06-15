import { Move } from '../../../types/Pokemon';

const leechlife: Move = {
  id: 'leechlife',
  name: 'Leech Life',
  type: 'Bug',
  category: 'Physical',
  power: 80,
  accuracy: 100,
  pp: 10,
  description: 'Steals 1/2 of the damage inflicted.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default leechlife;
