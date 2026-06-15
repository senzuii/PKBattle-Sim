import { Move } from '../../../types/Pokemon';

const stealthrock: Move = {
  id: 'stealthrock',
  name: 'Stealth Rock',
  type: 'Rock',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'The user lays a trap of levitating stones around the foe. The trap hurts foes that switch into battle.',
  effect: { type: 'hazard', target: 'opponent', hazard: 'stealthrock' },
};

export default stealthrock;
