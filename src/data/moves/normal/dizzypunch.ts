import { Move } from '../../../types/Pokemon';

const dizzypunch: Move = {
  id: 'dizzypunch',
  name: 'Dizzy Punch',
  type: 'Normal',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 10,
  description: 'An attack that may cause confusion.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 20
  },
};

export default dizzypunch;
