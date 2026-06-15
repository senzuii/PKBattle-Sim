import { Move } from '../../../types/Pokemon';

const incinerate: Move = {
  id: 'incinerate',
  name: 'Incinerate',
  type: 'Fire',
  category: 'Special',
  power: 60,
  accuracy: 100,
  pp: 15,
  description: 'The user attacks the target with fire. If the target is holding a Berry, the Berry becomes burnt up and unusable.',
};

export default incinerate;
