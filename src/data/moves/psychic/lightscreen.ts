import { Move } from '../../../types/Pokemon';

const lightscreen: Move = {
  id: 'lightscreen',
  name: 'Light Screen',
  type: 'Psychic',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 30,
  description: 'Ups SPCL.DEF with a wall of light.',
  effect: {
    type: 'screen',
    target: 'self',
    screen: 'lightscreen',
  },
};

export default lightscreen;
