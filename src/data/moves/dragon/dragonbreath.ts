import { Move } from '../../../types/Pokemon';

const dragonbreath: Move = {
  id: 'dragonbreath',
  name: 'Dragon Breath',
  type: 'Dragon',
  category: 'Special',
  power: 60,
  accuracy: 100,
  pp: 20,
  description: 'A strong breath attack.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default dragonbreath;
