import { Move } from '../../../types/Pokemon';

const retaliate: Move = {
  id: 'retaliate',
  name: 'Retaliate',
  type: 'Normal',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 5,
  description: 'The user gets revenge for a fainted ally. If an ally fainted in the previous turn, this attack’s damage increases.',
};

export default retaliate;
