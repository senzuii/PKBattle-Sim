import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEAM_STORAGE_KEY = '@pkbattler_saved_team';

/**
 * Hook to manage saving, loading, and deleting a saved team configuration
 * using AsyncStorage. Prepares team saving architecture.
 */
export function useSaveTeam() {
  const [team, setTeam] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async (): Promise<string[]> => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(TEAM_STORAGE_KEY);
      if (jsonValue != null) {
        const parsed = JSON.parse(jsonValue) as string[];
        setTeam(parsed);
        return parsed;
      }
      setTeam([]);
      return [];
    } catch (e) {
      console.error('Failed to load team from AsyncStorage:', e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const saveTeam = async (pokemonIds: string[]): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(pokemonIds);
      await AsyncStorage.setItem(TEAM_STORAGE_KEY, jsonValue);
      setTeam(pokemonIds);
      return true;
    } catch (e) {
      console.error('Failed to save team to AsyncStorage:', e);
      return false;
    }
  };

  const deleteTeam = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(TEAM_STORAGE_KEY);
      setTeam([]);
      return true;
    } catch (e) {
      console.error('Failed to delete team from AsyncStorage:', e);
      return false;
    }
  };

  return {
    team,
    loading,
    saveTeam,
    loadTeam,
    deleteTeam,
  };
}
