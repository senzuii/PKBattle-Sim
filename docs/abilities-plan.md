# Implement Gen 1 Pokemon Abilities

The Pokemon data for Generation 1 Pokemon includes 114 unique abilities (e.g., `Intimidate`, `Chlorophyll`, `Levitate`). Most of these are currently non-functional in the battle engine.

Implementing 114 distinct abilities in a single pass is extremely risky and error-prone. Instead, I propose we implement them in phases, starting with the most prominent and impactful abilities used by the most popular Gen 1 Pokemon, establishing the necessary engine hooks.

## User Review Required

Because of the massive scope of 114 abilities, do you approve of implementing the **Core 25 Impactful Abilities** below first? These cover a wide range of mechanics (weather, immunities, stat multipliers, on-hit effects) and will establish the engine hooks needed to easily add the rest later.

## Open Questions
- Do you want me to prioritize any specific abilities not in this list?
- Should we add visual popups for when an ability triggers (e.g. "[Pokemon]'s [Ability]!" popup), similar to the actual games? Right now, abilities are just silent multipliers or text logs.

## Proposed Changes

### Phase 1: Engine Hooks & Core 25 Abilities
We will modify `BattleManager.ts`, `DamageCalculator.ts`, and `MoveEffects.ts` to support the following abilities:

#### Switch-In Abilities (Triggers when entering battle)
- `Intimidate`: Lowers opponent's Attack by 1 stage.
- `Drought`: Summons Harsh Sunlight.
- `Drizzle`: Summons Rain.
- `Trace`: Copies the opponent's ability.

#### Speed Modifiers (Modifies turn order)
- `Chlorophyll`: 2x Speed in Sun.
- `Swift Swim`: 2x Speed in Rain.
- `Quick Feet`: 1.5x Speed if affected by a status condition.

#### Damage/Stat Multipliers (Damage Calculator)
- `Guts`: 1.5x Physical Attack if affected by a status condition.
- `Hustle`: 1.5x Physical Attack, but 0.8x Accuracy.
- `Technician`: 1.5x Base Power for moves with <= 60 Base Power.
- `Thick Fat`: Halves damage taken from Fire and Ice moves.
- `Marvel Scale`: 1.5x Defense if affected by a status condition.

#### Accuracy Modifiers (Damage Calculator)
- `Compound Eyes`: 1.3x Accuracy.
- `No Guard`: Moves used by or against this Pokemon never miss.

#### Immunities & Absorptions (Damage Interception)
- `Water Absorb`: Immune to Water; heals 25% max HP when hit by it.
- `Volt Absorb`: Immune to Electric; heals 25% max HP when hit by it.
- `Flash Fire`: Immune to Fire; boosts own Fire moves.
- `Limber`: Immune to Paralysis.
- `Immunity`: Immune to Poison.
- `Insomnia` / `Vital Spirit`: Immune to Sleep.
- `Own Tempo`: Immune to Confusion.

#### On-Hit / Contact Effects (After taking damage)
- `Static`: 30% chance to paralyze attacker on contact.
- `Poison Point`: 30% chance to poison attacker on contact.
- `Effect Spore`: 10% chance to sleep/poison/paralyze attacker on contact.

#### End of Turn Effects
- `Shed Skin`: 33% chance to cure its own status condition at the end of the turn.

---

### File Modifications

#### [MODIFY] `src/engine/damage/DamageCalculator.ts`
- Update `calculateDamage` to apply `Guts`, `Hustle`, `Technician`, `Thick Fat`, `Marvel Scale`.
- Update `checkMoveHit` to apply `Compound Eyes`, `Hustle`, `No Guard`.

#### [MODIFY] `src/engine/battle/BattleManager.ts`
- Update `executeTurn` speed calculations for `Chlorophyll`, `Swift Swim`, `Quick Feet`.
- Update `performMove` damage application to handle `Water Absorb`, `Volt Absorb`, `Flash Fire`.
- Add a new function `triggerOnHitAbilities` to handle `Static`, `Poison Point`, `Effect Spore`.
- Update `applyEndOfTurn` to handle `Shed Skin`.
- Add an initialization/switch-in hook for `Intimidate`, `Drought`, `Drizzle`, `Trace`.

#### [MODIFY] `src/engine/effects/MoveEffects.ts`
- Update status effect application to respect immunities (`Limber`, `Immunity`, `Insomnia`, `Own Tempo`).

## Verification Plan
### Manual Verification
- Equip Pokemon with `Intimidate` and ensure the opponent's Attack drops on turn 1.
- Equip a Pokemon with `Volt Absorb` and use `Thunderbolt` on it, ensuring it heals instead of taking damage.
- Equip a Pokemon with `Guts` and status it, verifying its damage output increases.
- Equip a Pokemon with `Static` and hit it with a physical move, verifying the paralysis chance triggers.
