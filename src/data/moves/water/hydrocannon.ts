import { Move } from '../../../types/Pokemon';

const hydrocannon: Move = {
  id: 'hydrocannon',
  name: 'Hydro Cannon',
  type: 'Water',
  category: 'Special',
  power: 150,
  accuracy: 90,
  pp: 5,
  description: 'Powerful, but leaves the user immobile the next turn.',
  flags: { recharge: true },
};

export default hydrocannon;
