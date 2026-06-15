import { Move } from '../../../types/Pokemon';

const cottonspore: Move = {
  id: 'cottonspore',
  name: 'Cotton Spore',
  type: 'Grass',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 40,
  description: 'The user releases cotton-like spores that cling to the target, harshly lowering its Speed stat.',
  effect: {
    type: 'stat_change',
    target: 'opponent',
    stat: 'spe',
    stages: -2
  },
};

export default cottonspore;
