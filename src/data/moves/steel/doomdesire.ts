import { Move } from '../../../types/Pokemon';

const doomdesire: Move = {
  id: 'doomdesire',
  name: 'Doom Desire',
  type: 'Steel',
  category: 'Special',
  power: 140,
  accuracy: 100,
  pp: 5,
  description: 'Summons sunlight to strike the target two turns later.',
  effect: { type: 'delayed_damage', target: 'opponent', turns: 2 },
};

export default doomdesire;
