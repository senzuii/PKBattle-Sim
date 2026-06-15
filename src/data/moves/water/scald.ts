import { Move } from '../../../types/Pokemon';

const scald: Move = {
  id: 'scald',
  name: 'Scald',
  type: 'Water',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 15,
  description: 'The user shoots boiling hot water at its target. It may also leave the target with a burn.',
  effect: {
    type: 'status',
    target: 'opponent',
    status: 'Burn',
    chance: 30
  },
};

export default scald;
