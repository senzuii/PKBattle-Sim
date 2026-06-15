import { Move } from '../../../types/Pokemon';

const eerieimpulse: Move = {
  id: 'eerieimpulse',
  name: 'Eerie Impulse',
  type: 'Electric',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'The user’s body generates an eerie impulse. Exposing the target to it harshly lowers the target’s Sp. Atk stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spa',
    stages: -2
  },
};

export default eerieimpulse;
