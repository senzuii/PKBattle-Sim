import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User preferences, kept in their own store so toggling them never re-renders
// battle-state consumers. Persisted to AsyncStorage and loaded once at startup.

export type BattleSpeed = 'slow' | 'normal' | 'fast';

// Multiplier applied to the battle animation's pacing pauses. <1 = faster.
export const SPEED_FACTOR: Record<BattleSpeed, number> = {
  slow:   1.5,
  normal: 1.0,
  fast:   0.5,
};

const SOUND_KEY = '@pkbattler_sound_enabled';
const SPEED_KEY = '@pkbattler_battle_speed';

interface SettingsStore {
  soundEnabled: boolean;
  battleSpeed: BattleSpeed;
  loaded: boolean;

  setSoundEnabled: (v: boolean) => void;
  setBattleSpeed: (v: BattleSpeed) => void;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  soundEnabled: true,
  battleSpeed: 'normal',
  loaded: false,

  setSoundEnabled: (v) => {
    set({ soundEnabled: v });
    AsyncStorage.setItem(SOUND_KEY, v ? '1' : '0').catch(() => {});
  },

  setBattleSpeed: (v) => {
    set({ battleSpeed: v });
    AsyncStorage.setItem(SPEED_KEY, v).catch(() => {});
  },

  loadSettings: async () => {
    try {
      const [sound, speed] = await Promise.all([
        AsyncStorage.getItem(SOUND_KEY),
        AsyncStorage.getItem(SPEED_KEY),
      ]);
      set({
        soundEnabled: sound === null ? true : sound === '1',
        battleSpeed: speed === 'slow' || speed === 'fast' || speed === 'normal' ? speed : 'normal',
        loaded: true,
      });
    } catch {
      set({ loaded: true });
    }
  },
}));
