import { Move } from '../../../types/Pokemon';

const flareblitz: Move = {
  id: 'flareblitz',
  name: 'Flare Blitz',
  type: 'Fire',
  category: 'Physical',
  power: 120,
  accuracy: 100,
  pp: 15,
  description: 'The user cloaks itself in fire and charges at the foe. The user sustains serious damage, too.',
  effect: { type: 'recoil', target: 'self', percent: 33 },
  secondaryEffect: { type: 'status', target: 'opponent', status: 'Burn', chance: 10 },
};

export default flareblitz;
