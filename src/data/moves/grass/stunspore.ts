import { Move } from '../../../types/Pokemon';

const stunspore: Move = {
  id: 'stunspore',
  name: 'Stun Spore',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 75,
  pp: 30,
  description: 'A move that may paralyze the foe.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis'
  },
};

export default stunspore;
