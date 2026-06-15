import { Move } from '../../../types/Pokemon';

const secretpower: Move = {
  id: 'secretpower',
  name: 'Secret Power',
  type: 'Normal',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 20,
  description: 'An attack with effects that vary by location.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Paralysis',
    chance: 30
  },
};

export default secretpower;
