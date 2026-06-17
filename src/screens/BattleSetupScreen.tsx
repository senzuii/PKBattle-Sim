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
import { natureSummary, NATURE_STATS, NATURE_STAT_LABELS, NATURE_CHART } from '../data/natures';
import { possibleGenders, genderSymbol } from '../engine/battle/Gender';
import { COLORS, TYPE_COLORS } from '../theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { PrimaryButton } from '../components/PrimaryButton';

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
  cardWidth?: number;
}> = ({ slotIdx, pokemon, onEdit, onClear, compact, cardWidth }) => {
  const empty = !pokemon;
  const sprite = pokemon ? FrontSprites[pokemon.speciesId.replace(/[^a-z0-9]/g, '')] : null;
  const pokeData = pokemon ? POKEMON[pokemon.speciesId] : null;
  const types = pokeData?.types ?? [];

  return (
    <TouchableOpacity
      style={[
        slot.card,
        compact && slot.cardCompact,
        !empty && slot.cardFilled,
        cardWidth != null && { flexGrow: 0, flexShrink: 0, flexBasis: cardWidth, width: cardWidth, minWidth: cardWidth, maxWidth: cardWidth },
      ]}
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
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const shortScreen = height < 500; // landscape phones — vertical space is tight
  const narrow = width < 480;       // portrait phones
  // The app is orientation-locked to landscape, so a phone reads as shortScreen.
  // Treat either dimension being small as "phone" and compact the whole UI.
  const compactUi = shortScreen || narrow;

  // Responsive team grid: enough columns that cards stay small on phones.
  const teamColumns = compactUi ? 6 : width < 768 ? 4 : 6;
  const slotMarginPx = compactUi ? 4 : 5; // matches slot.card / cardCompact margins
  const slotMaxWidth = compactUi ? 108 : 180;
  const computeSlotWidth = (avail: number) =>
    Math.max(78, Math.min(slotMaxWidth, Math.floor(avail / teamColumns) - slotMarginPx * 2));
  const playerSlotWidth = computeSlotWidth(width - 24);   // teamGrid paddingHorizontal 12 * 2
  const opponentSlotWidth = computeSlotWidth(width - 40); // nested in tabScroll padding 20 * 2
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
  const [abilityOpen, setAbilityOpen] = useState(false);
  const [natureOpen, setNatureOpen] = useState(false);
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
      <ScreenHeader
        title="BATTLE SETUP"
        badge={getFormatLabel()}
        onBack={() => navigation.goBack()}
      />

      {/* ── Slim segmented tabs ── */}
      <View style={s.tabsWrap}>
        <SegmentedTabs
          active={activeTab}
          onChange={(k) => setActiveTab(k as any)}
          tabs={[
            { key: 'team',       label: 'MY TEAM',    sub: `${filledSlots}/${MAX_TEAM_SIZE}` },
            { key: 'enemy',      label: 'OPPONENT',   sub: opponentChoice === 'preset' ? 'PRESET' : opponentChoice === 'custom' ? 'CUSTOM' : 'RANDOM' },
            { key: 'difficulty', label: 'DIFFICULTY', sub: difficulty.toUpperCase() },
          ]}
        />
      </View>

      {/* ── Content ── */}
      <View style={s.content}>

        {/* MY TEAM TAB */}
        {activeTab === 'team' && (
          <View style={{ flex: 1 }}>
            <View style={s.panelHeader}>
              <Text style={s.panelTitle}>YOUR TEAM</Text>
              <TouchableOpacity style={s.btnSecondary} onPress={handleRandomTeam}>
                <Text style={s.btnSecondaryTxt}>🎲 RANDOM</Text>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={s.teamGrid} showsVerticalScrollIndicator={false}>
              {quickTeamSlots.map((pokemon, idx) => (
                <TeamSlot
                  key={idx} slotIdx={idx} pokemon={pokemon}
                  compact={compactUi} cardWidth={playerSlotWidth}
                  onEdit={() => openEditModal(idx)}
                  onClear={() => { const n = [...quickTeamSlots]; n[idx] = null; setQuickTeamSlots(n); }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* OPPONENT TAB */}
        {activeTab === 'enemy' && (
          <ScrollView contentContainerStyle={[s.tabScroll, compactUi && s.tabScrollNarrow]}>
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
                    style={[s.opponentCard, compactUi && s.opponentCardNarrow, active && s.opponentCardActive]}
                    onPress={() => {
                      setOpponentChoice(opt.key as any);
                      if (opt.key === 'preset' && validPresets.length > 0 && !opponentPresetId) setOpponentPresetId(validPresets[0].id);
                    }}
                  >
                    <Text style={[s.opponentIcon, compactUi && s.opponentIconNarrow]}>{opt.icon}</Text>
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
                      compact={compactUi} cardWidth={opponentSlotWidth}
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
          <ScrollView contentContainerStyle={[s.tabScroll, compactUi && s.tabScrollNarrow]}>
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
                    style={[s.diffCard, shortScreen && s.diffCardCompact, narrow && s.diffCardNarrow, active && { borderColor: d.color, backgroundColor: `${d.color}15` }]}
                    onPress={() => setDifficulty(d.key as any)}
                  >
                    <Text style={[s.diffIcon, shortScreen && { fontSize: 24 }, narrow && { fontSize: 26 }]}>{d.icon}</Text>
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

      {/* ── Compact footer CTA ── */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 8, paddingLeft: insets.left + 14, paddingRight: insets.right + 14 }]}>
        <View style={s.footerInfo}>
          <Text style={s.footerLabel}>{activeTab === 'enemy' ? 'OPPONENT' : activeTab === 'difficulty' ? 'DIFFICULTY' : 'YOUR TEAM'}</Text>
          <Text style={s.footerValue}>
            {useRandom ? 'Random loadout' : `${filledSlots}/${MAX_TEAM_SIZE} Pokémon chosen`}
          </Text>
        </View>
        <PrimaryButton label="⚔  COMMENCE BATTLE" onPress={handleStartBattle} disabled={!canStart} />
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

            <ScrollView contentContainerStyle={[m.editBody, compactUi && m.editBodyCompact]}>
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
                  <View style={[m.heroRow, compactUi && m.heroRowCompact]}>
                    <View style={[m.heroSprite, compactUi && m.heroSpriteCompact]}>
                      <Image source={FrontSprites[editingPokemon.speciesId.replace(/[^a-z0-9]/g, '')]} style={[m.heroImg, compactUi && m.heroImgCompact]} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[m.heroName, compactUi && m.heroNameCompact]}>{POKEMON[editingPokemon.speciesId]?.name}</Text>
                      <View style={{ flexDirection: 'row', gap: 6, marginTop: 4, marginBottom: 12 }}>
                        {(POKEMON[editingPokemon.speciesId]?.types ?? []).map(t => (
                          <View key={t} style={[m.typePill, { backgroundColor: TYPE_COLORS[t] ?? '#555' }]}>
                            <Text style={m.typePillTxt}>{t.toUpperCase()}</Text>
                          </View>
                        ))}
                      </View>
                      {/* Inline controls: change species · gender · ability dropdown */}
                      <View style={m.heroControls}>
                        <TouchableOpacity style={m.changeSpeciesBtn} onPress={() => { setSearch(''); setSpeciesPickerVisible(true); }}>
                          <Text style={m.changeSpeciesTxt}>🔄 CHANGE</Text>
                        </TouchableOpacity>

                        {/* Gender toggle */}
                        {(() => {
                          const opts = possibleGenders(editingPokemon.speciesId);
                          if (opts[0] === 'N') {
                            return <View style={m.heroChip}><Text style={m.heroChipTxt}>Genderless</Text></View>;
                          }
                          const cur = editingPokemon.gender && opts.includes(editingPokemon.gender) ? editingPokemon.gender : opts[0];
                          const color = cur === 'M' ? '#3B82F6' : '#EC4899';
                          return (
                            <TouchableOpacity
                              style={[m.heroChip, { borderColor: color }]}
                              disabled={opts.length === 1}
                              onPress={() => setEditingPokemon({ ...editingPokemon, gender: cur === 'M' ? 'F' : 'M' })}
                            >
                              <Text style={[m.heroChipTxt, { color }]}>{genderSymbol(cur)} {cur === 'M' ? 'Male' : 'Female'}</Text>
                            </TouchableOpacity>
                          );
                        })()}

                        {/* Ability dropdown */}
                        <TouchableOpacity style={[m.heroChip, abilityOpen && m.heroChipActive]} onPress={() => { setAbilityOpen(o => !o); setNatureOpen(false); }}>
                          <Text style={m.heroChipTxt} numberOfLines={1}>{editingPokemon.ability || 'Ability'} {abilityOpen ? '▴' : '▾'}</Text>
                        </TouchableOpacity>

                        {/* Nature dropdown */}
                        <TouchableOpacity style={[m.heroChip, natureOpen && m.heroChipActive]} onPress={() => { setNatureOpen(o => !o); setAbilityOpen(false); }}>
                          <Text style={m.heroChipTxt} numberOfLines={1}>{editingPokemon.nature ?? 'Nature'} {natureOpen ? '▴' : '▾'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Ability dropdown menu (clean card, full width) */}
                  {abilityOpen && (
                    <View style={m.dropdownMenu}>
                      {(POKEMON[editingPokemon.speciesId]?.abilities ?? ['None']).map(ab => {
                        const active = editingPokemon.ability === ab;
                        return (
                          <TouchableOpacity
                            key={ab}
                            style={[m.dropdownItem, active && m.dropdownItemActive]}
                            onPress={() => { setEditingPokemon({ ...editingPokemon, ability: ab }); setAbilityOpen(false); }}
                          >
                            <Text style={[m.dropdownItemTxt, active && { color: '#00C3E3' }]}>{ab}</Text>
                            {active && <Text style={{ color: '#00C3E3', fontWeight: '700' }}>✓</Text>}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}

                  {/* Nature chart — columns raise (+), rows lower (−) */}
                  {natureOpen && (
                    <View style={m.natureChart}>
                      <View style={m.natureRow}>
                        <View style={m.natureCorner}><Text style={m.natureAxisTxt}>+ ▸{'\n'}▾ −</Text></View>
                        {NATURE_STATS.map(st => (
                          <View key={st} style={m.natureHeadCell}><Text style={m.natureHeadTxt}>+{NATURE_STAT_LABELS[st]}</Text></View>
                        ))}
                      </View>
                      {NATURE_CHART.map((row, ri) => (
                        <View key={ri} style={m.natureRow}>
                          <View style={m.natureHeadCell}><Text style={m.natureHeadTxt}>−{NATURE_STAT_LABELS[NATURE_STATS[ri]]}</Text></View>
                          {row.map((nat, ci) => {
                            const active = editingPokemon.nature === nat;
                            const neutral = ri === ci;
                            return (
                              <TouchableOpacity
                                key={nat}
                                style={[m.natureCell, neutral && m.natureCellNeutral, active && m.natureCellActive]}
                                onPress={() => { setEditingPokemon({ ...editingPokemon, nature: nat }); setNatureOpen(false); }}
                              >
                                <Text style={[m.natureCellTxt, active && { color: '#0F172A' }]} numberOfLines={1}>{nat}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Two-column body on phones: info on the left, moves on the right */}
                  <View style={compactUi ? m.bodyCols : undefined}>
                  <View style={compactUi ? m.bodyCol : m.bodyColStack}>

                  {/* Level & Item */}
                  <View style={m.formGrid}>
                    <View style={m.formField}>
                      <Text style={m.fieldLabel}>LEVEL</Text>
                      <TextInput
                        style={[m.input, compactUi && m.inputCompact]}
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
                        style={[m.input, compactUi && m.inputCompact]}
                        value={editingPokemon.heldItem || ''}
                        placeholder="e.g. Leftovers"
                        placeholderTextColor="#475569"
                        onChangeText={(v) => setEditingPokemon({ ...editingPokemon, heldItem: v })}
                      />
                    </View>
                  </View>


                  {/* Nature summary (choose via the Nature chip / chart above) */}
                  <View style={m.formField}>
                    <Text style={m.fieldLabel}>NATURE</Text>
                    <Text style={{ color: '#94A3B8', fontSize: 11, fontWeight: '600' }}>
                      {editingPokemon.nature ? natureSummary(editingPokemon.nature) : 'Random (pick from the Nature ▾ chart above)'}
                    </Text>
                  </View>

                  </View>{/* end left column */}

                  {/* Moves (right column) */}
                  <View style={compactUi ? m.bodyCol : m.bodyColStack}>
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
                            style={[m.moveSlot, compactUi && m.moveSlotCompact, move && { borderColor: typeColor + '88' }]}
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

                  </View>{/* end right column */}
                  </View>{/* end two-column body */}
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
  root: { flex: 1, backgroundColor: COLORS.bg },

  tabsWrap: { paddingHorizontal: 12, paddingVertical: 8 },

  content: { flex: 1 },
  tabScroll: { padding: 14, gap: 12 },
  tabScrollNarrow: { padding: 12, gap: 10 },

  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 8, paddingBottom: 8 },
  panelTitle: { color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  btnSecondary: { backgroundColor: 'rgba(139,92,246,0.15)', borderWidth: 1.5, borderColor: COLORS.purple, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9 },
  btnSecondaryTxt: { color: COLORS.purple, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingBottom: 8, justifyContent: 'center' },

  opponentRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  opponentCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 2, borderColor: COLORS.border, padding: 14, alignItems: 'center', gap: 5, position: 'relative', overflow: 'hidden' },
  opponentCardNarrow: { padding: 12, borderRadius: 12, gap: 4 },
  opponentCardActive: { borderColor: COLORS.cyan, backgroundColor: 'rgba(0,195,227,0.06)' },
  opponentIcon: { fontSize: 26 },
  opponentIconNarrow: { fontSize: 24 },
  opponentLabel: { color: COLORS.textDim, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  opponentLabelActive: { color: COLORS.cyan },
  opponentDesc: { color: COLORS.textFaint, fontSize: 10, fontWeight: '500', textAlign: 'center' },
  opponentCheck: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.cyan, alignItems: 'center', justifyContent: 'center' },
  opponentCheckTxt: { color: COLORS.cardAlt, fontSize: 11, fontWeight: '700' },

  presetCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 12, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border, marginBottom: 8 },
  presetCardActive: { borderColor: COLORS.red, backgroundColor: 'rgba(255,69,84,0.06)' },
  presetName: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  presetSub: { color: COLORS.textMuted, fontSize: 11, fontWeight: '500', marginTop: 3 },
  presetCheckBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.red, alignItems: 'center', justifyContent: 'center' },
  presetCheckTxt: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  emptyHint: { color: COLORS.textFaint, fontStyle: 'italic', textAlign: 'center', padding: 20 },

  diffGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  diffCard: { flex: 1, minWidth: '46%', backgroundColor: COLORS.card, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', gap: 5, position: 'relative', overflow: 'hidden' },
  // Short landscape: all four in one row, tighter padding
  diffCardCompact: { minWidth: '22%', padding: 12, borderRadius: 12 },
  // Narrow portrait: keep two columns but trim padding so cards aren't oversized
  diffCardNarrow: { padding: 12, borderRadius: 12 },
  diffIcon: { fontSize: 26 },
  diffLabel: { color: COLORS.textDim, fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  diffDesc: { color: COLORS.textFaint, fontSize: 10, fontWeight: '500', textAlign: 'center' },
  diffCheck: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  diffCheckTxt: { color: '#FFF', fontSize: 11, fontWeight: '700' },

  // Compact footer: summary on the left, normal-sized CTA on the right.
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    paddingTop: 8, paddingHorizontal: 14,
    backgroundColor: COLORS.panel, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  footerInfo: { flex: 1 },
  footerLabel: { color: COLORS.textFaint, fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
  footerValue: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginTop: 2 },
});

// ─── Edit Modal Styles ────────────────────────────────────────────────────────
const m = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  sheet: { backgroundColor: '#0D1525', borderRadius: 18, borderWidth: 1.5, borderColor: '#1E293B', width: '100%', maxWidth: 660, maxHeight: '92%', alignSelf: 'center' },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1E293B',
  },
  sheetTitle: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  randomBtn: { backgroundColor: 'rgba(0,195,227,0.12)', borderWidth: 1, borderColor: '#00C3E3', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  randomBtnTxt: { color: '#00C3E3', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  closeBtnTxt: { color: '#94A3B8', fontSize: 14, fontWeight: '700' },
  editBody: { padding: 20, gap: 20 },
  editBodyCompact: { padding: 14, gap: 12 },
  // Two-column body for landscape phones: shorter, wider modal.
  bodyCols: { flexDirection: 'row', gap: 16 },
  bodyCol: { flex: 1, gap: 12 },
  bodyColStack: { gap: 20 },

  emptyState: { alignItems: 'center', paddingVertical: 18, gap: 6 },
  emptyStateEmoji: { fontSize: 30 },
  emptyStateTitle: { color: '#F8FAFC', fontSize: 15, fontWeight: '700' },
  emptyStateDesc: { color: '#64748B', fontSize: 11, fontWeight: '500' },
  pickBtn: { backgroundColor: '#00C3E3', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 10, marginTop: 4 },
  pickBtnTxt: { color: '#0F172A', fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },

  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroRowCompact: { gap: 12 },
  heroSprite: { width: 100, height: 100, backgroundColor: '#111827', borderRadius: 16, borderWidth: 1.5, borderColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  heroSpriteCompact: { width: 64, height: 64, borderRadius: 12 },
  heroImg: { width: 90, height: 90 },
  heroImgCompact: { width: 56, height: 56 },
  heroName: { color: '#F8FAFC', fontSize: 22, fontWeight: '700' },
  heroNameCompact: { fontSize: 16 },
  typePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typePillTxt: { color: '#FFF', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  changeSpeciesBtn: { backgroundColor: 'rgba(0,195,227,0.12)', borderWidth: 1, borderColor: '#00C3E3', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  changeSpeciesTxt: { color: '#00C3E3', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  heroControls: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  heroChip: { backgroundColor: 'rgba(148,163,184,0.1)', borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  heroChipActive: { borderColor: '#00C3E3', backgroundColor: 'rgba(0,195,227,0.12)' },
  heroChipTxt: { color: '#E2E8F0', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  // Clean dropdown menu card (ability)
  dropdownMenu: { alignSelf: 'flex-start', minWidth: 160, marginTop: 8, backgroundColor: '#0B1220', borderWidth: 1, borderColor: '#334155', borderRadius: 10, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  dropdownItemActive: { backgroundColor: 'rgba(0,195,227,0.1)' },
  dropdownItemTxt: { color: '#E2E8F0', fontSize: 12, fontWeight: '600' },

  // Nature chart grid
  natureChart: { marginTop: 8, borderWidth: 1, borderColor: '#1E293B', borderRadius: 10, overflow: 'hidden', backgroundColor: '#0B1220' },
  natureRow: { flexDirection: 'row' },
  natureCorner: { flex: 1.1, paddingVertical: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1525' },
  natureAxisTxt: { color: '#64748B', fontSize: 7, fontWeight: '700', textAlign: 'center' },
  natureHeadCell: { flex: 1.1, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1525', borderWidth: 0.5, borderColor: '#1E293B' },
  natureHeadTxt: { color: '#94A3B8', fontSize: 8, fontWeight: '800', letterSpacing: 0.3 },
  natureCell: { flex: 1, paddingVertical: 7, paddingHorizontal: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: '#1E293B' },
  natureCellNeutral: { backgroundColor: 'rgba(100,116,139,0.12)' },
  natureCellActive: { backgroundColor: '#00C3E3' },
  natureCellTxt: { color: '#CBD5E1', fontSize: 8, fontWeight: '600' },

  formGrid: { flexDirection: 'row', gap: 12 },
  formField: { flex: 1 },
  fieldLabel: { color: '#475569', fontSize: 9, fontWeight: '700', letterSpacing: 2, marginBottom: 6 },
  input: { backgroundColor: '#111827', color: '#F8FAFC', padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#1E293B', fontSize: 14, fontWeight: '600' },
  inputCompact: { padding: 10, borderRadius: 10, fontSize: 13 },

  abilityPillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  abilityPill: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 9, borderWidth: 1.5, borderColor: '#1E293B', backgroundColor: '#111827' },
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
  moveSlotCompact: { minHeight: 54, borderRadius: 10 },
  moveSlotAccent: { width: 4 },
  moveSlotContent: { flex: 1, padding: 12, justifyContent: 'space-between' },
  emptyMoveTxt: { color: '#334155', fontSize: 12, fontWeight: '500', fontStyle: 'italic', flex: 1, textAlign: 'center', textAlignVertical: 'center', padding: 12 },
  moveName: { color: '#F8FAFC', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  moveBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  moveBadgeTxt: { color: '#FFF', fontSize: 8, fontWeight: '700' },
  moveCatBadge: { backgroundColor: '#1E293B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  moveCatBadgeTxt: { color: '#64748B', fontSize: 8, fontWeight: '700' },

  footer: { paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#1E293B' },
  saveBtn: { backgroundColor: '#00C3E3', paddingVertical: 11, borderRadius: 12, alignItems: 'center' },
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
