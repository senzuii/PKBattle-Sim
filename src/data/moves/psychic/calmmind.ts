import { Move } from '../../../types/Pokemon';

const calmmind: Move = {
  id: 'calmmind',
  name: 'Calm Mind',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Raises SP. ATK and SP. DEF by focusing the mind.',
  effect: {
    type: 'stat_change',
    target: 'self',
    stat: 'spa',
    stages: 1
  },
};

export default calmmind;
