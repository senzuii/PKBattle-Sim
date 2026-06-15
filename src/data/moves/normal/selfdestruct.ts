import { Move } from '../../../types/Pokemon';

const selfdestruct: Move = {
  id: 'selfdestruct',
  name: 'Self-Destruct',
  type: 'Normal',
  category: 'Physical',
  power: 200,
  accuracy: 100,
  pp: 5,
  description: 'Powerful but makes the user faint.',
  flags: { selfDestruct: true },
};

export default selfdestruct;
