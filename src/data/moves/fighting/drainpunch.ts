import { Move } from '../../../types/Pokemon';

const drainpunch: Move = {
  id: 'drainpunch',
  name: 'Drain Punch',
  type: 'Fighting',
  category: 'Physical',
  power: 75,
  accuracy: 100,
  pp: 10,
  description: 'An energy-draining punch. The user’s HP is restored by half the damage taken by the target.',
  effect: {
    type: 'drain',
    target: 'opponent',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default drainpunch;
