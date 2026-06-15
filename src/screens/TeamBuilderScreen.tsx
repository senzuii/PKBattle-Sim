import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';
import { CustomPokemon, Stats } from '../types/Pokemon';
import { POKEMON } from '../data/pokemon';
import { MOVES } from '../data/moves';
import { validatePokemonLegality } from '../engine/learnset/LearnsetChecker';
import { getPokemonPoolForGen } from '../data/genDex';

const SAVED_LOADOUTS_KEY = '@pkbattler_saved_loadouts';
const SAVED_OPPONENT_LOADOUTS_KEY = '@pkbattler_saved_opponent_loadouts';

interface TeamLoadout {
  id: string;
  name: string;
  pokemon: CustomPokemon[];
}

const defaultStats: Stats = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const defaultEvs: Stats = { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 };

const defaultTeam: CustomPokemon[] = [
  {
    speciesId: 'bulbasaur',
    level: 50,
    ability: 'Overgrow',
    moves: ['tackle', 'growl', 'vinewhip', 'leechseed'],
    ivs: defaultStats,
    evs: defaultEvs,
  },
  {
    speciesId: 'charmander',
    level: 50,
    ability: 'Blaze',
    moves: ['scratch', 'growl', 'ember', 'smokescreen'],
    ivs: defaultStats,
    evs: defaultEvs,
  },
  {
    speciesId: 'squirtle',
    level: 50,
    ability: 'Torrent',
    moves: ['tackle', 'tailwhip', 'watergun', 'withdraw'],
    ivs: defaultStats,
    evs: defaultEvs,
  },
];

export const TeamBuilderScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'TeamBuilder'>>();
  const target = route.params?.target ?? 'player';
  const isOpponent = target === 'opponent';
  const storageKey = isOpponent ? SAVED_OPPONENT_LOADOUTS_KEY : SAVED_LOADOUTS_KEY;

  const { selectedGeneration, setActiveTeam, setOpponentTeam, loadPersistedData } = useBattleStore();

  const [loadouts, setLoadouts] = useState<TeamLoadout[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [teamName, setTeamName] = useState<string>('');
  const [editedTeam, setEditedTeam] = useState<CustomPokemon[]>([]);

  // Gen-filtered species pool so the species picker only shows valid Pokémon.
  const genFilteredSpeciesIds = useMemo(
    () => getPokemonPoolForGen(selectedGeneration),
    [selectedGeneration]
  );
  
  // Move selection modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSlotIdx, setActiveSlotIdx] = useState<number | null>(null);
  const [activeMoveIdx, setActiveMoveIdx] = useState<number | null>(null);

  // Initialize
  useEffect(() => {
    const init = async () => {
      await loadPersistedData();
      await loadLoadouts();
    };
    init();
  }, []);

  const loadLoadouts = async () => {
    try {
      const dataStr = await AsyncStorage.getItem(storageKey);
      let loaded: TeamLoadout[] = [];
      if (dataStr) {
        loaded = JSON.parse(dataStr) as TeamLoadout[];
      }

      if (loaded.length === 0) {
        const initialLoadout: TeamLoadout = {
          id: `loadout_${Date.now()}`,
          name: isOpponent ? 'Custom Enemy Team' : 'Classic Starters',
          pokemon: JSON.parse(JSON.stringify(defaultTeam)) as CustomPokemon[],
        };
        loaded = [initialLoadout];
        await AsyncStorage.setItem(storageKey, JSON.stringify(loaded));
      }

      setLoadouts(loaded);
      setCurrentIdx(0);
      setTeamName(loaded[0].name);
      setEditedTeam(JSON.parse(JSON.stringify(loaded[0].pokemon)) as CustomPokemon[]);
      
      if (isOpponent) await setOpponentTeam(loaded[0].pokemon);
      else await setActiveTeam(loaded[0].pokemon);
    } catch (e) {
      console.error('Failed to load team builder loadouts:', e);
    }
  };

  const handleSelectLoadout = (idx: number) => {
    setCurrentIdx(idx);
    setTeamName(loadouts[idx].name);
    setEditedTeam(JSON.parse(JSON.stringify(loadouts[idx].pokemon)) as CustomPokemon[]);
  };

  const handleSaveLoadout = async () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name.');
      return;
    }

    try {
      const updated = [...loadouts];
      updated[currentIdx] = {
        ...updated[currentIdx],
        name: teamName,
        pokemon: editedTeam,
      };

      setLoadouts(updated);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
      if (isOpponent) await setOpponentTeam(editedTeam);
      else await setActiveTeam(editedTeam);
      Alert.alert('Success', 'Team configuration saved and active!');
    } catch (e) {
      console.error('Failed to save loadout:', e);
    }
  };

  const handleCreateLoadout = async () => {
    try {
      const newLoadout: TeamLoadout = {
        id: `loadout_${Date.now()}`,
        name: `New Team ${loadouts.length + 1}`,
        pokemon: JSON.parse(JSON.stringify(defaultTeam)) as CustomPokemon[],
      };

      const updated = [...loadouts, newLoadout];
      setLoadouts(updated);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
      
      const newIdx = updated.length - 1;
      setCurrentIdx(newIdx);
      setTeamName(newLoadout.name);
      setEditedTeam(newLoadout.pokemon);
    } catch (e) {
      console.error('Failed to create loadout:', e);
    }
  };

  const handleDeleteLoadout = async () => {
    if (loadouts.length <= 1) {
      Alert.alert('Error', 'You must have at least one team configuration.');
      return;
    }

    Alert.alert(
      'Delete Team',
      `Are you sure you want to delete "${loadouts[currentIdx].name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = loadouts.filter((_, idx) => idx !== currentIdx);
              setLoadouts(updated);
              await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
              
              const nextIdx = Math.max(0, currentIdx - 1);
              setCurrentIdx(nextIdx);
              setTeamName(updated[nextIdx].name);
              setEditedTeam(JSON.parse(JSON.stringify(updated[nextIdx].pokemon)) as CustomPokemon[]);
              if (isOpponent) await setOpponentTeam(updated[nextIdx].pokemon);
              else await setActiveTeam(updated[nextIdx].pokemon);
            } catch (e) {
              console.error('Failed to delete loadout:', e);
            }
          },
        },
      ]
    );
  };

  // Modifying current team values
  const handleChangeSpecies = (slotIdx: number, speciesId: string) => {
    const updated = [...editedTeam];
    const newBase = POKEMON[speciesId];
    updated[slotIdx] = {
      ...updated[slotIdx],
      speciesId,
      ability: newBase.abilities[0] || 'None',
    };
    setEditedTeam(updated);
  };

  const handleChangeAbility = (slotIdx: number, ability: string) => {
    const updated = [...editedTeam];
    updated[slotIdx] = {
      ...updated[slotIdx],
      ability,
    };
    setEditedTeam(updated);
  };

  const handleChangeLevel = (slotIdx: number, delta: number) => {
    const updated = [...editedTeam];
    const newLvl = Math.max(1, Math.min(100, updated[slotIdx].level + delta));
    updated[slotIdx] = {
      ...updated[slotIdx],
      level: newLvl,
    };
    setEditedTeam(updated);
  };

  const handleOpenMoveModal = (slotIdx: number, moveIdx: number) => {
    setActiveSlotIdx(slotIdx);
    setActiveMoveIdx(moveIdx);
    setModalVisible(true);
  };

  const handleSelectMove = (moveId: string) => {
    if (activeSlotIdx === null || activeMoveIdx === null) return;
    const updated = [...editedTeam];
    
    // Check duplicate moves
    if (updated[activeSlotIdx].moves.includes(moveId) && updated[activeSlotIdx].moves[activeMoveIdx] !== moveId) {
      Alert.alert('Duplicate Move', 'A Pokémon cannot learn the same move twice.');
      return;
    }

    updated[activeSlotIdx].moves[activeMoveIdx] = moveId;
    setEditedTeam(updated);
    setModalVisible(false);
    setActiveSlotIdx(null);
    setActiveMoveIdx(null);
  };

  const getFormatLabel = () => {
    if (selectedGeneration === null) return 'All Pokémon Games';
    return `Generation ${selectedGeneration}`;
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

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← BACK</Text>
          </TouchableOpacity>
          <Text style={styles.formatLabel}>Format: {getFormatLabel()}</Text>
        </View>

        <View style={styles.headerCenter}>
          <TextInput
            style={styles.teamNameInput}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Team Name"
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.headerRight}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.loadoutsList}>
            {loadouts.map((loadout, idx) => (
              <TouchableOpacity
                key={loadout.id}
                style={[styles.loadoutTab, currentIdx === idx && styles.loadoutTabActive]}
                onPress={() => handleSelectLoadout(idx)}
              >
                <Text style={[styles.loadoutTabText, currentIdx === idx && styles.loadoutTabTextActive]}>
                  {loadout.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveLoadout}>
              <Text style={styles.saveBtnText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newBtn} onPress={handleCreateLoadout}>
              <Text style={styles.newBtnText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteLoadout}>
              <Text style={styles.deleteBtnText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cardsRow} horizontal={editedTeam.length > 2} showsHorizontalScrollIndicator={true}>
        {editedTeam.map((poke, slotIdx) => {
          const baseData = POKEMON[poke.speciesId];
          const validation = validatePokemonLegality(poke.speciesId, poke.moves, selectedGeneration);
          const isLegal = validation.isLegal;

          return (
            <View key={slotIdx} style={[styles.pokemonCard, !isLegal && styles.pokemonCardIllegal]}>
              <View style={styles.cardHeader}>
                <Text style={styles.slotLabel}>SLOT {slotIdx + 1}</Text>
                <View style={[styles.legalityBadge, { backgroundColor: isLegal ? '#059669' : '#DC2626' }]}>
                  <Text style={styles.legalityBadgeText}>{isLegal ? 'LEGAL' : 'ILLEGAL'}</Text>
                </View>
              </View>

              {/* Species Select */}
              <View style={styles.speciesContainer}>
                <Text style={styles.fieldLabel}>SPECIES</Text>
                <View style={styles.speciesSelectorRow}>
                 {genFilteredSpeciesIds.map((speciesId) => {
                    const isSpeciesSelected = poke.speciesId === speciesId;
                    return (
                      <TouchableOpacity
                        key={speciesId}
                        style={[
                          styles.speciesOption,
                          isSpeciesSelected && styles.speciesOptionActive,
                        ]}
                        onPress={() => handleChangeSpecies(slotIdx, speciesId)}
                      >
                        <Text style={[styles.speciesOptionText, isSpeciesSelected && styles.speciesOptionTextActive]}>
                          {POKEMON[speciesId].name.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Level Control */}
              <View style={styles.levelContainer}>
                <Text style={styles.fieldLabel}>LEVEL</Text>
                <View style={styles.levelRow}>
                  <TouchableOpacity style={styles.levelBtn} onPress={() => handleChangeLevel(slotIdx, -5)}>
                    <Text style={styles.levelBtnText}>-5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.levelBtn} onPress={() => handleChangeLevel(slotIdx, -1)}>
                    <Text style={styles.levelBtnText}>-1</Text>
                  </TouchableOpacity>
                  <View style={styles.levelValueWrapper}>
                    <Text style={styles.levelValue}>{poke.level}</Text>
                  </View>
                  <TouchableOpacity style={styles.levelBtn} onPress={() => handleChangeLevel(slotIdx, 1)}>
                    <Text style={styles.levelBtnText}>+1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.levelBtn} onPress={() => handleChangeLevel(slotIdx, 5)}>
                    <Text style={styles.levelBtnText}>+5</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Ability Select */}
              <View style={styles.abilityContainer}>
                <Text style={styles.fieldLabel}>ABILITY</Text>
                <View style={styles.speciesSelectorRow}>
                  {baseData.abilities.length > 0 ? baseData.abilities.map((ability) => {
                    const isAbilitySelected = poke.ability === ability;
                    return (
                      <TouchableOpacity
                        key={ability}
                        style={[
                          styles.speciesOption,
                          isAbilitySelected && styles.speciesOptionActive,
                        ]}
                        onPress={() => handleChangeAbility(slotIdx, ability)}
                      >
                        <Text style={[styles.speciesOptionText, isAbilitySelected && styles.speciesOptionTextActive]}>
                          {ability.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }) : (
                    <View style={styles.speciesOption}>
                      <Text style={styles.speciesOptionText}>NONE</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Moves Selection */}
              <View style={styles.movesContainer}>
                <Text style={styles.fieldLabel}>MOVES (TAP TO CHANGE)</Text>
                {poke.moves.map((moveId, moveIdx) => {
                  const move = MOVES[moveId];
                  const typeColor = move ? getMoveColor(move.type) : '#475569';
                  
                  return (
                    <TouchableOpacity
                      key={moveIdx}
                      style={styles.moveSlot}
                      onPress={() => handleOpenMoveModal(slotIdx, moveIdx)}
                    >
                      <Text style={styles.moveNameText}>{move ? move.name : 'Empty Slot'}</Text>
                      {move && (
                        <View style={[styles.moveBadge, { backgroundColor: typeColor }]}>
                          <Text style={styles.moveBadgeText}>{move.type.toUpperCase()}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Legality issues list */}
              {!isLegal && (
                <ScrollView style={styles.issuesList} nestedScrollEnabled={true}>
                  {validation.reasons.map((reason, rIdx) => (
                    <Text key={rIdx} style={styles.issueText}>
                      ⚠ {reason}
                    </Text>
                  ))}
                </ScrollView>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Move Selection Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SELECT A MOVE</Text>
            <ScrollView contentContainerStyle={styles.modalMovesGrid}>
              {Object.keys(MOVES).map((moveId) => {
                const move = MOVES[moveId];
                const typeColor = getMoveColor(move.type);
                
                return (
                  <TouchableOpacity
                    key={moveId}
                    style={styles.modalMoveItem}
                    onPress={() => handleSelectMove(moveId)}
                  >
                    <View style={styles.modalMoveHeader}>
                      <Text style={styles.modalMoveName}>{move.name}</Text>
                      <View style={[styles.moveBadge, { backgroundColor: typeColor }]}>
                        <Text style={styles.moveBadgeText}>{move.type.toUpperCase()}</Text>
                      </View>
                    </View>
                    <Text style={styles.modalMoveDesc} numberOfLines={2}>
                      {move.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1.5,
    borderBottomColor: '#334155',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },
  formatLabel: {
    color: '#00C3E3',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 1,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 15,
  },
  teamNameInput: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '50%',
  },
  loadoutsList: {
    gap: 4,
  },
  loadoutTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#334155',
  },
  loadoutTabActive: {
    backgroundColor: '#00C3E3',
  },
  loadoutTabText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
  },
  loadoutTabTextActive: {
    color: '#0F172A',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  saveBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  newBtn: {
    backgroundColor: '#3B82F6',
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    padding: 15,
    gap: 12,
    alignItems: 'flex-start',
  },
  pokemonCard: {
    width: 290,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  pokemonCardIllegal: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.03)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 6,
    marginBottom: 8,
  },
  slotLabel: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 12,
  },
  legalityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  legalityBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  speciesContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  speciesSelectorRow: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 6,
    padding: 2,
    borderWidth: 1,
    borderColor: '#334155',
  },
  speciesOption: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 4,
  },
  speciesOptionActive: {
    backgroundColor: '#334155',
  },
  speciesOptionText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
  },
  speciesOptionTextActive: {
    color: '#F8FAFC',
  },
  levelContainer: {
    marginBottom: 10,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    padding: 2,
  },
  levelBtn: {
    backgroundColor: '#334155',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  levelBtnText: {
    color: '#F8FAFC',
    fontSize: 9,
    fontWeight: '800',
  },
  levelValueWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  levelValue: {
    color: '#00C3E3',
    fontWeight: '900',
    fontSize: 13,
  },
  abilityContainer: {
    marginBottom: 10,
  },
  movesContainer: {
    marginBottom: 8,
  },
  moveSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 2.5,
  },
  moveNameText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  moveBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  moveBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  issuesList: {
    maxHeight: 70,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 6,
    padding: 5,
    marginTop: 5,
  },
  issueText: {
    color: '#F87171',
    fontSize: 9,
    fontWeight: '600',
    marginVertical: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    maxHeight: '80%',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#334155',
    padding: 18,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMovesGrid: {
    gap: 8,
  },
  modalMoveItem: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  modalMoveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  modalMoveName: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 13,
  },
  modalMoveDesc: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '500',
  },
  closeModalBtn: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  closeModalBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
});
