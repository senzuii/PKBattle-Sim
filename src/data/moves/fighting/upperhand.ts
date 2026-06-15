import { Move } from '../../../types/Pokemon';

const upperhand: Move = {
  id: 'upperhand',
  name: 'Upper Hand',
  type: 'Fighting',
  category: 'Physical',
  power: 65,
  accuracy: 100,
  pp: 15,
  description: 'The user reacts to the target\'s movement and strikes with the heel of its palm, making the target flinch. This move fails if the target is not readying a priority move.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 100
  },
};

export default upperhand;
