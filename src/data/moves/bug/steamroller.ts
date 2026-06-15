import { Move } from '../../../types/Pokemon';

const steamroller: Move = {
  id: 'steamroller',
  name: 'Steamroller',
  type: 'Bug',
  category: 'Physical',
  power: 65,
  accuracy: 100,
  pp: 20,
  description: 'The user crushes its targets by rolling over them with its rolled-up body. This attack may make the target flinch.',
  effect: {
    type: 'volatile_status',
    target: 'opponent',
    volatileStatus: 'Flinch',
    chance: 30
  },
};

export default steamroller;
