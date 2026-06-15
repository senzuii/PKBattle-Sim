import { Move } from '../types/Pokemon';

import { bugMoves } from './moves/bug/index';
import { darkMoves } from './moves/dark/index';
import { dragonMoves } from './moves/dragon/index';
import { electricMoves } from './moves/electric/index';
import { fairyMoves } from './moves/fairy/index';
import { fightingMoves } from './moves/fighting/index';
import { fireMoves } from './moves/fire/index';
import { flyingMoves } from './moves/flying/index';
import { ghostMoves } from './moves/ghost/index';
import { grassMoves } from './moves/grass/index';
import { groundMoves } from './moves/ground/index';
import { iceMoves } from './moves/ice/index';
import { normalMoves } from './moves/normal/index';
import { poisonMoves } from './moves/poison/index';
import { psychicMoves } from './moves/psychic/index';
import { rockMoves } from './moves/rock/index';
import { steelMoves } from './moves/steel/index';
import { waterMoves } from './moves/water/index';

export const MOVES: Record<string, Move> = {
  ...bugMoves,
  ...darkMoves,
  ...dragonMoves,
  ...electricMoves,
  ...fairyMoves,
  ...fightingMoves,
  ...fireMoves,
  ...flyingMoves,
  ...ghostMoves,
  ...grassMoves,
  ...groundMoves,
  ...iceMoves,
  ...normalMoves,
  ...poisonMoves,
  ...psychicMoves,
  ...rockMoves,
  ...steelMoves,
  ...waterMoves,
};
