import { Move } from '../../../types/Pokemon';

const drainingkiss: Move = {
  id: 'drainingkiss',
  name: 'Draining Kiss',
  type: 'Fairy',
  category: 'Special',
  power: 50,
  accuracy: 100,
  pp: 10,
  description: 'The user steals the target’s energy with a kiss. The user’s HP is restored by over half of the damage taken by the target.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((3 / 4) * 100)
  },
};

export default drainingkiss;
