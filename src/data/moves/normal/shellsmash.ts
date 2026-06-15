import { Move } from '../../../types/Pokemon';

const shellsmash: Move = {
  id: 'shellsmash',
  name: 'Shell Smash',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 15,
  description: 'The user breaks its shell, lowering its Defense and Sp. Def but sharply raising Attack, Sp. Atk, and Speed.',
  // Primary: +2 Atk, +2 SpA, +2 Spe (use effect for the main boost)
  effect: { type: 'stat_change', target: 'self', stat: 'atk', stages: 2 },
  // Secondary: -1 Def (and by convention -1 SpD handled in engine special case)
  secondaryEffect: { type: 'stat_change', target: 'self', stat: 'def', stages: -1 },
  flags: { shellsmash: true }, // engine can check this to apply all 5 stat changes
};

export default shellsmash;
