import { Move } from '../../../types/Pokemon';

const aeroblast: Move = {
  id: 'aeroblast',
  name: 'Aeroblast',
  type: 'Flying',
  category: 'Special',
  power: 100,
  accuracy: 95,
  pp: 5,
  description: 'A vortex of air is shot at the target to inflict damage. Critical hits land more easily.',
  critRatio: 2,
};

export default aeroblast;
