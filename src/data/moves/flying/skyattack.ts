import { Move } from '../../../types/Pokemon';

const skyattack: Move = {
  id: 'skyattack',
  name: 'Sky Attack',
  type: 'Flying',
  category: 'Physical',
  power: 140,
  accuracy: 90,
  pp: 5,
  description: '1st turn: Prepare 2nd turn: Attack',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
  critRatio: 2,
};

export default skyattack;
