import { Move } from '../../../types/Pokemon';

const hyperbeam: Move = {
  id: 'hyperbeam',
  name: 'Hyper Beam',
  type: 'Normal',
  category: 'Special',
  power: 150,
  accuracy: 90,
  pp: 5,
  description: '1st turn: Attack 2nd turn: Rest',
  flags: { recharge: true },
};

export default hyperbeam;
