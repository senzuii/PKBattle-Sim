import { Move } from '../../../types/Pokemon';

const autotomize: Move = {
  id: 'autotomize',
  name: 'Autotomize',
  type: 'Steel',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'The user sheds part of its body to make itself lighter and sharply raise its Speed stat.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spe',
    stages: 2
  },
};

export default autotomize;
