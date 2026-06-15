import { Move } from '../../../types/Pokemon';

const signalbeam: Move = {
  id: 'signalbeam',
  name: 'Signal Beam',
  type: 'Bug',
  category: 'Special',
  power: 75,
  accuracy: 100,
  pp: 15,
  description: 'A strange beam attack that may confuse the foe.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Confusion',
    chance: 10
  },
};

export default signalbeam;
