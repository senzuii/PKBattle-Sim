import { Move } from '../../../types/Pokemon';

const inferno: Move = {
  id: 'inferno',
  name: 'Inferno',
  type: 'Fire',
  category: 'Special',
  power: 100,
  accuracy: 50,
  pp: 5,
  description: 'The user attacks by engulfing the target in an intense fire. It leaves the target with a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 100
  },
};

export default inferno;
