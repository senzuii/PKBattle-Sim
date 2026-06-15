import { Move } from '../../../types/Pokemon';

const roar: Move = {
  id: 'roar',
  name: 'Roar',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 20,
  description: 'Scares wild foes to end battle.',
  effect: {
    type: 'force_switch',
    target: 'opponent',
  },
};

export default roar;
