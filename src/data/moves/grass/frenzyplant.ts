import { Move } from '../../../types/Pokemon';

const frenzyplant: Move = {
  id: 'frenzyplant',
  name: 'Frenzy Plant',
  type: 'Grass',
  category: 'Special',
  power: 150,
  accuracy: 90,
  pp: 5,
  description: 'Powerful, but leaves the user immobile the next turn.',
  flags: { recharge: true },
};

export default frenzyplant;
