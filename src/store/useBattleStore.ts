import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BattlePokemon, BattleDifficulty, CustomPokemon, Move } from '../types/Pokemon';
import { POKEMON } from '../data/pokemon';
import { MOVES } from '../data/moves';
import { PRESETS } from '../data/presets';
import { getPokemonPoolForGen } from '../data/genDex';
import { AbilityManager } from '../engine/abilities/AbilityManager';
import {
  generatePokemon, executeTurn, executeBattleTurn, resetVolatileState,
  createField, cloneField, applyEntryHazards, FieldState,
  TurnExecutionResult, calculateStats,
} from '../engine/battle/BattleManager';
import { selectAIMove } from '../engine/ai';
import { rollGender } from '../engine/battle/Gender';
import { rollNature } from '../data/natures';

const GENERATION_STORAGE_KEY   = '@pkbattler_selected_generation';
const ACTIVE_TEAM_STORAGE_KEY  = '@pkbattler_active_team';
const OPPONENT_TEAM_STORAGE_KEY = '@pkbattler_opponent_team';

const defaultTeam: CustomPokemon[] = [
  {
    speciesId: 'bulbasaur',
    level: 50,
    ability: 'Overgrow',
    moves: ['tackle', 'growl', 'vinewhip', 'leechseed'],
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 },
  }
];

export type BattleMode       = 'quick' | 'sandbox';
export type QuickPlayerChoice = 'loadout' | 'random';
export type OpponentChoice   = 'random' | 'preset' | 'custom';

// gameState:
//   'setup'   → pre-battle configuration
//   'battle'  → active 1v1 turn loop
//   'switch'  → waiting for player to choose the next Pokémon after a faint
//   'results' → battle over
export type GameState = 'setup' | 'battle' | 'switch' | 'results';

interface BattleStore {
  // ── Mode/config ──────────────────────────────────────────────────────────────
  battleMode: BattleMode;
  setBattleMode: (mode: BattleMode) => void;

  quickPlayerChoice: QuickPlayerChoice;
  setQuickPlayerChoice: (choice: QuickPlayerChoice) => void;
  opponentChoice: OpponentChoice;
  setOpponentChoice: (choice: OpponentChoice) => void;

  opponentPresetId: string | null;
  setOpponentPresetId: (id: string | null) => void;

  playerSelectedId: string | null;
  opponentSelectedId: string | null;

  // ── Battle runtime ────────────────────────────────────────────────────────────
  difficulty: BattleDifficulty;
  gameState: GameState;
  logs: string[];
  turnCount: number;
  playerDamageDealt: number;
  playerDamageTaken: number;
  winner: 'player' | 'opponent' | null;
  pendingResult: TurnExecutionResult | null;

  /** Battle-level state: weather, entry hazards, pending Future Sight / Wish */
  field: FieldState;

  // Active (on-field) Pokémon
  playerPokemon:   BattlePokemon | null;
  opponentPokemon: BattlePokemon | null;

  // Full battle rosters (all team members, updated in-place)
  playerBattleTeam:   BattlePokemon[];
  opponentBattleTeam: BattlePokemon[];

  // Current active indices into the battle rosters
  playerActiveIdx:   number;
  opponentActiveIdx: number;

  // ── Persistent storage ────────────────────────────────────────────────────────
  selectedGeneration: number | null;
  activeTeam:   CustomPokemon[];
  opponentTeam: CustomPokemon[];

  // ── Actions ───────────────────────────────────────────────────────────────────
  setDifficulty:        (difficulty: BattleDifficulty) => void;
  selectPlayerPokemon:  (id: string | null) => void;
  selectOpponentPokemon:(id: string | null) => void;

  setGeneration:   (gen: number | null) => Promise<void>;
  setActiveTeam:   (team: CustomPokemon[]) => Promise<void>;
  setOpponentTeam: (team: CustomPokemon[]) => Promise<void>;
  loadPersistedData: () => Promise<void>;

  startBattle:    () => void;
  prepareTurn:    (playerMoveId: string) => TurnExecutionResult | null;
  applyPendingTurn: () => void;
  commitTurn:     (playerMoveId: string) => void;

  /** Voluntary switch during battle (costs the turn - AI still attacks) */
  prepareSwitchTurn: (idx: number) => TurnExecutionResult | null;

  /** Forced switch after your Pokémon faints */
  sendOutPlayerPokemon: (idx: number) => void;

  resetBattle: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildBattlePokemon = (customPoke: CustomPokemon): BattlePokemon => {
  const base   = POKEMON[customPoke.speciesId];
  const nature = customPoke.nature ?? rollNature();
  const stats  = calculateStats(base.baseStats, customPoke.ivs, customPoke.evs, customPoke.level, nature);
  const moves = customPoke.moves
    .map((moveId) => MOVES[moveId])
    .filter((move): move is Move => !!move)
    .map(m => ({ ...m, currentPp: m.pp }));
  return {
    id: `${customPoke.speciesId}_${Math.random().toString(36).substr(2, 9)}`,
    baseId: customPoke.speciesId,
    name: base.name,
    types: base.types,
    gender: rollGender(customPoke.speciesId),
    nature,
    level: customPoke.level,
    ability: customPoke.ability || base.abilities[0] || 'None',
    ivs:  customPoke.ivs,
    evs:  customPoke.evs,
    stats,
    currentHp: stats.hp,
    maxHp:     stats.hp,
    statStages: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0 },
    isSeeded: false,
    moves,
    volatileStatuses: [],
  };
};

const hasAlivePokemon = (team: BattlePokemon[], excludeIdx?: number) =>
  team.some((p, i) => i !== excludeIdx && p.currentHp > 0);

// ─── Store ────────────────────────────────────────────────────────────────────
export const useBattleStore = create<BattleStore>((set, get) => ({
  battleMode:        'quick',
  quickPlayerChoice: 'loadout',
  opponentChoice:    'random',
  opponentPresetId:  null,

  setBattleMode:       (mode)   => set({ battleMode: mode }),
  setQuickPlayerChoice:(choice) => set({ quickPlayerChoice: choice }),
  setOpponentChoice:   (choice) => set({ opponentChoice: choice }),
  setOpponentPresetId: (id)     => set({ opponentPresetId: id }),

  playerSelectedId:   null,
  opponentSelectedId: null,
  difficulty: 'medium',

  gameState:        'setup',
  logs:             [],
  turnCount:        0,
  playerDamageDealt: 0,
  playerDamageTaken: 0,
  winner:           null,
  pendingResult:    null,
  field:            createField(),

  playerPokemon:      null,
  opponentPokemon:    null,
  playerBattleTeam:   [],
  opponentBattleTeam: [],
  playerActiveIdx:    0,
  opponentActiveIdx:  0,

  selectedGeneration: null,
  activeTeam:   defaultTeam,
  opponentTeam: defaultTeam,

  setDifficulty:        (difficulty) => set({ difficulty }),
  selectPlayerPokemon:  (id) => set({ playerSelectedId: id }),
  selectOpponentPokemon:(id) => set({ opponentSelectedId: id }),

  // ── Persistence ──────────────────────────────────────────────────────────────
  setGeneration: async (gen) => {
    try {
      if (gen === null) await AsyncStorage.removeItem(GENERATION_STORAGE_KEY);
      else await AsyncStorage.setItem(GENERATION_STORAGE_KEY, gen.toString());
      set({ selectedGeneration: gen });
    } catch (e) { console.error('Failed to save generation:', e); }
  },

  setActiveTeam: async (team) => {
    try {
      await AsyncStorage.setItem(ACTIVE_TEAM_STORAGE_KEY, JSON.stringify(team));
      set({ activeTeam: team });
    } catch (e) { console.error('Failed to save active team:', e); }
  },

  setOpponentTeam: async (team) => {
    try {
      await AsyncStorage.setItem(OPPONENT_TEAM_STORAGE_KEY, JSON.stringify(team));
      set({ opponentTeam: team });
    } catch (e) { console.error('Failed to save opponent team:', e); }
  },

  loadPersistedData: async () => {
    try {
      const genStr     = await AsyncStorage.getItem(GENERATION_STORAGE_KEY);
      const teamStr    = await AsyncStorage.getItem(ACTIVE_TEAM_STORAGE_KEY);
      const oppTeamStr = await AsyncStorage.getItem(OPPONENT_TEAM_STORAGE_KEY);

      const selectedGeneration = genStr     ? parseInt(genStr, 10)               : null;
      const activeTeam         = teamStr    ? (JSON.parse(teamStr) as CustomPokemon[]) : defaultTeam;
      const opponentTeam       = oppTeamStr ? (JSON.parse(oppTeamStr) as CustomPokemon[]) : defaultTeam;

      set({ selectedGeneration, activeTeam, opponentTeam });
    } catch (e) { console.error('Failed to load persisted data:', e); }
  },

  // ── Start Battle ─────────────────────────────────────────────────────────────
  startBattle: () => {
    const {
      battleMode, quickPlayerChoice, opponentChoice, opponentPresetId,
      playerSelectedId, opponentSelectedId,
      activeTeam, opponentTeam, selectedGeneration,
    } = get();

    // ── Build player battle team ──────────────────────────────────────────────
    let playerBattleTeam: BattlePokemon[] = [];

    if (battleMode === 'quick' && quickPlayerChoice === 'random') {
      // Single random Pokémon — only from valid gen pool
      const keys = getPokemonPoolForGen(selectedGeneration);
      const randomId = keys[Math.floor(Math.random() * keys.length)];
      playerBattleTeam = [generatePokemon(POKEMON[randomId], 50, selectedGeneration)];
    } else {
      // Full activeTeam
      playerBattleTeam = activeTeam.map(buildBattlePokemon);
    }

    if (playerBattleTeam.length === 0) return;
    const playerPokemon = playerBattleTeam[0];
    const level = playerPokemon.level;

    // ── Build opponent battle team ────────────────────────────────────────────
    let opponentBattleTeam: BattlePokemon[] = [];

    if (opponentChoice === 'preset' && opponentPresetId) {
      const preset = PRESETS.find(p => p.id === opponentPresetId);
      if (preset && preset.pokemon.length > 0) {
        opponentBattleTeam = preset.pokemon.map(buildBattlePokemon);
      }
    } else if (opponentChoice === 'custom') {
      opponentBattleTeam = opponentTeam.map(buildBattlePokemon);
    }

    // Fallback: random opponent team matching player team size — only from valid gen pool
    if (opponentBattleTeam.length === 0) {
      const keys = getPokemonPoolForGen(selectedGeneration);
      for (let i = 0; i < playerBattleTeam.length; i++) {
        const randomId = keys[Math.floor(Math.random() * keys.length)];
        const matchLevel = playerBattleTeam[i].level || 50;
        opponentBattleTeam.push(generatePokemon(POKEMON[randomId], matchLevel, selectedGeneration));
      }
    }

    const opponentPokemon = opponentBattleTeam[0];

    const startLogs = [
      'Battle started!',
      `You sent out ${playerPokemon.name}!`,
      `Opponent sent out ${opponentPokemon.name}!`,
    ];

    const startField = createField();
    AbilityManager.onSwitchIn(playerPokemon, opponentPokemon, startLogs, startField);
    AbilityManager.onSwitchIn(opponentPokemon, playerPokemon, startLogs, startField);

    startLogs.push('---------------------------------------');
    startLogs.push('--- TURN 1 ---');

    set({
      playerBattleTeam,
      opponentBattleTeam,
      playerActiveIdx: 0,
      opponentActiveIdx: 0,
      playerPokemon,
      opponentPokemon,
      gameState: 'battle',
      turnCount: 1,
      logs: startLogs,
      playerDamageDealt: 0,
      playerDamageTaken: 0,
      winner: null,
      pendingResult: null,
      field: startField,
    });
  },

  // ── Prepare Turn ──────────────────────────────────────────────────────────────
  prepareTurn: (playerMoveId) => {
    const { playerPokemon, opponentPokemon, difficulty, field } = get();
    if (!playerPokemon || !opponentPokemon) return null;

    let playerMove = playerPokemon.moves.find((m) => m.id === playerMoveId);
    if (playerPokemon.lockedMove) {
      playerMove = playerPokemon.moves.find((m) => m.id === playerPokemon.lockedMove!.moveId) || playerMove;
    }
    if (!playerMove) return null;

    let opponentMove = selectAIMove(difficulty, opponentPokemon, playerPokemon, playerMove);
    if (opponentPokemon.lockedMove) {
      opponentMove = opponentPokemon.moves.find((m) => m.id === opponentPokemon.lockedMove!.moveId) || opponentMove;
    }

    const result = executeTurn(playerPokemon, opponentPokemon, playerMove, opponentMove, field);

    set({ pendingResult: result });
    return result;
  },

  // ── Apply Pending Turn ────────────────────────────────────────────────────────
  applyPendingTurn: () => {
    const {
      pendingResult, logs, turnCount,
      playerDamageDealt, playerDamageTaken,
      playerBattleTeam, opponentBattleTeam,
      playerActiveIdx, opponentActiveIdx,
    } = get();
    if (!pendingResult) return;

    // --- TERMINAL LOGGING FOR DEBUGGING ---
    console.log(`\n=== TURN ${turnCount + 1} LOG ===`);
    console.log(pendingResult.logs.join('\n'));
    console.log(`======================\n`);
    // --------------------------------------

    const newLogs = [...logs, ...pendingResult.logs];

    // Update the rosters with in-battle HP changes
    const newPlayerTeam   = playerBattleTeam.map((p, i) =>
      i === playerActiveIdx ? pendingResult.player : p
    );
    const newOpponentTeam = opponentBattleTeam.map((p, i) =>
      i === opponentActiveIdx ? pendingResult.opponent : p
    );

    const playerFainted   = pendingResult.player.currentHp <= 0;
    const opponentFainted = pendingResult.opponent.currentHp <= 0;

    const playerHasSurvivor   = hasAlivePokemon(newPlayerTeam,   playerActiveIdx);
    const opponentHasSurvivor = hasAlivePokemon(newOpponentTeam, opponentActiveIdx);

    let nextWinner: 'player' | 'opponent' | null = null;
    let nextState: GameState = 'battle';

    // Field state after the turn (weather ticked, hazards laid, etc.)
    const nextField = pendingResult.field;

    // Track what the opponent field should be after this turn resolves.
    // Default: the result of the turn. Gets overridden below when the opponent switches.
    let finalOpponentPokemon = pendingResult.opponent;
    let finalOpponentActiveIdx = opponentActiveIdx;

    // Sends out the AI's next surviving Pokémon, applying entry hazards on the
    // way in. Hazards can KO the incoming Pokémon — keep sending until one
    // survives or the team is out.
    const sendNextOpponent = (): { pokemon: BattlePokemon; idx: number } | null => {
      for (let i = 0; i < newOpponentTeam.length; i++) {
        if (i === opponentActiveIdx || newOpponentTeam[i].currentHp <= 0) continue;
        const incoming = { ...newOpponentTeam[i] };
        newLogs.push(`Opponent sent out ${incoming.name}!`);
        AbilityManager.onSwitchIn(incoming, pendingResult.player, newLogs, nextField);
        applyEntryHazards(incoming, nextField.opponent.hazards, newLogs);
        newOpponentTeam[i] = incoming;
        if (incoming.currentHp > 0) return { pokemon: incoming, idx: i };
        newLogs.push(`${incoming.name} fainted!`);
      }
      return null;
    };

    if (playerFainted && opponentFainted) {
      if (!playerHasSurvivor && !opponentHasSurvivor) {
        nextWinner = 'opponent';
        nextState  = 'results';
        newLogs.push("Both Pokémon fainted! It's a draw — opponent wins on tie!");
      } else if (!playerHasSurvivor) {
        nextWinner = 'opponent';
        nextState  = 'results';
        newLogs.push('All your Pokémon fainted! You lost!');
      } else if (!opponentHasSurvivor) {
        nextWinner = 'player';
        nextState  = 'results';
        newLogs.push(`${pendingResult.opponent.name} fainted! You win!`);
      } else {
        // Both have survivors — AI sends next, player must choose
        const next = sendNextOpponent();
        if (next) {
          finalOpponentPokemon = next.pokemon;
          finalOpponentActiveIdx = next.idx;
          nextState = 'switch';
        } else {
          // Entry hazards finished off the rest of the AI's team
          nextWinner = 'player';
          nextState  = 'results';
          newLogs.push('All opposing Pokémon fainted! You win!');
        }
      }
    } else if (opponentFainted) {
      const next = sendNextOpponent();
      if (next) {
        finalOpponentPokemon = next.pokemon;
        finalOpponentActiveIdx = next.idx;
      } else {
        nextWinner = 'player';
        nextState  = 'results';
        newLogs.push('All opposing Pokémon fainted! You win!');
      }
    } else if (playerFainted) {
      if (playerHasSurvivor) {
        nextState = 'switch';
      } else {
        nextWinner = 'opponent';
        nextState  = 'results';
        newLogs.push('All your Pokémon fainted! You lost!');
      }
    } else {
      // Normal end of turn
      newLogs.push('---------------------------------------');
      newLogs.push(`--- TURN ${turnCount + 1} ---`);
    }

    // Roar / Whirlwind — force the hit side's active Pokémon to switch out
    if (!nextWinner && nextState === 'battle' && pendingResult.forceSwitch) {
      if (pendingResult.forceSwitch === 'opponent') {
        const next = sendNextOpponent();
        if (next) {
          finalOpponentPokemon = next.pokemon;
          finalOpponentActiveIdx = next.idx;
        } else {
          newLogs.push('But it failed!');
        }
      } else if (pendingResult.forceSwitch === 'player') {
        if (hasAlivePokemon(newPlayerTeam, playerActiveIdx)) {
          newPlayerTeam[playerActiveIdx] = resetVolatileState(newPlayerTeam[playerActiveIdx]);
          nextState = 'switch';
        } else {
          newLogs.push('But it failed!');
        }
      }
    }

    set({
      playerBattleTeam: newPlayerTeam,
      opponentBattleTeam: newOpponentTeam,
      playerPokemon:    pendingResult.player,
      opponentPokemon:  finalOpponentPokemon,
      playerActiveIdx:  playerActiveIdx,
      opponentActiveIdx: finalOpponentActiveIdx,
      field: nextField,
      logs: newLogs,
      turnCount: nextWinner ? turnCount : turnCount + 1,
      playerDamageDealt: playerDamageDealt + (pendingResult.damageDealt || 0),
      playerDamageTaken: playerDamageTaken + (pendingResult.damageTaken || 0),
      winner: nextWinner,
      gameState: nextState,
      pendingResult: null,
    });
  },

  // ── Voluntary Switch (costs turn — opponent attacks) ──────────────────────────
  prepareSwitchTurn: (idx) => {
    const {
      playerBattleTeam, playerActiveIdx,
      playerPokemon, opponentPokemon, difficulty, field,
    } = get();

    if (idx === playerActiveIdx) return null;
    const incoming = playerBattleTeam[idx];
    if (!incoming || incoming.currentHp <= 0) return null;
    if (!playerPokemon || !opponentPokemon) return null;

    // Opponent gets a free action against the incoming Pokémon
    let opponentMove = selectAIMove(difficulty, opponentPokemon, incoming, incoming.moves[0]);
    if (opponentPokemon.lockedMove) {
      opponentMove = opponentPokemon.moves.find((m) => m.id === opponentPokemon.lockedMove!.moveId) || opponentMove;
    }

    // The engine resolves the switch (it has +7 priority, so it always happens
    // first), entry hazards, the opponent's attack, and end-of-turn effects.
    const result = executeBattleTurn(
      playerPokemon, opponentPokemon,
      { type: 'switch', incoming },
      { type: 'move', move: opponentMove },
      field,
    );

    // Stat stages, volatiles, substitute, etc. don't persist through a switch
    const outgoing = resetVolatileState(playerPokemon);
    const newPlayerTeam = playerBattleTeam.map((p, i) => (i === playerActiveIdx ? outgoing : p));

    set({ playerBattleTeam: newPlayerTeam, pendingResult: result, playerActiveIdx: idx });
    return result;
  },

  // ── Forced Send-Out (after faint, no opponent attack) ─────────────────────────
  sendOutPlayerPokemon: (idx) => {
    const { playerBattleTeam, opponentPokemon, field, logs, turnCount } = get();
    const teamPokemon = playerBattleTeam[idx];
    if (!teamPokemon || teamPokemon.currentHp <= 0) return;

    const newLogs = [...logs, `Go! ${teamPokemon.name}!`];

    // Entry hazards greet the incoming Pokémon — they can KO it.
    // Clone the field: Toxic Spikes absorption mutates hazard state.
    const newField = cloneField(field);
    const newPokemon = { ...teamPokemon };
    if (opponentPokemon) AbilityManager.onSwitchIn(newPokemon, opponentPokemon, newLogs, newField);
    applyEntryHazards(newPokemon, newField.player.hazards, newLogs);
    const newPlayerTeam = playerBattleTeam.map((p, i) => (i === idx ? newPokemon : p));

    if (newPokemon.currentHp <= 0) {
      newLogs.push(`${newPokemon.name} fainted!`);
      if (hasAlivePokemon(newPlayerTeam, idx)) {
        // Stay in the switch screen so the player picks another Pokémon
        set({ playerBattleTeam: newPlayerTeam, field: newField, logs: newLogs, gameState: 'switch' });
      } else {
        newLogs.push('All your Pokémon fainted! You lost!');
        set({
          playerBattleTeam: newPlayerTeam,
          playerPokemon: newPokemon,
          playerActiveIdx: idx,
          field: newField,
          logs: newLogs,
          winner: 'opponent',
          gameState: 'results',
        });
      }
      return;
    }

    newLogs.push('---------------------------------------');
    newLogs.push(`--- TURN ${turnCount + 1} ---`);

    set({
      playerBattleTeam: newPlayerTeam,
      playerPokemon:   newPokemon,
      playerActiveIdx: idx,
      field: newField,
      logs: newLogs,
      turnCount: turnCount + 1,
      gameState: 'battle',
    });
  },

  // ── Commit Turn (convenience) ─────────────────────────────────────────────────
  commitTurn: (playerMoveId) => {
    const result = get().prepareTurn(playerMoveId);
    if (result) get().applyPendingTurn();
  },

  // ── Reset ─────────────────────────────────────────────────────────────────────
  resetBattle: () => {
    set({
      playerPokemon:      null,
      opponentPokemon:    null,
      playerBattleTeam:   [],
      opponentBattleTeam: [],
      playerActiveIdx:    0,
      opponentActiveIdx:  0,
      logs:               [],
      turnCount:          0,
      playerDamageDealt:  0,
      playerDamageTaken:  0,
      winner:             null,
      gameState:          'setup',
      pendingResult:      null,
      field:              createField(),
    });
  },
}));
