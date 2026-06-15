import { Move } from '../../../types/Pokemon';

const ingrain: Move = {
  id: 'ingrain',
  name: 'Ingrain',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Lays roots that restore HP. The user can’t switch out.',
  effect: { type: 'heal', target: 'self', percent: 6 },
};

export default ingrain;
