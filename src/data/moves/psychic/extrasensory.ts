import { Move } from '../../../types/Pokemon';

const extrasensory: Move = {
  id: 'extrasensory',
  name: 'Extrasensory',
  type: 'Psychic',
  category: 'Special',
  power: 80,
  accuracy: 100,
  pp: 20,
  description: 'Attacks with a peculiar power. May cause flinching.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 10
  },
};

export default extrasensory;
