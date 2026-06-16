import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { POKEMON } from '../data/pokemon';
import { MOVES } from '../data/moves';
import { PRESETS } from '../data/presets';
import { BattleDifficulty, CustomPokemon } from '../types/Pokemon';
import { RootStackParamList } from '../types/Navigation';
import { FrontSprites } from '../assets/Sprites';
import { isMoveLegalForPokemon } from '../engine/learnset/LearnsetChecker';
import { getPokemonPoolForGen, isPokemonInGen } from '../data/genDex';
import { NATURE_LIST, natureSummary } from '../data/natures';

const TYPE_COLORS: Record<string, string> = {
  Grass: '#4CAF50', Fire: '#FF5722', Water: '#2196F3',
  Poison: '#9C27B0', Normal: '#9E9E9E', Electric: '#FFC107',
  Psychic: '#E91E63', Ice: '#00BCD4', Dragon: '#673AB7',
  Fighting: '#795548', Flying: '#42A5F5', Bug: '#8BC34A',
  Rock: '#8D6E63', Ground: '#FF8F00', Ghost: '#7E57C2',
  Dark: '#37474F', Steel: '#607D8B', Fairy: '#F06292',
};

const MAX_TEAM_SIZE = 6;
const defaultIvs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const defaultEvs = { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 };

const getRandomMovesForPokemon = (speciesId: string, gen: number | null): string[] => {
  const allLegal = Object.keys(MOVES).filter(mId => isMoveLegalForPokemon(speciesId, mId, gen));
  if (allLegal.length === 0) return [];
  if (allLegal.length <= 4) return [...allLegal].sort(() => Math.random() - 0.5);

  const poke = POKEMON[speciesId];
  const pokeTypes = poke ? poke.types : [];
  const stabPool = allLegal.filter(mId => { const m = MOVES[mId]; return m && m.category !== 'Status' && pokeTypes.includes(m.type); });
  const statPool = allLegal.filter(mId => { const m = MOVES[mId]; return m && m.category === 'Status'; });

  const selectedMoves: string[] = [];
  const remainingPool = new Set(allLegal);

  if (stabPool.length > 0) {
    const pick = stabPool[Math.floor(Math.random() * stabPool.length)];
    selectedMoves.push(pick); remainingPool.delete(pick);
  } else {
    const arr = Array.from(remainingPool);
    const pick = arr[Math.floor(Math.random() * arr.length)];
    selectedMoves.push(pick); remainingPool.delete(pick);
  }

  const remainingStats = statPool.filter(mId => remainingPool.has(mId));
  if (remainingStats.length > 0) {
    const pick = remainingStats[Math.floor(Math.random() * remainingStats.length)];
    selectedMoves.push(pick); remainingPool.delete(pick);
  } else if (remainingPool.size > 0) {
    const arr = Array.from(remainingPool);
    const pick = arr[Math.floor(Math.random() * arr.length)];
    selectedMoves.push(pick); remainingPool.delete(pick);
  }

  for (let i = 0; i < 2; i++) {
    if (remainingPool.size > 0) {
      const arr = Array.from(remainingPool);
      const pick = arr[Math.floor(Math.random() * arr.length)];
      selectedMoves.push(pick); remainingPool.delete(pick);
    }
  }
  return selectedMoves;
};

// ─── TeamSlot ─────────────────────────────────────────────────────────────────
const TeamSlot: React.FC<{
  slotIdx: number;
  pokemon: CustomPokemon | null;
  onEdit: () => void;
  onClear: () => void;
  compact?: boolean;
}> = ({ slotIdx, pokemon, onEdit, onClear, compact }) => {
  const empty = !pokemon;
  const sprite = pokemon ? FrontSprites[pokemon.speciesId.replace(/[^a-z0-9]/g, '')] : null;
  const pokeData = pokemon ? POKEMON[pokemon.speciesId] : null;
  const types = pokeData?.types ?? [];

  return (
    <TouchableOpacity
      style={[slot.card, compact && slot.cardCompact, !empty && slot.cardFilled]}
      onPress={onEdit}
      activeOpacity={0.75}
    >
      {!empty && (
        <TouchableOpacity style={slot.clearBtn} onPress={onClear} hitSlop={{ top: 6, right: 6, bottom: 6, left: 6 }}>
          <Text style={slot.clearTxt}>✕</Text>
        </TouchableOpacity>
      )}

      {empty ? (
        <View style={slot.emptyInner}>
          <View style={[slot.plusCircle, compact && slot.plusCircleCompact]}><Text style={[slot.plusTxt, compact && { fontSize: 18, lineHeight: 22 }]}>+</Text></View>
          {!compact && <Text style={slot.slotNumTxt}>{slotIdx + 1}</Text>}
        </View>
      ) : (
        <View style={slot.filledInner}>
          {sprite && <Image source={sprite} style={compact ? slot.spriteCompact : slot.sprite} resizeMode="contain" />}
          <Text style={slot.pokeName} numberOfLines={1}>{pokeData?.name}</Text>
          {!compact && (
            <View style={slot.typeRow}>
              {types.map(t => (
                <View key={t} style={[slot.typePill, { backgroundColor: TYPE_COLORS[t] ?? '#555' }]}>
                  <Text style={slot.typePillTxt}>{t.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          )}
          <Text style={slot.lvlTxt}>Lv. {pokemon.level}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const slot = StyleSheet.create({
  card: {
    flex: 1, minWidth: 120, maxWidth: 180, margin: 5,
    borderRadius: 16, borderWidth: 2, borderColor: '#1E293B',
    backgroundColor: '#0F172A', borderStyle: 'dashed',
    aspectRatio: 0.72, overflow: 'hidden',
  },
  // Compact: shorter, narrower so all six fit one row on landscape phones
  cardCompact: { minWidth: 84, maxWidth: 130, margin: 4, borderRadius: 12, aspectRatio: 0.95 },
  cardFilled: { borderColor: '#334155', borderStyle: 'solid', backgroundColor: '#111827' },
  clearBtn: {
    position: 'absolute', top: 8, right: 8, zIndex: 10,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center',
  },
  clearTxt: { color: '#FFF', fontSize: 10, fontWeight: '700', lineHeight: 14 },
  emptyInner: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  plusCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
  },
  plusCircleCompact: { width: 30, height: 30, borderRadius: 15 },
  plusTxt: { color: '#475569', fontSize: 24, fontWeight: '300', lineHeight: 28 },
  slotNumTxt: { color: '#334155', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  filledInner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8, gap: 4 },
  sprite: { width: 72, height: 72 },
  spriteCompact: { width: 44, height: 44 },
  pokeName: { color: '#F8FAFC', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  typeRow: { flexDirection: 'row', gap: 3, flexWrap: 'wrap', justifyContent: 'center' },
  typePill: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  typePillTxt: { color: '#FFF', fontSize: 7, fontWeight: '700', letterSpacing: 0.3 },
  lvlTxt: { color: '#64748B', fontSize: 9, fontWeight: '500' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const BattleSetupScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const shortScreen = height < 500; // landscape phones — shrink slots & chrome
  const {
    opponentChoice, opponentPresetId, difficulty,
    setOpponentChoice, setOpponentPresetId, setDifficulty,
    startBattle, selectedGeneration, loadPersistedData,
    setActiveTeam, setOpponentTeam, activeTeam, opponentTeam
  } = useBattleStore();

  const [loading, setLoading] = useState(true);
  const [quickTeamSlots, setQuickTeamSlots] = useState<(CustomPokemon | null)[]>(Array(MAX_TEAM_SIZE).fill(null));
  const [quickOpponentTeamSlots, setQuickOpponentTeamSlots] = useState<(CustomPokemon | null)[]>(Array(MAX_TEAM_SIZE).fill(null));
  const [editingTarget, setEditingTarget] = useState<'player' | 'opponent'>('player');

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editSlotIdx, setEditSlotIdx] = useState<number | null>(null);
  const [editingPokemon, setEditingPokemon] = useState<CustomPokemon | null>(null);
  const [speciesPickerVisible, setSpeciesPickerVisible] = useState(false);
  const [movePickerVisible, setMovePickerVisible] = useState(false);
  const [pickingMoveIndex, setPickingMoveIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [moveSearch, setMoveSearch] = useState('');
  const [useRandom, setUseRandom] = useState(false);
  const [activeTab, setActiveTab] = useState<'team' | 'enemy' | 'difficulty'>('team');

  useEffect(() => {
    loadPersistedData().then(() => {
      const state = useBattleStore.getState();
      const pSlots = Array(MAX_TEAM_SIZE).fill(null);
      state.activeTeam.forEach((p, i) => pSlots[i] = p);
      setQuickTeamSlots(pSlots);

      const oSlots = Array(MAX_TEAM_SIZE).fill(null);
      state.opponentTeam.forEach((p, i) => oSlots[i] = p);
      setQuickOpponentTeamSlots(oSlots);

      setLoading(false);
    });
  }, []);

  // Drop any team members that aren't legal for the newly-selected generation/game.
  useEffect(() => {
    if (loading) return;
    setQuickTeamSlots(prev => prev.map(p => (p && !isPokemonInGen(p.speciesId, selectedGeneration)) ? null : p));
    setQuickOpponentTeamSlots(prev => prev.map(p => (p && !isPokemonInGen(p.speciesId, selectedGeneration)) ? null : p));
  }, [selectedGeneration, loading]);

  // Only show Pokémon that belong to the selected generation's cumulative dex pool.
  // Gen null = All Games (no restriction). Gen 1 = #1–151, Gen 2 = #1–251, etc.
  const allSpeciesIds = useMemo(
    () => getPokemonPoolForGen(selectedGeneration),
    [selectedGeneration]
  );

  const filteredSpecies = useMemo(() =>
    allSpeciesIds.filter(id => POKEMON[id].name.toLowerCase().includes(search.toLowerCase())),
    [allSpeciesIds, search]);

  const legalMovesForEditing = useMemo(() => {
    if (!editingPokemon?.speciesId) return [];
    return Object.keys(MOVES).filter(moveId =>
      isMoveLegalForPokemon(editingPokemon.speciesId, moveId, selectedGeneration)
    );
  }, [editingPokemon?.speciesId, selectedGeneration]);

  const filteredLegalMoves = useMemo(() => {
    if (!moveSearch.trim()) return legalMovesForEditing;
    const q = moveSearch.toLowerCase();
    return legalMovesForEditing.filter(moveId => {
      const move = MOVES[moveId];
      return move && (move.name.toLowerCase().includes(q) || move.type.toLowerCase().includes(q) || move.category.toLowerCase().includes(q));
    });
  }, [legalMovesForEditing, moveSearch]);

  const openEditModal = (idx: number, target: 'player' | 'opponent' = 'player') => {
    setEditingTarget(target);
    setEditSlotIdx(idx);
    const existing = target === 'player' ? quickTeamSlots[idx] : quickOpponentTeamSlots[idx];
    setEditingPokemon(existing ? { ...existing } : null);
    setEditModalVisible(true);
    if (!existing) { setSearch(''); setSpeciesPickerVisible(true); }
  };

  const saveEdit = () => {
    if (editSlotIdx !== null && editingPokemon?.speciesId) {
      if (editingTarget === 'player') {
        const updated = [...quickTeamSlots];
        updated[editSlotIdx] = editingPokemon;
        setQuickTeamSlots(updated);
      } else {
        const updated = [...quickOpponentTeamSlots];
        updated[editSlotIdx] = editingPokemon;
        setQuickOpponentTeamSlots(updated);
      }
    }
    setEditModalVisible(false);
  };

  const handleRandomizeEdit = () => {
    const randomId = allSpeciesIds[Math.floor(Math.random() * allSpeciesIds.length)];
    const poke = POKEMON[randomId];
    setEditingPokemon({
      speciesId: randomId, level: Math.floor(Math.random() * 100) + 1,
      ability: poke.abilities[0] || 'None',
      moves: getRandomMovesForPokemon(randomId, selectedGeneration),
      ivs: { ...defaultIvs }, evs: { ...defaultEvs }, heldItem: '',
    });
  };

  const handleRandomizeMoves = () => {
    if (!editingPokemon?.speciesId) return;
    setEditingPokemon(prev => prev ? { ...prev, moves: getRandomMovesForPokemon(prev.speciesId, selectedGeneration) } : null);
  };

  const handlePickSpecies = (speciesId: string) => {
    const poke = POKEMON[speciesId];

    // Use the full legal move pool (all sources: level-up, TM, HM, tutor, egg)
    // — same data source as the move picker itself.
    const fullLegal = Object.keys(MOVES).filter(mId =>
      isMoveLegalForPokemon(speciesId, mId, selectedGeneration)
    );

    // Prefer STAB moves first, then fill up to 4 from the rest
    const stabMoves = fullLegal.filter(mId => {
      const m = MOVES[mId];
      return m && m.category !== 'Status' && poke.types.includes(m.type);
    });
    const otherMoves = fullLegal.filter(mId => !stabMoves.includes(mId));

    const autoMoves: string[] = [];
    // Pick up to 2 STAB moves
    for (const mId of stabMoves) {
      if (autoMoves.length >= 2) break;
      autoMoves.push(mId);
    }
    // Fill remaining slots from the rest of the pool
    for (const mId of otherMoves) {
      if (autoMoves.length >= 4) break;
      autoMoves.push(mId);
    }

    setEditingPokemon(prev => ({
      ...prev, speciesId, level: prev?.level || 50,
      ability: poke.abilities[0] || 'None', moves: autoMoves,
      ivs: prev?.ivs || { ...defaultIvs }, evs: prev?.evs || { ...defaultEvs },
      heldItem: prev?.heldItem || '',
    }));
    setSpeciesPickerVisible(false);
  };

  const handlePickMove = (moveId: string) => {
    if (pickingMoveIndex === null || !editingPokemon) return;
    const newMoves = [...editingPokemon.moves];
    while (newMoves.length <= pickingMoveIndex) newMoves.push('');
    newMoves[pickingMoveIndex] = moveId;
    setEditingPokemon({ ...editingPokemon, moves: newMoves.filter(Boolean) });
    setMovePickerVisible(false);
  };

  const handleRandomTeam = () => {
    const shuffled = [...allSpeciesIds].sort(() => Math.random() - 0.5).slice(0, MAX_TEAM_SIZE);
    const slots: (CustomPokemon | null)[] = Array(MAX_TEAM_SIZE).fill(null);
    shuffled.forEach((id, i) => {
      const poke = POKEMON[id];
      slots[i] = {
        speciesId: id, level: 50, ability: poke.abilities[0] || 'None',
        moves: getRandomMovesForPokemon(id, selectedGeneration),
        ivs: { ...defaultIvs }, evs: { ...defaultEvs }, heldItem: '',
      };
    });
    setQuickTeamSlots(slots); setUseRandom(false);
  };

  const handleStartBattle = async () => {
    const filled = quickTeamSlots.filter(Boolean) as CustomPokemon[];
    const oppFilled = quickOpponentTeamSlots.filter(Boolean) as CustomPokemon[];

    if (!useRandom && filled.length === 0) return;
    if (opponentChoice === 'custom' && oppFilled.length === 0) return;

    if (useRandom) {
      useBattleStore.getState().setQuickPlayerChoice('random');
    } else {
      await setActiveTeam(filled);
      useBattleStore.getState().setQuickPlayerChoice('loadout');
      useBattleStore.getState().selectPlayerPokemon('0');
    }

    if (opponentChoice === 'custom') {
      await setOpponentTeam(oppFilled);
    }

    startBattle();
    navigation.navigate('Battle');
  };

  const validPresets = PRESETS.filter(p => p.generation === null || p.generation === selectedGeneration || selectedGeneration === null);
  const filledSlots = quickTeamSlots.filter(Boolean).length;
  const canStart = useRandom || filledSlots > 0;
  const getFormatLabel = () => selectedGeneration === null ? 'ALL GAMES' : `GEN ${selectedGeneration}`;

  if (loading) return null;

  return (
    <View style={s.root}>
      {/* ── Header ── */}
      <View style={[s.header, { paddingTop: insets.top + (shortScreen ? 8 : 12), paddingBottom: shortScreen ? 8 : 12, paddingLeft: insets.left + 16, paddingRight: insets.right + 16 }]}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backTxt}>← BACK</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>BATTLE SETUP</Text>
          <View style={s.genBadge}><Text style={s.genBadgeTxt}>{getFormatLabel()}</Text></View>
        </View>
        <View style={{ width: 70 }} />
      </View>

      {/* ── Tab Bar ── */}
      <View style={s.tabBar}>
        {([
          { key: 'team', label: '⚔️  MY TEAM', sub: `${filledSlots} / ${MAX_TEAM_SIZE}` },
          { key: 'enemy', label: '🤖  OPPONENT', sub: opponentChoice === 'preset' ? 'PRESET' : opponentChoice === 'custom' ? 'CUSTOM' : 'RANDOM' },
          { key: 'difficulty', label: '⚡  DIFFICULTY', sub: difficulty.toUpperCase() },
        ] as const).map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={[s.tab, active && s.tabActive]} onPress={() => setActiveTab(tab.key)}>
              <Text style={[s.tabLabel, active && s.tabLabelActive]}>{tab.label}</Text>
              <Text style={[s.tabSub, active && s.tabSubActive]}>{tab.sub}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Content ── */}
      <View style={s.content}>

        {/* MY TEAM TAB */}
        {activeTab === 'team' && (
          <View style={{ flex: 1 }}>
            <View style={s.panelHeader}>
              <Text style={s.panelTitle}>YOUR TEAM</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={s.btnSecondary} onPress={handleRandomTeam}>
                  <Text style={s.btnSecondaryTxt}>🎲 RANDOM TEAM</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView contentContainerStyle={s.teamGrid} showsVerticalScrollIndicator={false}>
              {quickTeamSlots.map((pokemon, idx) => (
                <TeamSlot
                  key={idx} slotIdx={idx} pokemon={pokemon}
                  compact={shortScreen}
                  onEdit={() => openEditModal(idx)}
                  onClear={() => { const n = [...quickTeamSlots]; n[idx] = null; setQuickTeamSlots(n); }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* OPPONENT TAB */}
        {activeTab === 'enemy' && (
          <ScrollView contentContainerStyle={s.tabScroll}>
            <Text style={s.panelTitle}>OPPONENT TYPE</Text>
            <View style={s.opponentRow}>
              {[
                { key: 'random', icon: '🎲', label: 'RANDOM RIVAL', desc: 'Face a fully randomized AI team' },
                { key: 'preset', icon: '🏆', label: 'PRESET TRAINER', desc: 'Challenge a hand-crafted trainer' },
                { key: 'custom', icon: '🛠️', label: 'CUSTOM TEAM', desc: 'Build the exact opponent team' },
              ].map(opt => {
                const active = opponentChoice === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[s.opponentCard, active && s.opponentCardActive]}
                    onPress={() => {
                      setOpponentChoice(opt.key as any);
                      if (opt.key === 'preset' && validPresets.length > 0 && !opponentPresetId) setOpponentPresetId(validPresets[0].id);
                    }}
                  >
                    <Text style={s.opponentIcon}>{opt.icon}</Text>
                    <Text style={[s.opponentLabel, active && s.opponentLabelActive]}>{opt.label}</Text>
                    <Text style={s.opponentDesc}>{opt.desc}</Text>
                    {active && <View style={s.opponentCheck}><Text style={s.opponentCheckTxt}>✓</Text></View>}
                  </TouchableOpacity>
                );
              })}
            </View>

            {opponentChoice === 'preset' && (
              <View style={{ marginTop: 24 }}>
                <Text style={[s.panelTitle, { marginBottom: 12 }]}>CHOOSE TRAINER</Text>
                {validPresets.length === 0 ? (
                  <Text style={s.emptyHint}>No presets available for this generation.</Text>
                ) : (
                  validPresets.map(preset => {
                    const active = opponentPresetId === preset.id;
                    return (
                      <TouchableOpacity key={preset.id} style={[s.presetCard, active && s.presetCardActive]} onPress={() => setOpponentPresetId(preset.id)}>
                        <View style={{ flex: 1 }}>
                          <Text style={s.presetName}>{preset.name}</Text>
                          <Text style={s.presetSub}>Ace: {POKEMON[preset.pokemon[0].speciesId]?.name ?? '?'} · {preset.pokemon.length} Pokémon</Text>
                        </View>
                        {active && <View style={s.presetCheckBadge}><Text style={s.presetCheckTxt}>✓</Text></View>}
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            )}

            {opponentChoice === 'custom' && (
              <View style={{ marginTop: 24 }}>
                <View style={[s.panelHeader, { paddingHorizontal: 0 }]}>
                  <Text style={s.panelTitle}>OPPONENT TEAM</Text>
                  <TouchableOpacity style={s.btnSecondary} onPress={() => {
                    const shuffled = [...allSpeciesIds].sort(() => Math.random() - 0.5).slice(0, MAX_TEAM_SIZE);
                    const slots: (CustomPokemon | null)[] = Array(MAX_TEAM_SIZE).fill(null);
                    shuffled.forEach((id, i) => {
                      const poke = POKEMON[id];
                      slots[i] = {
                        speciesId: id, level: 50, ability: poke.abilities[0] || 'None',
                        moves: getRandomMovesForPokemon(id, selectedGeneration),
                        ivs: { ...defaultIvs }, evs: { ...defaultEvs }, heldItem: '',
                      };
                    });
                    setQuickOpponentTeamSlots(slots);
                  }}>
                    <Text style={s.btnSecondaryTxt}>🎲 RANDOM TEAM</Text>
                  </TouchableOpacity>
                </View>
                <View style={[s.teamGrid, { paddingHorizontal: 0 }]}>
                  {quickOpponentTeamSlots.map((pokemon, idx) => (
                    <TeamSlot
                      key={idx} slotIdx={idx} pokemon={pokemon}
                      compact={shortScreen}
                      onEdit={() => openEditModal(idx, 'opponent')}
                      onClear={() => { const n = [...quickOpponentTeamSlots]; n[idx] = null; setQuickOpponentTeamSlots(n); }}
                    />
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {/* DIFFICULTY TAB */}
        {activeTab === 'difficulty' && (
          <ScrollView contentContainerStyle={s.tabScroll}>
            <Text style={s.panelTitle}>AI DIFFICULTY</Text>
            <View style={s.diffGrid}>
              {[
                { key: 'easy', label: 'EASY', color: '#10B981', icon: '🌿', desc: 'Relaxed play, lower stats. Great for learning.' },
                { key: 'medium', label: 'MEDIUM', color: '#F59E0B', icon: '⚡', desc: 'Standard competitive rules. A fair fight.' },
                { key: 'hard', label: 'HARD', color: '#EF4444', icon: '🔥', desc: 'Strategic AI with smart switching.' },
                { key: 'cheating', label: 'CHAMPION', color: '#8B5CF6', icon: '👑', desc: 'VGC Champion level. Good luck.' },
              ].map(d => {
                const active = difficulty === d.key;
                return (
                  <TouchableOpacity
                    key={d.key}
                    style={[s.diffCard, shortScreen && s.diffCardCompact, active && { borderColor: d.color, backgroundColor: `${d.color}15` }]}
                    onPress={() => setDifficulty(d.key as any)}
                  >
                    <Text style={[s.diffIcon, shortScreen && { fontSize: 24 }]}>{d.icon}</Text>
                    <Text style={[s.diffLabel, active && { color: d.color }]}>{d.label}</Text>
                    <Text style={s.diffDesc} numberOfLines={shortScreen ? 2 : undefined}>{d.desc}</Text>
                    {active && <View style={[s.diffCheck, { backgroundColor: d.color }]}><Text style={s.diffCheckTxt}>✓</Text></View>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>

      {/* ── Bottom CTA ── */}
      <View style={[s.bottomBar, { paddingBottom: insets.bottom + (shortScreen ? 8 : 16), paddingTop: shortScreen ? 8 : 16, paddingLeft: insets.left + 16, paddingRight: insets.right + 16 }]}>
        <TouchableOpacity style={[s.startBtn, shortScreen && { paddingVertical: 12 }, !canStart && s.startBtnDisabled]} onPress={handleStartBattle} disabled={!canStart}>
          <Text style={[s.startBtnTxt, shortScreen && { fontSize: 14 }]}>⚔️  COMMENCE BATTLE</Text>
        </TouchableOpacity>
      </View>

      {/* ══════════ EDIT MODAL ══════════ */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={m.overlay}>
          <View style={m.sheet}>
            <View style={m.sheetHeader}>
              <Text style={m.sheetTitle}>EDIT SLOT {(editSlotIdx ?? 0) + 1}</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={m.randomBtn} onPress={handleRandomizeEdit}>
                  <Text style={m.randomBtnTxt}>🎲 RANDOMIZE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={m.closeBtn} onPress={() => setEditModalVisible(false)}>
                  <Text style={m.closeBtnTxt}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView contentContainerStyle={m.editBody}>
              {!editingPokemon?.speciesId ? (
                <View style={m.emptyState}>
                  <Text style={m.emptyStateEmoji}>🔍</Text>
                  <Text style={m.emptyStateTitle}>No Pokémon Selected</Text>
                  <Text style={m.emptyStateDesc}>Pick a species to get started</Text>
                  <TouchableOpacity style={m.pickBtn} onPress={() => { setSearch(''); setSpeciesPickerVisible(true); }}>
                    <Text style={m.pickBtnTxt}>SELECT POKÉMON</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  {/* Species Hero */}
                  <View style={m.heroRow}>
                    <View style={m.heroSprite}>
                      <Image source={FrontSprites[editingPokemon.speciesId.replace(/[^a-z0-9]/g, '')]} style={m.heroImg} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={m.heroName}>{POKEMON[editingPokemon.speciesId]?.name}</Text>
                      <View style={{ flexDirection: 'row', gap: 6, marginTop: 4, marginBottom: 12 }}>
                        {(POKEMON[editingPokemon.speciesId]?.types ?? []).map(t => (
                          <View key={t} style={[m.typePill, { backgroundColor: TYPE_COLORS[t] ?? '#555' }]}>
                            <Text style={m.typePillTxt}>{t.toUpperCase()}</Text>
                          </View>
                        ))}
                      </View>
                      <TouchableOpacity style={m.changeSpeciesBtn} onPress={() => { setSearch(''); setSpeciesPickerVisible(true); }}>
                        <Text style={m.changeSpeciesTxt}>🔄 CHANGE SPECIES</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Level & Item */}
                  <View style={m.formGrid}>
                    <View style={m.formField}>
                      <Text style={m.fieldLabel}>LEVEL</Text>
                      <TextInput
                        style={m.input}
                        value={String(editingPokemon.level)}
                        keyboardType="number-pad"
                        onChangeText={(v) => {
                          let lv = parseInt(v) || 1;
                          if (lv > 100) lv = 100;
                          setEditingPokemon({ ...editingPokemon, level: lv });
                        }}
                      />
                    </View>
                    <View style={m.formField}>
                      <Text style={m.fieldLabel}>HELD ITEM</Text>
                      <TextInput
                        style={m.input}
                        value={editingPokemon.heldItem || ''}
                        placeholder="e.g. Leftovers"
                        placeholderTextColor="#475569"
                        onChangeText={(v) => setEditingPokemon({ ...editingPokemon, heldItem: v })}
                      />
                    </View>
                  </View>

                  {/* Ability Picker */}
                  <View style={m.formField}>
                    <Text style={m.fieldLabel}>ABILITY</Text>
                    <View style={m.abilityPillWrap}>
                      {(POKEMON[editingPokemon.speciesId]?.abilities ?? ['None']).map(ab => (
                        <TouchableOpacity
                          key={ab}
                          style={[m.abilityPill, editingPokemon.ability === ab && m.abilityPillActive]}
                          onPress={() => setEditingPokemon({ ...editingPokemon, ability: ab })}
                        >
                          <Text style={[m.abilityPillTxt, editingPokemon.ability === ab && m.abilityPillTxtActive]}>{ab}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Nature Picker */}
                  <View style={m.formField}>
                    <Text style={m.fieldLabel}>NATURE</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 6, paddingVertical: 2 }}>
                      {NATURE_LIST.map(nat => {
                        const active = editingPokemon.nature === nat;
                        return (
                          <TouchableOpacity key={nat} style={[m.abilityPill, active && m.abilityPillActive]} onPress={() => setEditingPokemon({ ...editingPokemon, nature: nat })}>
                            <Text style={[m.abilityPillTxt, active && m.abilityPillTxtActive]}>{nat}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                    <Text style={{ color: '#64748B', fontSize: 10, fontWeight: '500', marginTop: 4 }}>{editingPokemon.nature ? natureSummary(editingPokemon.nature) : 'Random nature (tap to choose one)'}</Text>
                  </View>

                  {/* Moves */}
                  <View style={m.movesSection}>
                    <View style={m.movesSectionHeader}>
                      <Text style={m.fieldLabel}>MOVES</Text>
                      <TouchableOpacity style={m.randomMovesBtn} onPress={handleRandomizeMoves}>
                        <Text style={m.randomMovesBtnTxt}>🎲 RANDOMIZE</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={m.movesGrid}>
                      {[0, 1, 2, 3].map(mIdx => {
                        const moveId = editingPokemon.moves[mIdx];
                        const move = moveId ? MOVES[moveId] : null;
                        const typeColor = move ? (TYPE_COLORS[move.type] ?? '#334155') : '#1E293B';
                        return (
                          <TouchableOpacity
                            key={mIdx}
                            style={[m.moveSlot, move && { borderColor: typeColor + '88' }]}
                            onPress={() => { setPickingMoveIndex(mIdx); setMoveSearch(''); setMovePickerVisible(true); }}
                          >
                            {move ? (
                              <>
                                <View style={[m.moveSlotAccent, { backgroundColor: typeColor }]} />
                                <View style={m.moveSlotContent}>
                                  <Text style={m.moveName}>{move.name}</Text>
                                  <View style={{ flexDirection: 'row', gap: 4 }}>
                                    <View style={[m.moveBadge, { backgroundColor: typeColor }]}>
                                      <Text style={m.moveBadgeTxt}>{move.type.toUpperCase()}</Text>
                                    </View>
                                    <View style={m.moveCatBadge}>
                                      <Text style={m.moveCatBadgeTxt}>{move.category.toUpperCase()}</Text>
                                    </View>
                                  </View>
                                </View>
                              </>
                            ) : (
                              <Text style={m.emptyMoveTxt}>+ Add Move</Text>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

            <View style={m.footer}>
              <TouchableOpacity style={m.saveBtn} onPress={saveEdit}>
                <Text style={m.saveBtnTxt}>SAVE POKÉMON</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ══════════ SPECIES PICKER ══════════ */}
      <Modal visible={speciesPickerVisible} transparent animationType="fade">
        <View style={p.overlay}>
          <View style={p.sheet}>
            <View style={p.header}>
              <Text style={p.title}>SELECT SPECIES</Text>
              <TouchableOpacity style={p.closeBtn} onPress={() => setSpeciesPickerVisible(false)}>
                <Text style={p.closeTxt}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={p.searchRow}>
              <Text style={p.searchIcon}>🔍</Text>
              <TextInput
                style={p.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Search Pokémon..."
                placeholderTextColor="#475569"
                autoCorrect={false}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Text style={p.clearSearch}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView contentContainerStyle={p.grid}>
              {filteredSpecies.map(id => {
                const poke = POKEMON[id];
                const spr = FrontSprites[id.replace(/[^a-z0-9]/g, '')];
                const types = poke.types ?? [];
                return (
                  <TouchableOpacity key={id} style={p.card} onPress={() => handlePickSpecies(id)} activeOpacity={0.7}>
                    <View style={p.cardSpriteWrap}>
                      {spr && <Image source={spr} style={p.cardSprite} resizeMode="contain" />}
                    </View>
                    <Text style={p.cardName} numberOfLines={1}>{poke.name}</Text>
                    <View style={p.cardTypes}>
                      {types.map(t => (
                        <View key={t} style={[p.cardTypePill, { backgroundColor: TYPE_COLORS[t] ?? '#555' }]}>
                          <Text style={p.cardTypeTxt}>{t.slice(0, 3).toUpperCase()}</Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ══════════ MOVE PICKER ══════════ */}
      <Modal visible={movePickerVisible} transparent animationType="fade">
        <View style={p.overlay}>
          <View style={[p.sheet, { maxWidth: 500 }]}>
            <View style={p.header}>
              <Text style={p.title}>SELECT MOVE</Text>
              <TouchableOpacity style={p.closeBtn} onPress={() => setMovePickerVisible(false)}>
                <Text style={p.closeTxt}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={p.searchRow}>
              <Text style={p.searchIcon}>🔍</Text>
              <TextInput
                style={p.searchInput}
                value={moveSearch}
                onChangeText={setMoveSearch}
                placeholder="Search by name, type..."
                placeholderTextColor="#475569"
                autoCorrect={false}
              />
              {moveSearch.length > 0 && (
                <TouchableOpacity onPress={() => setMoveSearch('')}>
                  <Text style={p.clearSearch}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView contentContainerStyle={{ padding: 8 }}>
              {filteredLegalMoves.map(id => {
                const move = MOVES[id];
                const tc = TYPE_COLORS[move.type] ?? '#334155';
                return (
                  <TouchableOpacity key={id} style={mv.row} onPress={() => handlePickMove(id)} activeOpacity={0.7}>
                    <View style={[mv.accent, { backgroundColor: tc }]} />
                    <Text style={mv.name}>{move.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 6, marginLeft: 'auto' }}>
                      <View style={[mv.badge, { backgroundColor: tc }]}>
                        <Text style={mv.badgeTxt}>{move.type.toUpperCase()}</Text>
                      </View>
                      <View style={mv.catBadge}>
                        <Text style={mv.catTxt}>{move.category.toUpperCase()}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ─── Main Screen Styles ───────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070D1A' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: '#0D1525', borderBottomWidth: 1.5, borderBottomColor: '#1E293B',
  },
  backBtn: { backgroundColor: '#1E293B', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
  backTxt: { color: '#94A3B8', fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  headerCenter: { alignItems: 'center', gap: 4 },
  headerTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '700', letterSpacing: 2 },
  genBadge: { backgroundColor: '#FF4554', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  genBadgeTxt: { color: '#FFF', fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },

  tabBar: { flexDirection: 'row', backgroundColor: '#0D1525', borderBottomWidth: 1.5, borderBottomColor: '#1E293B' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#00C3E3' },
  tabLabel: { color: '#475569', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  tabLabelActive: { color: '#00C3E3' },
  tabSub: { color: '#334155', fontSize: 9, fontWeight: '500', marginTop: 2 },
  tabSubActive: { color: 'rgba(0,195,227,0.6)' },

  content: { flex: 1 },
  tabScroll: { padding: 20, gap: 16 },

  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  panelTitle: { color: '#64748B', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  btnSecondary: { backgroundColor: 'rgba(139,92,246,0.15)', borderWidth: 1.5, borderColor: '#8B5CF6', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  btnSecondaryTxt: { color: '#8B5CF6', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'center' },

  opponentRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  opponentCard: { flex: 1, backgroundColor: '#111827', borderRadius: 16, borderWidth: 2, borderColor: '#1E293B', padding: 20, alignItems: 'center', gap: 6, position: 'relative', overflow: 'hidden' },
  opponentCardActive: { borderColor: '#00C3E3', backgroundColor: 'rgba(0,195,227,0.06)' },
  opponentIcon: { fontSize: 32 },
  opponentLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  opponentLabelActive: { color: '#00C3E3' },
  opponentDesc: { color: '#475569', fontSize: 10, fontWeight: '500', textAlign: 'center' },
  opponentCheck: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: '#00C3E3', alignItems: 'center', justifyContent: 'center' },
  opponentCheckTxt: { color: '#0F172A', fontSize: 12, fontWeight: '700' },

  presetCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#1E293B', marginBottom: 8 },
  presetCardActive: { borderColor: '#FF4554', backgroundColor: 'rgba(255,69,84,0.06)' },
  presetName: { color: '#F8FAFC', fontSize: 15, fontWeight: '700' },
  presetSub: { color: '#64748B', fontSize: 11, fontWeight: '500', marginTop: 3 },
  presetCheckBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF4554', alignItems: 'center', justifyContent: 'center' },
  presetCheckTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  emptyHint: { color: '#475569', fontStyle: 'italic', textAlign: 'center', padding: 24 },

  diffGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  diffCard: { flex: 1, minWidth: '46%', backgroundColor: '#111827', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: '#1E293B', alignItems: 'center', gap: 6, position: 'relative', overflow: 'hidden' },
  // Short landscape: all four in one row, tighter padding
  diffCardCompact: { minWidth: '22%', padding: 12, borderRadius: 12 },
  diffIcon: { fontSize: 32 },
  diffLabel: { color: '#94A3B8', fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  diffDesc: { color: '#475569', fontSize: 10, fontWeight: '500', textAlign: 'center' },
  diffCheck: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  diffCheckTxt: { color: '#FFF', fontSize: 12, fontWeight: '700' },

  bottomBar: { padding: 16, backgroundColor: '#0D1525', borderTopWidth: 1.5, borderTopColor: '#1E293B' },
  startBtn: {
    backgroundColor: '#FF4554', borderRadius: 14, paddingVertical: 18, alignItems: 'center',
    shadowColor: '#FF4554', shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 6 },
  },
  startBtnDisabled: { opacity: 0.4 },
  startBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700', letterSpacing: 2 },
});

// ─── Edit Modal Styles ────────────────────────────────────────────────────────
const m = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  sheet: { backgroundColor: '#0D1525', borderRadius: 20, borderWidth: 1.5, borderColor: '#1E293B', width: '100%', maxWidth: 640, maxHeight: '92%' },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1.5, borderBottomColor: '#1E293B',
  },
  sheetTitle: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  randomBtn: { backgroundColor: 'rgba(0,195,227,0.12)', borderWidth: 1, borderColor: '#00C3E3', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  randomBtnTxt: { color: '#00C3E3', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  closeBtnTxt: { color: '#94A3B8', fontSize: 14, fontWeight: '700' },
  editBody: { padding: 20, gap: 20 },

  emptyState: { alignItems: 'center', paddingVertical: 48, gap: 12 },
  emptyStateEmoji: { fontSize: 48 },
  emptyStateTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '700' },
  emptyStateDesc: { color: '#64748B', fontSize: 12, fontWeight: '500' },
  pickBtn: { backgroundColor: '#00C3E3', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, marginTop: 8 },
  pickBtnTxt: { color: '#0F172A', fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },

  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroSprite: { width: 100, height: 100, backgroundColor: '#111827', borderRadius: 16, borderWidth: 1.5, borderColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  heroImg: { width: 90, height: 90 },
  heroName: { color: '#F8FAFC', fontSize: 22, fontWeight: '700' },
  typePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typePillTxt: { color: '#FFF', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  changeSpeciesBtn: { backgroundColor: 'rgba(0,195,227,0.12)', borderWidth: 1, borderColor: '#00C3E3', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, alignSelf: 'flex-start' },
  changeSpeciesTxt: { color: '#00C3E3', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  formGrid: { flexDirection: 'row', gap: 12 },
  formField: { flex: 1 },
  fieldLabel: { color: '#475569', fontSize: 9, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  input: { backgroundColor: '#111827', color: '#F8FAFC', padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#1E293B', fontSize: 14, fontWeight: '600' },

  abilityPillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  abilityPill: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#1E293B', backgroundColor: '#111827' },
  abilityPillActive: { borderColor: '#00C3E3', backgroundColor: 'rgba(0,195,227,0.1)' },
  abilityPillTxt: { color: '#64748B', fontSize: 11, fontWeight: '600' },
  abilityPillTxtActive: { color: '#00C3E3' },

  movesSection: { gap: 10 },
  movesSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  randomMovesBtn: { backgroundColor: 'rgba(139,92,246,0.12)', borderWidth: 1, borderColor: '#8B5CF6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  randomMovesBtnTxt: { color: '#8B5CF6', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  movesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  moveSlot: {
    flexBasis: '48%', backgroundColor: '#111827', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#1E293B', minHeight: 72,
    overflow: 'hidden', flexDirection: 'row',
  },
  moveSlotAccent: { width: 4 },
  moveSlotContent: { flex: 1, padding: 12, justifyContent: 'space-between' },
  emptyMoveTxt: { color: '#334155', fontSize: 12, fontWeight: '500', fontStyle: 'italic', flex: 1, textAlign: 'center', textAlignVertical: 'center', padding: 12 },
  moveName: { color: '#F8FAFC', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  moveBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  moveBadgeTxt: { color: '#FFF', fontSize: 8, fontWeight: '700' },
  moveCatBadge: { backgroundColor: '#1E293B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  moveCatBadgeTxt: { color: '#64748B', fontSize: 8, fontWeight: '700' },

  footer: { padding: 16, borderTopWidth: 1.5, borderTopColor: '#1E293B' },
  saveBtn: { backgroundColor: '#00C3E3', padding: 16, borderRadius: 14, alignItems: 'center' },
  saveBtnTxt: { color: '#0F172A', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
});

// ─── Picker Styles ────────────────────────────────────────────────────────────
const p = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  sheet: { backgroundColor: '#0D1525', borderRadius: 20, borderWidth: 1.5, borderColor: '#1E293B', width: '100%', maxWidth: 860, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1.5, borderBottomColor: '#1E293B' },
  title: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  closeTxt: { color: '#94A3B8', fontSize: 14, fontWeight: '700' },

  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1.5, borderBottomColor: '#1E293B', gap: 10 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, backgroundColor: '#111827', color: '#F8FAFC', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#1E293B', fontSize: 13, fontWeight: '500' },
  clearSearch: { color: '#64748B', fontSize: 16, fontWeight: '700', padding: 4 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8, justifyContent: 'center' },
  card: {
    width: 96, backgroundColor: '#111827', borderRadius: 14,
    borderWidth: 1.5, borderColor: '#1E293B', alignItems: 'center',
    paddingHorizontal: 6, paddingVertical: 10, gap: 4,
  },
  cardSpriteWrap: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  cardSprite: { width: 60, height: 60 },
  cardName: { color: '#F8FAFC', fontSize: 10, fontWeight: '600', textAlign: 'center' },
  cardTypes: { flexDirection: 'row', gap: 3, flexWrap: 'wrap', justifyContent: 'center' },
  cardTypePill: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  cardTypeTxt: { color: '#FFF', fontSize: 7, fontWeight: '700' },
});

// ─── Move List Styles ─────────────────────────────────────────────────────────
const mv = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827',
    borderRadius: 12, marginBottom: 6, borderWidth: 1.5, borderColor: '#1E293B',
    overflow: 'hidden', paddingRight: 12, minHeight: 52,
  },
  accent: { width: 5, alignSelf: 'stretch' },
  name: { color: '#F8FAFC', fontSize: 13, fontWeight: '600', paddingLeft: 12, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeTxt: { color: '#FFF', fontSize: 9, fontWeight: '700' },
  catBadge: { backgroundColor: '#1E293B', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  catTxt: { color: '#64748B', fontSize: 9, fontWeight: '700' },
});
