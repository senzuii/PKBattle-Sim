import { Move } from '../../../types/Pokemon';

const scaleshot: Move = {
  id: 'scaleshot',
  name: 'Scale Shot',
  type: 'Dragon',
  category: 'Physical',
  power: 25,
  accuracy: 90,
  pp: 20,
  description: 'The user attacks by shooting scales two to five times in a row. This move boosts the user’s Speed stat but lowers its Defense stat.',
  multiHit: [2, 5],
};

export default scaleshot;
