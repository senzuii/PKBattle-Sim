import { BattlePokemon, Move, WeatherKind } from '../../types/Pokemon';
import { estimateDamage, ScreenState } from '../damage/DamageCalculator';
import { ScreenLayers, HazardLayers } from '../battle/Field';

/**
 * Field context the AI reasons about. Lets damage estimates account for weather
 * and the defender's screens, and lets the AI decide whether laying its own
 * weather/screens/hazards is worthwhile. All fields optional so callers without
 * a field (legacy / tests) still work.
 */
export interface AIContext {
  /** Active weather, if any — affects damage estimates and weather-setup value. */
  weather?: WeatherKind;
  /** Screens on the DEFENDER (player) side — they halve the AI's damage. */
  defenderScreens?: ScreenState;
  /** Screens on the AI's OWN side — for deciding whether to set one. */
  aiScreens?: ScreenLayers;
  /** Hazards already on the player's side — for deciding whether to lay more. */
  playerHazards?: HazardLayers;
}

/**
 * Moves the AI can actually use: PP remaining. Falls back to the full move
 * list if everything is out of PP (the engine treats that as Struggle-less
 * desperation — same behavior as before the rework).
 */
export function usableMoves(pokemon: BattlePokemon): Move[] {
  const withPp = pokemon.moves.filter(m => (m.currentPp ?? m.pp) > 0);
  return withPp.length > 0 ? withPp : pokemon.moves;
}

/** The damaging move with the highest average expected damage, if any. */
export function bestDamageMove(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moves: Move[],
  ctx?: AIContext,
): { move: Move; avg: number } | null {
  let best: { move: Move; avg: number } | null = null;
  for (const move of moves) {
    if (move.category === 'Status') continue;
    const { avg } = estimateDamage(attacker, defender, move, ctx?.weather, ctx?.defenderScreens);
    if (!best || avg > best.avg) best = { move, avg };
  }
  return best && best.avg > 0 ? best : null;
}

/** A move guaranteed to KO the defender even on the minimum damage roll. */
export function guaranteedKoMove(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moves: Move[],
  ctx?: AIContext,
): Move | null {
  for (const move of moves) {
    if (move.category === 'Status') continue;
    const { min } = estimateDamage(attacker, defender, move, ctx?.weather, ctx?.defenderScreens);
    if (min >= defender.currentHp) return move;
  }
  return null;
}

/**
 * A field-setup move (weather / screen / hazard) worth using this turn, or null.
 * Conservative on purpose: only while reasonably healthy, never against a
 * near-dead foe (just finish it), and never to re-apply a condition already in
 * effect. This is what makes the AI actually leverage the field rather than
 * ignore it.
 */
export function strategicFieldMove(
  aiPokemon: BattlePokemon,
  defender: BattlePokemon,
  moves: Move[],
  ctx: AIContext,
): Move | null {
  // Don't set up when low, or when the foe is almost down — attack instead.
  if (aiPokemon.currentHp < aiPokemon.maxHp * 0.5) return null;
  if (defender.currentHp < defender.maxHp * 0.35) return null;

  for (const move of moves) {
    const eff = move.effect;
    if (!eff) continue;

    // Screens: lay one only if it isn't already up on our side.
    if (eff.type === 'screen' && eff.screen) {
      const up = eff.screen === 'reflect'
        ? (ctx.aiScreens?.reflect ?? 0) > 0
        : (ctx.aiScreens?.lightScreen ?? 0) > 0;
      if (!up) return move;
    }

    // Weather: set it only if that weather isn't already active.
    if (eff.type === 'weather' && eff.weather && ctx.weather !== eff.weather) {
      return move;
    }

    // Hazards: lay only if the player's side isn't already at that layer cap.
    if (eff.type === 'hazard' && eff.hazard) {
      const h = ctx.playerHazards;
      const maxed =
        (eff.hazard === 'stealthrock'  && h?.stealthRock) ||
        (eff.hazard === 'spikes'       && (h?.spikes ?? 0) >= 3) ||
        (eff.hazard === 'toxicspikes'  && (h?.toxicSpikes ?? 0) >= 2);
      if (!maxed) return move;
    }
  }
  return null;
}
