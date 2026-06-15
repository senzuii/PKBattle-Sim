import { Move } from '../../../types/Pokemon';

const fireblast: Move = {
  id: 'fireblast',
  name: 'Fire Blast',
  type: 'Fire',
  category: 'Special',
  power: 110,
  accuracy: 85,
  pp: 5,
  description: 'An attack that may cause a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 10
  },
};

export default fireblast;
