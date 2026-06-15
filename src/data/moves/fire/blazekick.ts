import { Move } from '../../../types/Pokemon';

const blazekick: Move = {
  id: 'blazekick',
  name: 'Blaze Kick',
  type: 'Fire',
  category: 'Physical',
  power: 85,
  accuracy: 90,
  pp: 10,
  description: 'A kick with a high critical- hit ratio. May cause a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
  critRatio: 2,
};

export default blazekick;
