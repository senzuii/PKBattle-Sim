import { BattlePokemon, Move } from '../../types/Pokemon';

/**
 * A combatant's choice for the turn. Switching resolves before any move.
 * `incoming` is the Pokémon being sent in (the engine clones it; the caller
 * is responsible for persisting the outgoing Pokémon's state).
 */
export type BattleAction =
  | { type: 'move'; move: Move }
  | { type: 'switch'; incoming: BattlePokemon };
