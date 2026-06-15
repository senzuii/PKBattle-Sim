import { Move } from '../../../types/Pokemon';

const blastburn: Move = {
  id: 'blastburn',
  name: 'Blast Burn',
  type: 'Fire',
  category: 'Special',
  power: 150,
  accuracy: 90,
  pp: 5,
  description: 'Powerful, but leaves the user immobile the next turn.',
  flags: { recharge: true },
};

export default blastburn;
