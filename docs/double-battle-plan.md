# Double Battle System — Implementation Plan

Gen 3 introduced double battles. This is the single largest feature on the roadmap:
it touches the **turn engine, damage calc, store, AI, and battle UI**. The plan below
phases the work so **singles keeps working the whole time** (singles = "1 slot per side").

## Ground rules (Gen 3 doubles)
- 2 active Pokémon per side (4 on the field).
- **No spread-damage reduction** in Gen 3 (the 0.75× nerf is Gen 4+). Earthquake/Surf
  hit all other Pokémon (both foes **and** your ally) at full power.
- Lightning Rod / Storm Drain redirect single-target moves of their type to the holder.
- Replacements for fainted mons are sent **at end of turn** (Gen 3 behavior).
- Intimidate lowers Attack of **all** adjacent foes on entry.

## Current architecture (singles) — what changes
- `executeBattleTurn(player, opponent, playerAction, opponentAction, field)` — exactly 2 combatants.
- `Side = { pokemon, action, isPlayer, … }` — one pokemon per side.
- Store: `playerPokemon` / `opponentPokemon` (single), `playerActiveIdx` / `opponentActiveIdx`.
- `performMove(side, other, move, …)` — assumes a single `defender`.
- AI: `selectAIMove` returns one move. UI: one sprite per side, no target picker.

## Phase 1 — Data model (foundation)
- Introduce a **slot** abstraction: `Slot = { side: 'player'|'opponent'; position: 0|1 }`.
- Store gains `format: 'singles' | 'doubles'` and active **arrays**:
  `playerActive: number[]` and `opponentActive: number[]` (length 1 in singles, 2 in doubles).
  Keep `playerPokemon`/`opponentPokemon` as derived `active[0]` for back-compat during migration.
- `BattleAction` for a move gains a **`target: Slot`** (or `'spread'`). Switch actions unchanged.
- Map move targeting from the Showdown data we already ship (`learnsets/moves.ts` has a
  `target` field: `"normal"`, `"allAdjacentFoes"`, `"allAdjacent"`, `"self"`, `"adjacentAlly"`, …).
  Add a small `MOVE_TARGET` resolver → one of: `single-foe | both-foes | all-others | self | ally | field`.

## Phase 2 — Turn engine generalization (the core)
- Replace the fixed 2-`Side` model with an **N-combatant** model:
  build a list of all active combatants (≤4), each with its chosen action.
- **Ordering**: flatten all actions, sort by priority → effective speed → coin flip
  (reuse `TurnOrder`), switches first. Resolve **one action at a time**, re-checking faints
  between each (a target may already be down — then the move fizzles / retargets per rules).
- `performMove` is generalized to `(attackerSlot, targetSlots[], field, combatants, …)`:
  - single-target → `[chosen foe]`
  - spread (`both-foes` / `all-others`) → expand to all living legal targets, loop damage.
  - redirection pass: before resolving a single-target move, check foes for
    Lightning Rod / Storm Drain (matching type) and retarget.
- End-of-turn effects iterate **every** active mon (weather/status/trap/etc. already per-mon).
- **Mid-turn faints leave empty slots**; replacements are queued and sent at end of turn.

## Phase 3 — Damage & targeting details
- `rollDamage` already takes attacker+defender; spread just calls it per target.
- (Gen 3: no spread multiplier — skip the 0.75×.)
- Self-targeting / ally-targeting moves (Helping Hand, Follow Me) — Gen 3 subset.
- Counter/Mirror Coat target "the last foe that hit me" — store `lastAttackerSlot` per mon
  (we already track `damageTakenThisTurn`; extend with attacker identity).

## Phase 4 — AI
- AI commands **both** of its active mons: pick move + target for each.
- Heuristics: prefer super-effective single targets; use spread when it nets value without
  over-hurting its own ally; avoid redirected types. Reuse existing scoring per (move,target).

## Phase 5 — Battle UI (largest UI change)
- Arena renders **2 sprites per side** (4 total) with 2 HUD cards per side.
- **Command flow**: choose actions for your active mons one at a time —
  pick a move → if it needs a target, tap the foe (or ally) to target → confirm; repeat for
  the 2nd mon; then the turn resolves. A "Cancel/Back" to re-pick the first.
- **Target picker**: highlight valid targets after a move is selected.
- **Faint/replacement**: handle up to 2 KOs and prompt for up to 2 switch-ins
  (extend the existing slide-up switch sheet to a multi-pick mode).

## Phase 6 — Interactions to audit (assume single defender today)
- Trapping, Encore/Disable/Taunt/Torment (per-mon — fine), Baton Pass (passes to a chosen slot),
  Pursuit (which switching foe), Roar/Whirlwind (which foe), Substitute, Explosion (hits all
  others), screens/hazards (per side — already correct), Synchronize/Intimidate (which foe(s)).

## Rollout recommendation
1. Land Phases 1–2 behind a `format` flag, validated with a **headless sim** (no UI) —
   singles must still pass.
2. Phase 3–4 (targeting + AI) — still headless-testable.
3. Phase 5 (UI) last, since it's the riskiest and most time-consuming.
4. Ship doubles as an opt-in format in Battle Setup; singles untouched.

**Effort**: large — realistically several focused sessions. The turn-engine generalization
(Phase 2) and the UI command/target flow (Phase 5) are the two big chunks; everything else is
incremental on top of the mechanics already built (natures, statuses, crits, abilities, etc.).
