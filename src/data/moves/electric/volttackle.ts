import { Move } from '../../../types/Pokemon';

const volttackle: Move = {
  id: 'volttackle',
  name: 'Volt Tackle',
  type: 'Electric',
  category: 'Physical',
  power: 120,
  accuracy: 100,
  pp: 15,
  description: 'A life-risking tackle that slightly hurts the user.',
  effect: { type: 'recoil', target: 'self', percent: 33 },
  secondaryEffect: { type: 'status', target: 'opponent', status: 'Paralysis', chance: 10 },
};

export default volttackle;
