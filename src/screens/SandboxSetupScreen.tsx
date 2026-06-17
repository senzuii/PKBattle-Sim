import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { POKEMON } from '../data/pokemon';
import { MOVES } from '../data/moves';
import { PRESETS } from '../data/presets';
import { BattleDifficulty } from '../types/Pokemon';
import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { PrimaryButton } from '../components/PrimaryButton';

export const SandboxSetupScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    playerSelectedId,
    opponentChoice,
    opponentSelectedId,
    opponentPresetId,
    difficulty,
    selectPlayerPokemon,
    selectOpponentPokemon,
    setOpponentChoice,
    setOpponentPresetId,
    setDifficulty,
    startBattle,
    activeTeam,
    opponentTeam,
    loadPersistedData,
  } = useBattleStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadPersistedData();
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!loading && activeTeam.length > 0 && playerSelectedId === null) {
      selectPlayerPokemon('0');
    }
    if (!loading && opponentTeam.length > 0 && opponentSelectedId === null) {
      selectOpponentPokemon('0');
    }
  }, [loading, activeTeam, opponentTeam, playerSelectedId, opponentSelectedId]);

  const handleStartBattle = () => {
    startBattle();
    navigation.navigate('Battle');
  };

  const getMoveColor = (type: string) => {
    switch (type) {
      case 'Grass': return '#10B981';
      case 'Fire': return '#F97316';
      case 'Water': return '#3B82F6';
      case 'Poison': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const difficulties: { key: BattleDifficulty; label: string; desc: string }[] = [
    { key: 'easy', label: 'EASY', desc: 'Random moves' },
    { key: 'medium', label: 'MEDIUM', desc: 'KO finish + 50% damage' },
    { key: 'hard', label: 'HARD', desc: 'Strategic status & maximum damage' },
    { key: 'cheating', label: 'OMNISCIENT', desc: 'Sees player move (80% counterplay)' },
  ];

  if (loading) return null;

  return (
    <View style={styles.safeArea}>
      <ScreenHeader
        title="SANDBOX SETUP"
        badge="NO LIMITS"
        badgeColor={COLORS.purple}
        onBack={() => navigation.navigate('MainMenu')}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Player Setup */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>1. PLAYER POKÉMON</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TeamBuilder', { target: 'player' })}>
              <Text style={styles.editBtnText}>EDIT TEAM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pokemonRow}>
            {activeTeam.map((poke, idx) => {
              const isSelected = playerSelectedId === idx.toString();
              const basePoke = POKEMON[poke.speciesId];

              return (
                <TouchableOpacity
                  key={`player-${idx}`}
                  style={[
                    styles.pokemonCard,
                    isSelected && styles.playerSelectedCard,
                  ]}
                  onPress={() => selectPlayerPokemon(idx.toString())}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.pkmnName}>{basePoke.name}</Text>
                    <Text style={styles.levelText}>Lv.{poke.level}</Text>
                  </View>
                  <View style={styles.movesList}>
                    {poke.moves.map((moveId, mIdx) => {
                      const move = MOVES[moveId];
                      return (
                        <View key={mIdx} style={styles.moveMiniPill}>
                          <Text style={styles.moveMiniText} numberOfLines={1}>{move ? move.name : '-'}</Text>
                          {move && <View style={[styles.moveBadgeMini, { backgroundColor: getMoveColor(move.type) }]} />}
                        </View>
                      );
                    })}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Opponent Setup */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. OPPONENT CONFIGURATION</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity 
              style={[styles.toggleBtnOp, opponentChoice === 'custom' && styles.toggleBtnActiveOp]}
              onPress={() => setOpponentChoice('custom')}
            >
              <Text style={[styles.toggleText, opponentChoice === 'custom' && styles.toggleTextActiveOp]}>CUSTOM TEAM</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtnOp, opponentChoice === 'random' && styles.toggleBtnActiveOp]}
              onPress={() => setOpponentChoice('random')}
            >
              <Text style={[styles.toggleText, opponentChoice === 'random' && styles.toggleTextActiveOp]}>RANDOM RIVAL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtnOp, opponentChoice === 'preset' && styles.toggleBtnActiveOp]}
              onPress={() => {
                setOpponentChoice('preset');
                if (PRESETS.length > 0 && !opponentPresetId) setOpponentPresetId(PRESETS[0].id);
              }}
            >
              <Text style={[styles.toggleText, opponentChoice === 'preset' && styles.toggleTextActiveOp]}>PRESET</Text>
            </TouchableOpacity>
          </View>

          {opponentChoice === 'custom' && (
            <View>
              <TouchableOpacity 
                style={styles.editEnemyBtn} 
                onPress={() => navigation.navigate('TeamBuilder', { target: 'opponent' })}
              >
                <Text style={styles.editEnemyBtnText}>EDIT ENEMY TEAM</Text>
              </TouchableOpacity>
              <View style={styles.pokemonRow}>
                {opponentTeam.map((poke, idx) => {
                  const isSelected = opponentSelectedId === idx.toString();
                  const basePoke = POKEMON[poke.speciesId];

                  return (
                    <TouchableOpacity
                      key={`opp-${idx}`}
                      style={[
                        styles.pokemonCard,
                        isSelected && styles.opponentSelectedCard,
                      ]}
                      onPress={() => selectOpponentPokemon(idx.toString())}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.pkmnName}>{basePoke.name}</Text>
                        <Text style={styles.levelText}>Lv.{poke.level}</Text>
                      </View>
                      <View style={styles.movesList}>
                        {poke.moves.map((moveId, mIdx) => {
                          const move = MOVES[moveId];
                          return (
                            <View key={mIdx} style={styles.moveMiniPill}>
                              <Text style={styles.moveMiniText} numberOfLines={1}>{move ? move.name : '-'}</Text>
                              {move && <View style={[styles.moveBadgeMini, { backgroundColor: getMoveColor(move.type) }]} />}
                            </View>
                          );
                        })}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {opponentChoice === 'preset' && (
            <View style={styles.presetGrid}>
              {PRESETS.map(preset => (
                <TouchableOpacity
                  key={preset.id}
                  style={[styles.presetCard, opponentPresetId === preset.id && styles.presetCardActive]}
                  onPress={() => setOpponentPresetId(preset.id)}
                >
                  <Text style={styles.presetName}>{preset.name}</Text>
                  <Text style={styles.presetDetail}>Uses: {POKEMON[preset.pokemon[0].speciesId]?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 3. Difficulty */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>3. RIVAL AI DIFFICULTY</Text>
          <View style={styles.difficultyGrid}>
            {difficulties.map((diff) => {
              const isSelected = difficulty === diff.key;
              return (
                <TouchableOpacity
                  key={diff.key}
                  style={[
                    styles.diffRow,
                    styles.diffCell,
                    isSelected && styles.diffRowSelected,
                    diff.key === 'cheating' && isSelected && styles.diffCheatingSelected,
                  ]}
                  onPress={() => setDifficulty(diff.key)}
                >
                  <View style={styles.diffHeader}>
                    <Text style={[styles.diffLabel, isSelected && styles.diffLabelActive]}>{diff.label}</Text>
                    {diff.key === 'cheating' && (
                      <View style={styles.cheatBadge}><Text style={styles.cheatBadgeText}>CHEATING</Text></View>
                    )}
                  </View>
                  <Text style={styles.diffDesc}>{diff.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <PrimaryButton
          label="START SANDBOX BATTLE"
          color={COLORS.purple}
          onPress={handleStartBattle}
          block
          style={{ marginTop: 6 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 14, paddingBottom: 24, gap: 4 },
  section: { marginBottom: 14 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionHeader: { fontSize: 11, fontWeight: '600', color: '#64748B', letterSpacing: 1 },
  editBtnText: { color: '#00C3E3', fontSize: 10, fontWeight: '600' },
  editEnemyBtn: { backgroundColor: '#111827', borderColor: '#FF4554', borderWidth: 1, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginBottom: 10 },
  editEnemyBtnText: { color: '#FF4554', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  toggleBtnOp: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#111827', alignItems: 'center', borderWidth: 1.5, borderColor: '#1E293B' },
  toggleBtnActiveOp: { backgroundColor: 'rgba(255, 69, 84, 0.1)', borderWidth: 1.5, borderColor: '#FF4554' },
  toggleText: { color: '#64748B', fontWeight: '600', fontSize: 11 },
  toggleTextActiveOp: { color: '#FF4554' },
  pokemonRow: { flexDirection: 'row', gap: 8 },
  pokemonCard: { flex: 1, backgroundColor: '#111827', borderRadius: 10, padding: 10, borderWidth: 1.5, borderColor: '#1E293B' },
  playerSelectedCard: { borderColor: '#00C3E3', backgroundColor: 'rgba(0, 195, 227, 0.05)' },
  opponentSelectedCard: { borderColor: '#FF4554', backgroundColor: 'rgba(255, 69, 84, 0.05)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: '#1E293B', paddingBottom: 4 },
  pkmnName: { fontSize: 13, fontWeight: '600', color: '#F8FAFC' },
  levelText: { fontSize: 10, color: '#00C3E3', fontWeight: '500' },
  movesList: { gap: 3, marginVertical: 4 },
  moveMiniPill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#070D1A', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 },
  moveMiniText: { color: '#94A3B8', fontSize: 8, fontWeight: '500' },
  moveBadgeMini: { width: 6, height: 6, borderRadius: 3 },
  presetGrid: { gap: 8 },
  presetCard: { backgroundColor: '#111827', padding: 12, borderRadius: 8, borderWidth: 1.5, borderColor: '#1E293B' },
  presetCardActive: { borderColor: '#FF4554', backgroundColor: 'rgba(255, 69, 84, 0.05)' },
  presetName: { color: '#F8FAFC', fontSize: 14, fontWeight: '600' },
  presetDetail: { color: '#94A3B8', fontSize: 10, marginTop: 4 },
  difficultyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  diffCell: { flex: 1, minWidth: '22%' },
  diffRow: { backgroundColor: '#111827', borderRadius: 8, padding: 10, borderWidth: 1.5, borderColor: '#1E293B' },
  diffRowSelected: { borderColor: '#E2E8F0' },
  diffCheatingSelected: { borderColor: '#FF4554', backgroundColor: 'rgba(255, 69, 84, 0.03)' },
  diffHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  diffLabel: { fontSize: 12, fontWeight: '600', color: '#64748B', letterSpacing: 0.5 },
  diffLabelActive: { color: '#F8FAFC' },
  diffDesc: { fontSize: 10, color: '#94A3B8' },
  cheatBadge: { backgroundColor: '#FF4554', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3, marginLeft: 6 },
  cheatBadgeText: { color: '#FFFFFF', fontSize: 7, fontWeight: '700' },
  startButton: { backgroundColor: '#8B5CF6', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  startButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', letterSpacing: 1 },
});
