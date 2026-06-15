/**
 * Get multiplier for standard stats (Attack, Defense, Special Attack, Special Defense, Speed)
 * based on the current stat stage (-6 to +6).
 */
export function getStatMultiplier(stage: number): number {
  const clamped = Math.max(-6, Math.min(6, stage));
  if (clamped >= 0) {
    return (2 + clamped) / 2;
  } else {
    return 2 / (2 - clamped);
  }
}

/**
 * Get multiplier for Accuracy / Evasion based on stage (-6 to +6).
 */
export function getAccuracyMultiplier(stage: number): number {
  const clamped = Math.max(-6, Math.min(6, stage));
  if (clamped >= 0) {
    return (3 + clamped) / 3;
  } else {
    return 3 / (3 - clamped);
  }
}

/**
 * Modifies a stat stage, clamping it between -6 and +6.
 * Returns the new stage and whether a change actually occurred.
 */
export function modifyStatStage(
  currentStage: number,
  change: number
): { newStage: number; changed: boolean } {
  const newStage = Math.max(-6, Math.min(6, currentStage + change));
  return {
    newStage,
    changed: newStage !== currentStage,
  };
}
