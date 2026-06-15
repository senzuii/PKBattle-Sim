import { Move } from '../../../types/Pokemon';

const waterpulse: Move = {
  id: 'waterpulse',
  name: 'Water Pulse',
  type: 'Water',
  category: 'Special',
  power: 60,
  accuracy: 100,
  pp: 20,
  description: 'Attacks with ultrasonic waves. May confuse the foe',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 20
  },
};

export default waterpulse;
