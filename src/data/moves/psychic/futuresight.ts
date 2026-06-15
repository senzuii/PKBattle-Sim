import { Move } from '../../../types/Pokemon';

const futuresight: Move = {
  id: 'futuresight',
  name: 'Future Sight',
  type: 'Psychic',
  category: 'Special',
  power: 120,
  accuracy: 100,
  pp: 10,
  description: 'An attack that hits on 3rd turn.',
  effect: { type: 'delayed_damage', target: 'opponent', turns: 2 },
};

export default futuresight;
