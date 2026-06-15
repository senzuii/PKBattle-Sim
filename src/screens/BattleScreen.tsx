import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { BattlePokemon, Move, WeatherKind, NonVolatileStatus } from '../types/Pokemon';
import { HazardLayers, ScreenLayers } from '../engine/battle/Field';
import { RootStackParamList } from '../types/Navigation';
import { FrontSprites, BackSprites } from '../assets/Sprites';

// ─── Responsive sizing ──────────────────────────────────────────────────────
interface Sizes {
  compact: boolean;
  enemySprite: number;
  playerSprite: number;
  hudMinWidth: number;
  hudFont: number;
  hudNameFont: number;
  moveBtnMinHeight: number;
  moveBtnPadding: number;
  moveMetaFont: number;
  moveNameFont: number;
  actionRowHeight: number;
  logFont: number;
  topBarFont: number;
  switchCardWidth: string;
  arenaFlex: number;
  controlsFlex: number;
}

const getSizes = (compact: boolean): Sizes => compact
  ? {
      compact: true,
      enemySprite: 76,
      playerSprite: 90,
      hudMinWidth: 120,
      hudFont: 9,
      hudNameFont: 11,
      moveBtnMinHeight: 34,
      moveBtnPadding: 5,
      moveMetaFont: 8,
      moveNameFont: 10,
      actionRowHeight: 24,
      logFont: 9,
      topBarFont: 9,
      switchCardWidth: '48%',
      arenaFlex: 5,
      controlsFlex: 5,
    }
  : {
      compact: false,
      enemySprite: 110,
      playerSprite: 130,
      hudMinWidth: 150,
      hudFont: 10,
      hudNameFont: 13,
      moveBtnMinHeight: 56,
      moveBtnPadding: 8,
      moveMetaFont: 9,
      moveNameFont: 13,
      actionRowHeight: 40,
      logFont: 10,
      topBarFont: 11,
      switchCardWidth: '31%',
      arenaFlex: 6,
      controlsFlex: 4,
    };

// ─── Popups ───────────────────────────────────────────────────────────────────
interface PopupData {
  id: string;
  text: string;
  target: 'player' | 'opponent';
  type: 'super' | 'weak' | 'miss' | 'stat' | 'immune' | 'damage' | 'heal' | 'status';
  color?: string;
}

const PopupAnimation: React.FC<{ popup: PopupData; onComplete: (id: string) => void }> = ({ popup, onComplete }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous float up
    Animated.timing(floatAnim, { toValue: 1, duration: 1800, useNativeDriver: true }).start();

    // Fade in, hold, fade out
    Animated.sequence([
      Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onComplete(popup.id));
  }, []);

  const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [10, -50] });
  const opacity = opacityAnim;

  const colors: Record<PopupData['type'], string> = {
    super: '#10B981', weak: '#F59E0B', miss: '#94A3B8', stat: '#3B82F6', immune: '#64748B',
    damage: '#F87171', heal: '#4ADE80', status: '#A855F7',
  };

  return (
    <Animated.View style={[popS.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={[popS.text, { color: popup.color ?? colors[popup.type] }]}>{popup.text}</Text>
    </Animated.View>
  );
};
const popS = StyleSheet.create({
  container: { position: 'absolute', top: -30, alignSelf: 'center', backgroundColor: 'rgba(15,23,42,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1.5, borderColor: '#334155', zIndex: 100 },
  text: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
});

// ─── Timing constants ─────────────────────────────────────────────────────────
const LOG_STEP_DELAY  = 450;   // pause before non-HP log lines appear
const HP_LOG_DELAY    = 300;   // pause before an HP-change log line appears
const LOG_READ_DELAY  = 220;   // pause after log appears, before HP bar moves
const HP_ANIM_WAIT    = 650;   // time for the HP bar animation to finish
const POST_TURN_DELAY = 500;
const LOG_FADE_MS     = 280;
const FAINT_ANIM_MS   = 700;
const SWITCH_IN_MS    = 500;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isHPChangeLog = (line: string) =>
  (line.includes('took') && line.includes('damage')) ||
  line.includes('hurt by') ||
  line.includes('sapped by') ||
  (line.includes('lost') && line.includes('HP')) ||
  line.includes('recovered HP') ||
  line.includes('restored its HP') ||
  line.includes('hit with recoil');

// Maps a "<name> was burned!" style log line suffix to the inflicted status.
const STATUS_LOG_PATTERNS: { match: string; status: NonVolatileStatus }[] = [
  { match: 'was badly poisoned', status: 'Toxic' },
  { match: 'was poisoned', status: 'Poison' },
  { match: 'was burned', status: 'Burn' },
  { match: 'was frozen solid', status: 'Freeze' },
  { match: 'is paralyzed', status: 'Paralysis' },
  { match: 'fell asleep', status: 'Sleep' },
];

const detectInflictedStatus = (line: string): NonVolatileStatus | null => {
  for (const { match, status } of STATUS_LOG_PATTERNS) {
    if (line.includes(match)) return status;
  }
  return null;
};

const hurtOpponent = (line: string, name: string) =>
  isHPChangeLog(line) && line.startsWith(name);

const hurtPlayer = (line: string, name: string) =>
  isHPChangeLog(line) && line.startsWith(name);

const TYPE_COLORS: Record<string, string> = {
  Grass: '#4CAF50', Fire: '#FF5722', Water: '#2196F3', Poison: '#9C27B0',
  Normal: '#9E9E9E', Electric: '#FFC107', Psychic: '#E91E63', Ice: '#00BCD4',
  Dragon: '#673AB7', Dark: '#37474F', Steel: '#607D8B', Fighting: '#795548',
  Rock: '#8D6E63', Ground: '#FF8F00', Bug: '#8BC34A', Ghost: '#7E57C2',
  Flying: '#42A5F5', Fairy: '#F06292',
};

const STATUS_COLORS: Record<string, string> = {
  Burn: '#EF4444', Freeze: '#06B6D4', Paralysis: '#F59E0B',
  Poison: '#A855F7', Toxic: '#7E22CE', Sleep: '#64748B'
};

const WEATHER_ICONS: Record<WeatherKind, string> = {
  Sun: '☀', Rain: '🌧', Sandstorm: '🌪', Hail: '❄',
};

const CATEGORY_GLYPH: Record<string, string> = {
  Physical: '⚔', Special: '✦', Status: '◆',
};

// ─── Pokéball party indicator ──────────────────────────────────────────────────
const Pokeball: React.FC<{ state: 'active' | 'alive' | 'fainted'; color: string; size: number }> = ({ state, color, size }) => {
  const topColor    = state === 'fainted' ? '#475569' : color;
  const bottomColor = state === 'fainted' ? '#1E293B' : '#F8FAFC';
  return (
    <View style={[pbS.ball, {
      width: size, height: size, borderRadius: size / 2,
      borderColor: state === 'active' ? '#FFF' : '#0F172A',
      borderWidth: state === 'active' ? 2 : 1,
    }]}>
      <View style={{ flex: 1, backgroundColor: topColor }} />
      <View style={{ flex: 1, backgroundColor: bottomColor }} />
      <View style={[pbS.band, { backgroundColor: '#0F172A' }]} />
      <View style={[pbS.center, {
        width: size * 0.36, height: size * 0.36, borderRadius: size * 0.18,
        marginTop: -(size * 0.18), marginLeft: -(size * 0.18),
        backgroundColor: bottomColor, borderColor: '#0F172A',
      }]} />
    </View>
  );
};
const pbS = StyleSheet.create({
  ball:   { overflow: 'hidden', flexDirection: 'column' },
  band:   { position: 'absolute', top: '50%', left: 0, right: 0, height: 1.5, marginTop: -0.75 },
  center: { position: 'absolute', top: '50%', left: '50%', borderWidth: 1 },
});

const PartyIndicator: React.FC<{ team: BattlePokemon[]; activeIdx: number; color: string; size?: number }> = ({ team, activeIdx, color, size = 12 }) => (
  <View style={piS.row}>
    {team.map((p, i) => (
      <Pokeball key={i} size={size} color={color} state={p.currentHp > 0 ? (i === activeIdx ? 'active' : 'alive') : 'fainted'} />
    ))}
  </View>
);
const piS = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4, marginTop: 4 },
});

// ─── Field banner (weather + hazards) ──────────────────────────────────────────
const HazardChips: React.FC<{ hazards: HazardLayers; screens: ScreenLayers }> = ({ hazards, screens }) => {
  const chips: string[] = [];
  if (hazards.stealthRock) chips.push('🪨');
  if (hazards.spikes > 0) chips.push('📌'.repeat(hazards.spikes));
  if (hazards.toxicSpikes > 0) chips.push('☠'.repeat(hazards.toxicSpikes));
  if (screens.reflect > 0) chips.push('🛡');
  if (screens.lightScreen > 0) chips.push('✨');
  if (chips.length === 0) return null;
  return <Text style={fbS.hazardTxt}>{chips.join(' ')}</Text>;
};

const FieldBanner: React.FC<{
  weather?: { kind: WeatherKind; turnsLeft: number };
  playerHazards: HazardLayers;
  opponentHazards: HazardLayers;
  playerScreens: ScreenLayers;
  opponentScreens: ScreenLayers;
  fontSize: number;
}> = ({ weather, playerHazards, opponentHazards, playerScreens, opponentScreens, fontSize }) => (
  <View style={fbS.wrap}>
    <HazardChips hazards={playerHazards} screens={playerScreens} />
    {weather && (
      <View style={fbS.weatherChip}>
        <Text style={[fbS.weatherTxt, { fontSize: fontSize + 2 }]}>{WEATHER_ICONS[weather.kind]}</Text>
        <Text style={[fbS.weatherLabel, { fontSize }]}>{weather.kind.toUpperCase()}</Text>
      </View>
    )}
    <HazardChips hazards={opponentHazards} screens={opponentScreens} />
  </View>
);
const fbS = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', flex: 1 },
  weatherChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: '#334155' },
  weatherTxt: { color: '#E2E8F0' },
  weatherLabel: { color: '#94A3B8', fontWeight: '800', letterSpacing: 1 },
  hazardTxt: { fontSize: 11 },
});

// ─── Top scoreboard bar ─────────────────────────────────────────────────────────
const TopBar: React.FC<{
  turnCount: number;
  totalTimer: number;
  turnTimer: number;
  fmtTime: (s: number) => string;
  weather?: { kind: WeatherKind; turnsLeft: number };
  playerHazards: HazardLayers;
  opponentHazards: HazardLayers;
  playerScreens: ScreenLayers;
  opponentScreens: ScreenLayers;
  sizes: Sizes;
}> = ({ turnCount, totalTimer, turnTimer, fmtTime, weather, playerHazards, opponentHazards, playerScreens, opponentScreens, sizes }) => (
  <View style={[tbS.bar, { paddingVertical: sizes.compact ? 3 : 5 }]}>
    <View style={tbS.turnBadge}>
      <Text style={[tbS.turnTxt, { fontSize: sizes.topBarFont }]}>TURN {turnCount}</Text>
    </View>
    <FieldBanner weather={weather} playerHazards={playerHazards} opponentHazards={opponentHazards} playerScreens={playerScreens} opponentScreens={opponentScreens} fontSize={sizes.topBarFont} />
    <View style={tbS.timers}>
      <Text style={[tbS.timeTxt, { fontSize: sizes.topBarFont }]}>⏱ {fmtTime(turnTimer)}</Text>
      <Text style={[tbS.timeTxt, { fontSize: sizes.topBarFont, color: '#475569' }]}>·</Text>
      <Text style={[tbS.timeTxt, { fontSize: sizes.topBarFont }]}>{fmtTime(totalTimer)}</Text>
    </View>
  </View>
);
const tbS = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, backgroundColor: '#0f172a', borderBottomWidth: 2, borderBottomColor: '#334155' },
  turnBadge: { backgroundColor: '#1E293B', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: '#334155' },
  turnTxt: { color: '#F59E0B', fontWeight: '900', letterSpacing: 1 },
  timers: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeTxt: { color: '#94A3B8', fontWeight: '700', fontFamily: 'monospace' },
});

// ─── Animated HP bar fill ───────────────────────────────────────────────────────
// `pct` is the raw current/max ratio (0-1); a sliver stays visible at low-but-alive HP.
const AnimatedHpFill: React.FC<{ pct: number; color: string; style: object }> = ({ pct, color, style }) => {
  const displayPct = pct > 0 ? Math.max(pct, 0.02) : 0;
  const anim = useRef(new Animated.Value(displayPct)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: displayPct, duration: HP_ANIM_WAIT, useNativeDriver: false }).start();
  }, [displayPct]);
  return (
    <Animated.View style={[
      style,
      {
        width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
        backgroundColor: color,
      },
    ]} />
  );
};

// ─── Animated log line ────────────────────────────────────────────────────────
const AnimatedLogLine: React.FC<{ text: string; textStyle: object; isNew: boolean }> = ({ text, textStyle, isNew }) => {
  const opacity = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  useEffect(() => {
    if (isNew)
      Animated.timing(opacity, { toValue: 1, duration: LOG_FADE_MS, useNativeDriver: true }).start();
  }, []);
  return <Animated.Text style={[textStyle, { opacity }]}>{text}</Animated.Text>;
};

const STATUS_ABBR: Record<string, string> = {
  Burn: 'BRN', Freeze: 'FRZ', Paralysis: 'PAR',
  Poison: 'PSN', Toxic: 'TOX', Sleep: 'SLP'
};

// ─── Battle info card ─────────────────────────────────────────────────────────
const BattleInfoCard: React.FC<{
  pokemon: BattlePokemon;
  isPlayer: boolean;
  team: BattlePokemon[];
  activeIdx: number;
  sizes: Sizes;
}> = ({ pokemon, isPlayer, team, activeIdx, sizes }) => {
  const hpPct = pokemon.maxHp > 0 ? Math.max(0, pokemon.currentHp / pokemon.maxHp) : 0;
  const hpColor = hpPct > 0.5 ? '#4ade80' : hpPct > 0.2 ? '#facc15' : '#f87171';
  const hasStats = Object.values(pokemon.statStages).some(s => s !== 0) || pokemon.volatileStatuses.includes('Confusion');
  const accentColor = isPlayer ? '#00C3E3' : '#FF4554';

  return (
    <View style={[cS.hud, { minWidth: sizes.hudMinWidth }, isPlayer ? cS.playerHud : cS.opponentHud]}>
      <View style={[cS.accentBar, { backgroundColor: accentColor }]} />
      <View style={cS.body}>
        <View style={cS.nameRow}>
          <Text style={[cS.name, { fontSize: sizes.hudNameFont }]} numberOfLines={1}>{pokemon.name}</Text>
          <Text style={[cS.level, { fontSize: sizes.hudFont + 1 }]}>Lv{pokemon.level}</Text>
          {pokemon.status && (
            <View style={[cS.statusBadge, { backgroundColor: STATUS_COLORS[pokemon.status] ?? '#64748B' }]}>
              <Text style={cS.statusTxt}>{STATUS_ABBR[pokemon.status] ?? pokemon.status}</Text>
            </View>
          )}
        </View>
        <View style={cS.hpContainer}>
          <View style={cS.hpTrack}>
            <AnimatedHpFill pct={hpPct} color={hpColor} style={cS.hpFill} />
            <View style={[cS.hpTick, { left: '50%' }]} />
            <View style={[cS.hpTick, { left: '20%' }]} />
          </View>
          <Text style={[cS.hpText, { fontSize: sizes.hudFont }]}>{hpPct > 0 ? Math.max(1, Math.floor(hpPct * 100)) : 0}% {isPlayer ? `(${Math.max(0, Math.floor(pokemon.currentHp))}/${pokemon.maxHp})` : ''}</Text>
        </View>
        {hasStats && (
          <View style={cS.statsContainer}>
            {pokemon.volatileStatuses.includes('Confusion') && (
              <View style={[cS.statBadge, { borderColor: '#64748B', backgroundColor: '#64748B1A' }]}>
                <Text style={[cS.statTxt, { color: '#94A3B8' }]}>CNF</Text>
              </View>
            )}
            {Object.entries(pokemon.statStages).map(([stat, stage]) => {
              if (stage === 0) return null;
              const statName = stat.substring(0, 3).toUpperCase();
              const sign = stage > 0 ? '+' : '';
              const color = stage > 0 ? '#10B981' : '#EF4444';
              return (
                <View key={stat} style={[cS.statBadge, { borderColor: color, backgroundColor: `${color}1A` }]}>
                  <Text style={[cS.statTxt, { color }]}>{statName} {sign}{stage}</Text>
                </View>
              );
            })}
          </View>
        )}
        <PartyIndicator team={team} activeIdx={activeIdx} color={accentColor} size={sizes.compact ? 9 : 12} />
      </View>
    </View>
  );
};
const cS = StyleSheet.create({
  hud: { flexDirection: 'row', backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#334155' },
  accentBar: { width: 4 },
  body: { flex: 1, padding: 6 },
  playerHud: { alignSelf: 'center', marginBottom: 10 },
  opponentHud: { alignSelf: 'center', marginBottom: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { color: '#F8FAFC', fontWeight: '800', marginRight: 6, letterSpacing: 0.3 },
  level: { color: '#94A3B8', fontWeight: '600', marginRight: 6 },
  statusBadge: { paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3 },
  statusTxt: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  hpContainer: { flexDirection: 'row', alignItems: 'center' },
  hpTrack: { flex: 1, height: 6, backgroundColor: '#475569', borderRadius: 3, overflow: 'hidden', marginRight: 6, position: 'relative' },
  hpFill: { height: '100%', borderRadius: 3 },
  hpTick: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(15,23,42,0.5)' },
  hpText: { color: '#CBD5E1', fontWeight: '600' },
  statsContainer: { flexDirection: 'row', gap: 4, marginTop: 4, flexWrap: 'wrap' },
  statBadge: { paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3, borderWidth: 1 },
  statTxt: { fontSize: 8, fontWeight: 'bold' },
});

// ─── Team member mini-card for switch panel ───────────────────────────────────
const SwitchCard: React.FC<{
  pokemon: BattlePokemon;
  idx: number;
  isActive: boolean;
  onPress: () => void;
  cardWidth: string;
}> = ({ pokemon, idx, isActive, onPress, cardWidth }) => {
  const sprite = FrontSprites[pokemon.baseId.toLowerCase().replace(/[^a-z0-9]/g, '')];
  const hpPct = Math.max(0, pokemon.currentHp / pokemon.maxHp);
  const hpColor = hpPct > 0.5 ? '#4ade80' : hpPct > 0.2 ? '#facc15' : '#f87171';
  const fainted = pokemon.currentHp <= 0;
  const accentColor = isActive ? '#00C3E3' : fainted ? '#475569' : '#334155';
  return (
    <TouchableOpacity
      style={[swS.card, { width: cardWidth as any }, isActive && swS.activeCard, fainted && swS.faintedCard]}
      onPress={onPress}
      disabled={fainted || isActive}
    >
      <View style={[swS.accentBar, { backgroundColor: accentColor }]} />
      <View style={swS.body}>
        <View style={swS.topRow}>
          <View style={swS.spriteWrap}>
            {sprite && <Image source={sprite} style={swS.sprite} resizeMode="contain" />}
          </View>
          <View style={swS.info}>
            <View style={swS.nameRow}>
              <Text style={swS.name} numberOfLines={1}>{pokemon.name}</Text>
              <Text style={swS.level}>Lv{pokemon.level}</Text>
              {isActive && <View style={swS.activeBadge}><Text style={swS.activeBadgeTxt}>ON FIELD</Text></View>}
              {fainted  && <View style={swS.faintBadge}><Text style={swS.faintBadgeTxt}>FAINTED</Text></View>}
            </View>
            <View style={swS.hpRow}>
              <View style={swS.hpTrack}>
                <AnimatedHpFill pct={hpPct} color={hpColor} style={swS.hpFill} />
                <View style={[swS.hpTick, { left: '50%' }]} />
                <View style={[swS.hpTick, { left: '20%' }]} />
              </View>
              <Text style={swS.hp}>{Math.max(0, Math.floor(pokemon.currentHp))}/{pokemon.maxHp}</Text>
            </View>
          </View>
        </View>
        <View style={swS.movesRow}>
          {pokemon.moves.map(m => (
            <View key={m.id} style={[swS.moveBadge, { backgroundColor: TYPE_COLORS[m.type] ?? '#334155' }]}>
              <Text style={swS.moveTxt} numberOfLines={1}>{m.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const swS = StyleSheet.create({
  card:           { flexDirection: 'row', minWidth: 150, backgroundColor: 'rgba(30,41,59,0.9)', borderRadius: 10, marginVertical: 4, borderWidth: 1, borderColor: '#334155', overflow: 'hidden' },
  accentBar:      { width: 4 },
  body:           { flex: 1, padding: 8, gap: 8 },
  activeCard:     { borderColor: '#00C3E3' },
  faintedCard:    { opacity: 0.45 },
  topRow:         { flexDirection: 'row', alignItems: 'center', gap: 8 },
  spriteWrap:     { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(15,23,42,0.6)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  sprite:         { width: 36, height: 36 },
  info:           { flex: 1 },
  nameRow:        { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name:           { color: '#F8FAFC', fontWeight: '800', fontSize: 13, flexShrink: 1 },
  level:          { color: '#94A3B8', fontSize: 9, fontWeight: '700' },
  hpRow:          { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  hpTrack:        { flex: 1, height: 6, backgroundColor: '#475569', borderRadius: 3, overflow: 'hidden', position: 'relative' },
  hpFill:         { height: '100%', borderRadius: 3 },
  hpTick:         { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(15,23,42,0.5)' },
  hp:             { color: '#94A3B8', fontSize: 9, fontWeight: '700', fontFamily: 'monospace' },
  activeBadge:    { backgroundColor: '#00C3E3', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 'auto' },
  activeBadgeTxt: { color: '#0F172A', fontSize: 8, fontWeight: '900' },
  faintBadge:     { backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 'auto' },
  faintBadgeTxt:  { color: '#FFF', fontSize: 8, fontWeight: '900' },
  movesRow:       { flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' },
  moveBadge:      { flexBasis: '48%', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, alignItems: 'center' },
  moveTxt:        { color: '#FFF', fontSize: 8, fontWeight: '800', letterSpacing: 0.3 },
});

// ─── Move button ────────────────────────────────────────────────────────────
const MoveButton: React.FC<{
  move: Move;
  isSelected: boolean;
  isLockedOut: boolean;
  disabled: boolean;
  sizes: Sizes;
  onPress: () => void;
}> = ({ move, isSelected, isLockedOut, disabled, sizes, onPress }) => {
  const tc = TYPE_COLORS[move.type] ?? '#6B7280';
  const pp = move.currentPp ?? move.pp;
  const ppPct = move.pp > 0 ? pp / move.pp : 0;
  const ppColor = ppPct > 0.5 ? '#10B981' : ppPct > 0.2 ? '#F59E0B' : '#EF4444';
  return (
    <TouchableOpacity
      disabled={disabled || isLockedOut}
      style={[mbS.btn, { minHeight: sizes.moveBtnMinHeight, padding: sizes.moveBtnPadding, backgroundColor: tc, opacity: isLockedOut ? 0.3 : 1 }, isSelected && mbS.btnSelected]}
      onPress={onPress}
    >
      <View style={mbS.topRow}>
        <Text style={[mbS.name, { fontSize: sizes.moveNameFont }]} numberOfLines={1}>{move.name}</Text>
        <Text style={[mbS.catGlyph, { fontSize: sizes.moveMetaFont + 3 }]}>{CATEGORY_GLYPH[move.category] ?? ''}</Text>
      </View>
      <View style={mbS.bottomRow}>
        <View style={mbS.typePill}>
          <Text style={[mbS.typeTxt, { fontSize: sizes.moveMetaFont }]}>{move.type.toUpperCase()}</Text>
        </View>
        <View style={mbS.ppWrap}>
          <Text style={[mbS.ppTxt, { fontSize: sizes.moveMetaFont }]}>PP {pp}/{move.pp}</Text>
          <View style={mbS.ppTrack}>
            <View style={[mbS.ppFill, { width: `${Math.max(0, ppPct) * 100}%`, backgroundColor: ppColor }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const mbS = StyleSheet.create({
  btn:       { flexBasis: '48%', flexGrow: 1, borderRadius: 8, padding: 8, justifyContent: 'space-between', elevation: 2, borderWidth: 2, borderColor: 'rgba(0,0,0,0.2)' },
  btnSelected: { borderColor: '#FFF', borderWidth: 2 },
  topRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name:      { color: '#FFF', fontWeight: '900', flex: 1, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 },
  catGlyph:  { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '800', marginLeft: 4 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, gap: 6 },
  typePill:  { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  typeTxt:   { color: '#FFF', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  ppWrap:    { flex: 1, alignItems: 'flex-end' },
  ppTxt:     { color: '#FFF', fontSize: 9, fontWeight: '700', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 },
  ppTrack:   { width: '100%', height: 3, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 2, marginTop: 2, overflow: 'hidden' },
  ppFill:    { height: '100%', borderRadius: 2 },
});

// ─── Main Component ───────────────────────────────────────────────────────────
export const BattleScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    playerPokemon, opponentPokemon, logs, turnCount, difficulty, gameState,
    prepareTurn, prepareSwitchTurn, applyPendingTurn, resetBattle,
    playerBattleTeam, opponentBattleTeam, playerActiveIdx, opponentActiveIdx,
    sendOutPlayerPokemon, field,
  } = useBattleStore();

  const { height: winHeight } = useWindowDimensions();
  const sizes = getSizes(winHeight < 500);

  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null);
  const [isSwitchModalVisible, setSwitchModalVisible] = useState(false);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [visibleLogs, setVisibleLogs]       = useState<string[]>(logs);
  const [newFromIdx, setNewFromIdx]         = useState<number>(logs.length);
  const [displayPlayer, setDisplayPlayer]   = useState<BattlePokemon | null>(playerPokemon);
  const [displayOpp, setDisplayOpp]         = useState<BattlePokemon | null>(opponentPokemon);
  const [popups, setPopups]                 = useState<PopupData[]>([]);
  const [totalTimer, setTotalTimer]         = useState(0);
  const [turnTimer, setTurnTimer]           = useState(0);

  // Sprite animation values
  const playerSpriteOpacity  = useRef(new Animated.Value(1)).current;
  const playerSpriteX        = useRef(new Animated.Value(0)).current;
  const oppSpriteOpacity     = useRef(new Animated.Value(1)).current;
  const oppSpriteX           = useRef(new Animated.Value(0)).current;

  const scrollRef        = useRef<ScrollView>(null);
  const cancelRef        = useRef(false);
  const totalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const turnIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastOpponentIdRef = useRef<string | null>(null);
  const isAnimatingRef   = useRef(false);

  // Timers
  useEffect(() => {
    totalIntervalRef.current = setInterval(() => setTotalTimer(t => t + 1), 1000);
    return () => { if (totalIntervalRef.current) clearInterval(totalIntervalRef.current); };
  }, []);

  useEffect(() => {
    setTurnTimer(0);
    if (turnIntervalRef.current) clearInterval(turnIntervalRef.current);
    if (gameState === 'battle' && !isAnimating) {
      turnIntervalRef.current = setInterval(() => setTurnTimer(t => t + 1), 1000);
    }
    return () => { if (turnIntervalRef.current) clearInterval(turnIntervalRef.current); };
  }, [turnCount, gameState, isAnimating]);

  // Sync display when not animating
  useEffect(() => {
    if (!isAnimating) { setDisplayPlayer(playerPokemon); setDisplayOpp(opponentPokemon); }
  }, [playerPokemon, opponentPokemon, isAnimating]);

  // Fix opponent sprite switch in
  useEffect(() => {
    if (opponentPokemon && opponentPokemon.id !== lastOpponentIdRef.current) {
      if (lastOpponentIdRef.current !== null) {
        // AI switched out / new opponent sent out
        animateSwitchIn('opponent');
      }
      lastOpponentIdRef.current = opponentPokemon.id;
    }
  }, [opponentPokemon?.id]);

  useEffect(() => {
    if (!isAnimating) { setVisibleLogs(logs); setNewFromIdx(logs.length); }
  }, [logs, isAnimating]);

  // Navigate to results
  useEffect(() => {
    if (gameState === 'results') navigation.navigate('Results');
  }, [gameState]);

  // Auto-scroll log
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  }, [visibleLogs]);

  // Reset switch modal when forced switch is resolved
  useEffect(() => {
    if (gameState === 'battle') setSwitchModalVisible(false);
  }, [gameState]);

  const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

  // ─── Sprite animations ────────────────────────────────────────────────────────
  const animateFaint = (target: 'player' | 'opponent') => new Promise<void>(resolve => {
    const opacityRef = target === 'player' ? playerSpriteOpacity : oppSpriteOpacity;
    const xRef       = target === 'player' ? playerSpriteX       : oppSpriteX;
    Animated.sequence([
      // Shake left-right
      Animated.sequence([
        Animated.timing(xRef, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(xRef, { toValue:  8, duration: 60, useNativeDriver: true }),
        Animated.timing(xRef, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(xRef, { toValue:  0, duration: 60, useNativeDriver: true }),
      ]),
      // Flash and fade
      Animated.timing(opacityRef, { toValue: 0.2, duration: 80, useNativeDriver: true }),
      Animated.timing(opacityRef, { toValue: 1,   duration: 80, useNativeDriver: true }),
      Animated.timing(opacityRef, { toValue: 0.2, duration: 80, useNativeDriver: true }),
      Animated.timing(opacityRef, { toValue: 1,   duration: 80, useNativeDriver: true }),
      // Final fade out downward
      Animated.timing(opacityRef, { toValue: 0, duration: FAINT_ANIM_MS, useNativeDriver: true }),
    ]).start(() => resolve());
  });

  const animateSwitchIn = (target: 'player' | 'opponent') => new Promise<void>(resolve => {
    const opacityRef = target === 'player' ? playerSpriteOpacity : oppSpriteOpacity;
    const xRef       = target === 'player' ? playerSpriteX       : oppSpriteX;
    const fromX      = target === 'player' ? -80 : 80;
    opacityRef.setValue(0);
    xRef.setValue(fromX);
    Animated.parallel([
      Animated.timing(opacityRef, { toValue: 1,   duration: SWITCH_IN_MS, useNativeDriver: true }),
      Animated.timing(xRef,       { toValue: 0,   duration: SWITCH_IN_MS, useNativeDriver: true }),
    ]).start(() => resolve());
  });

  const animateSwitchOut = (target: 'player' | 'opponent') => new Promise<void>(resolve => {
    const opacityRef = target === 'player' ? playerSpriteOpacity : oppSpriteOpacity;
    const xRef       = target === 'player' ? playerSpriteX       : oppSpriteX;
    const toX        = target === 'player' ? -120 : 120;
    Animated.parallel([
      Animated.timing(opacityRef, { toValue: 0,   duration: SWITCH_IN_MS, useNativeDriver: true }),
      Animated.timing(xRef,       { toValue: toX, duration: SWITCH_IN_MS, useNativeDriver: true }),
    ]).start(() => resolve());
  });

  // Animation sequence
  const runTurnAnimation = useCallback(async (action: { type: 'fight', moveId: string } | { type: 'switch', idx: number }) => {
    if (!playerPokemon || !opponentPokemon) return;
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    cancelRef.current = false;
    setIsAnimating(true);
    setSelectedMoveId(null);
    if (turnIntervalRef.current) clearInterval(turnIntervalRef.current);

    const result = action.type === 'switch' ? prepareSwitchTurn(action.idx) : prepareTurn(action.moveId);
    if (!result || cancelRef.current) { 
      setIsAnimating(false); 
      isAnimatingRef.current = false;
      return; 
    }

    const preTurnPlayer = { ...playerPokemon };
    const preTurnOpp    = { ...opponentPokemon };
    setDisplayPlayer(preTurnPlayer);
    setDisplayOpp(preTurnOpp);

    let runningPlayerHp = preTurnPlayer.currentHp;
    let runningOppHp    = preTurnOpp.currentHp;

    const baseLogs       = [...logs];
    const startIdx       = baseLogs.length;
    let currentVisible   = [...baseLogs];
    setNewFromIdx(startIdx);

    let lastDamagedTarget: 'player' | 'opponent' | null = null;
    let lastAttackedTarget: 'player' | 'opponent' | null = null;

    // Track the active Pokémon's name/maxHp for log matching — these change
    // mid-loop when a switch occurs (voluntary or after a faint).
    let currentPlayerName  = playerPokemon.name;
    let currentPlayerMaxHp = playerPokemon.maxHp;
    let currentOppName     = opponentPokemon.name;
    let currentOppMaxHp    = opponentPokemon.maxHp;

    for (let i = 0; i < result.logs.length; i++) {
      if (cancelRef.current) break;
      const line = result.logs[i];
      // HP-change lines get a shorter pre-pause (the bar moves *after* they appear)
      await sleep(isHPChangeLog(line) ? HP_LOG_DELAY : LOG_STEP_DELAY);
      if (cancelRef.current) break;

      currentVisible = [...currentVisible, line];
      setVisibleLogs([...currentVisible]);

      // Switch animation handling
      if (line.startsWith('You switched to ')) {
        await animateSwitchOut('player');
        // Show the incoming Pokémon's pre-turn state — entry hazard and
        // opponent-attack damage from `result.player` lands later via their
        // own log lines, animating the HP bar down instead of jumping to it.
        const incoming = action.type === 'switch'
          ? useBattleStore.getState().playerBattleTeam[action.idx]
          : result.player;
        setDisplayPlayer(incoming);
        runningPlayerHp = incoming.currentHp;
        currentPlayerName  = incoming.name;
        currentPlayerMaxHp = incoming.maxHp;
        await sleep(200);
        await animateSwitchIn('player');
        continue;
      }

      // Opponent sends out new Pokémon (after a faint)
      if (line.startsWith('Opponent sent out ')) {
        const freshOpp = useBattleStore.getState().opponentPokemon;
        if (freshOpp) {
          setDisplayOpp(freshOpp);
          runningOppHp = freshOpp.currentHp;
          currentOppName  = freshOpp.name;
          currentOppMaxHp = freshOpp.maxHp;
        }
        await animateSwitchIn('opponent');
        continue;
      }

      if (line.includes('used')) {
        const attackerIsPlayer = line.startsWith(currentPlayerName);
        lastAttackedTarget = attackerIsPlayer ? 'opponent' : 'player';
      }

      if (hurtOpponent(line, currentOppName)) lastDamagedTarget = 'opponent';
      else if (hurtPlayer(line, currentPlayerName)) lastDamagedTarget = 'player';

      let popupTarget: 'player' | 'opponent' | null = null;
      let popupText = '';
      let popupType: PopupData['type'] = 'stat';

      const lowerLine = line.toLowerCase();
      if (lowerLine.includes("it's super effective")) {
        popupTarget = lastDamagedTarget; popupText = 'SUPER EFFECTIVE'; popupType = 'super';
      } else if (lowerLine.includes("it's not very effective")) {
        popupTarget = lastDamagedTarget; popupText = 'NOT VERY EFFECTIVE'; popupType = 'weak';
      } else if (lowerLine.includes("has no effect")) {
        popupTarget = lastDamagedTarget; popupText = 'IMMUNE'; popupType = 'immune';
      } else if (lowerLine.includes("attack missed")) {
        popupTarget = lastAttackedTarget; popupText = 'MISSED!'; popupType = 'miss';
      } else if (lowerLine.includes("rose!") || lowerLine.includes("fell!") || lowerLine.includes("won't go any")) {
        popupTarget = line.startsWith(currentPlayerName) ? 'player' : 'opponent';
        const words = line.replace('!', '').split(' ');
        const sIndex = words.findIndex(w => w.includes("'s"));
        if (sIndex !== -1) {
          popupText = words.slice(sIndex + 1).join(' ').toUpperCase();
        } else {
          popupText = words.slice(1).join(' ').toUpperCase();
        }
        popupType = 'stat';
      }

      if (popupTarget && popupText) {
        const newPopup: PopupData = { id: Math.random().toString(), text: popupText, target: popupTarget, type: popupType };
        setPopups(prev => [...prev, newPopup]);
      }

      // ── Substitute: sync the doll sprite to the exact log line ──
      if (line.includes('put in a substitute')) {
        const isPlayer = line.startsWith(currentPlayerName);
        const cost = Math.floor((isPlayer ? currentPlayerMaxHp : currentOppMaxHp) / 4);
        if (isPlayer) {
          setDisplayPlayer(prev => prev ? { ...prev, substituteHp: cost } : prev);
        } else {
          setDisplayOpp(prev => prev ? { ...prev, substituteHp: cost } : prev);
        }
      } else if (line.includes("substitute broke")) {
        const isPlayer = line.startsWith(currentPlayerName);
        if (isPlayer) {
          setDisplayPlayer(prev => prev ? { ...prev, substituteHp: undefined } : prev);
        } else {
          setDisplayOpp(prev => prev ? { ...prev, substituteHp: undefined } : prev);
        }
      }

      // ── Transform: sync the sprite/appearance to the exact log line ──
      if (line.includes('transformed into')) {
        const isPlayer = line.startsWith(currentPlayerName);
        if (isPlayer) {
          const { baseId, name, types, moves } = result.player;
          setDisplayPlayer(prev => prev ? { ...prev, baseId, name, types, moves } : prev);
          currentPlayerName = name;
        } else {
          const { baseId, name, types, moves } = result.opponent;
          setDisplayOpp(prev => prev ? { ...prev, baseId, name, types, moves } : prev);
          currentOppName = name;
        }
      }

      // ── Status conditions: sync the HUD badge to the exact log line ──
      const inflictedStatus = detectInflictedStatus(line);
      if (inflictedStatus) {
        const statusTarget: 'player' | 'opponent' = line.startsWith(currentPlayerName) ? 'player' : 'opponent';
        if (statusTarget === 'opponent') {
          setDisplayOpp(prev => prev ? { ...prev, status: inflictedStatus } : prev);
        } else {
          setDisplayPlayer(prev => prev ? { ...prev, status: inflictedStatus } : prev);
        }
        setPopups(prev => [...prev, {
          id: Math.random().toString(),
          text: STATUS_ABBR[inflictedStatus] ?? inflictedStatus.toUpperCase(),
          target: statusTarget,
          type: 'status',
          color: STATUS_COLORS[inflictedStatus],
        }]);
      }

      if (isHPChangeLog(line)) {
        // ── Let the log line sit for a moment so the player can read it ──
        await sleep(LOG_READ_DELAY);
        if (cancelRef.current) break;

        // Now trigger the HP bar animation
        if (line.includes('restored its HP')) {
          // handled below by the recovered/restored block
        } else if (hurtOpponent(line, currentOppName)) {
          const before = runningOppHp;
          const match = line.match(/(?:took|lost) (\d+) (?:damage|HP)/i);
          if (match) {
            runningOppHp = Math.max(0, runningOppHp - parseInt(match[1], 10));
          } else {
            runningOppHp = result.opponent.currentHp;
          }
          setDisplayOpp(prev => prev ? { ...prev, currentHp: runningOppHp } : prev);
          const delta = before - runningOppHp;
          if (delta > 0) {
            const pct = Math.max(1, Math.round((delta / currentOppMaxHp) * 100));
            setPopups(prev => [...prev, { id: Math.random().toString(), text: `TOOK ${pct}% DMG`, target: 'opponent', type: 'damage' }]);
          }
        } else if (hurtPlayer(line, currentPlayerName)) {
          const before = runningPlayerHp;
          const match = line.match(/(?:took|lost) (\d+) (?:damage|HP)/i);
          if (match) {
            runningPlayerHp = Math.max(0, runningPlayerHp - parseInt(match[1], 10));
          } else {
            runningPlayerHp = result.player.currentHp;
          }
          setDisplayPlayer(prev => prev ? { ...prev, currentHp: runningPlayerHp } : prev);
          const delta = before - runningPlayerHp;
          if (delta > 0) {
            const pct = Math.max(1, Math.round((delta / currentPlayerMaxHp) * 100));
            setPopups(prev => [...prev, { id: Math.random().toString(), text: `TOOK ${pct}% DMG`, target: 'player', type: 'damage' }]);
          }
        }
        if (line.includes('recovered HP') || line.includes('restored its HP')) {
          if (line.startsWith(currentOppName + ' recovered') || line.startsWith(currentOppName + ' restored')) {
            const before = runningOppHp;
            runningOppHp = result.opponent.currentHp;
            setDisplayOpp(prev => prev ? { ...prev, currentHp: runningOppHp } : prev);
            const delta = runningOppHp - before;
            if (delta > 0) {
              const pct = Math.max(1, Math.round((delta / currentOppMaxHp) * 100));
              setPopups(prev => [...prev, { id: Math.random().toString(), text: `RESTORED ${pct}% HP`, target: 'opponent', type: 'heal' }]);
            }
          }
          if (line.startsWith(currentPlayerName + ' recovered') || line.startsWith(currentPlayerName + ' restored')) {
            const before = runningPlayerHp;
            runningPlayerHp = result.player.currentHp;
            setDisplayPlayer(prev => prev ? { ...prev, currentHp: runningPlayerHp } : prev);
            const delta = runningPlayerHp - before;
            if (delta > 0) {
              const pct = Math.max(1, Math.round((delta / currentPlayerMaxHp) * 100));
              setPopups(prev => [...prev, { id: Math.random().toString(), text: `RESTORED ${pct}% HP`, target: 'player', type: 'heal' }]);
            }
          }
        }
        await sleep(HP_ANIM_WAIT);
      }

      // Faint animations
      if (line.includes('fainted')) {
        if (line.startsWith(currentOppName)) {
          await animateFaint('opponent');
        } else if (line.startsWith(currentPlayerName)) {
          await animateFaint('player');
        }
      }
    }

    await sleep(POST_TURN_DELAY);
    if (!cancelRef.current) applyPendingTurn();
    setIsAnimating(false);
    isAnimatingRef.current = false;
  }, [playerPokemon, opponentPokemon, logs, prepareTurn, prepareSwitchTurn, applyPendingTurn]);

  // Auto-execute locked moves (e.g. Turn 2 of Fly)
  useEffect(() => {
    if (gameState === 'battle' && !isAnimating && playerPokemon?.lockedMove) {
      const timer = setTimeout(() => {
        runTurnAnimation({ type: 'fight', moveId: playerPokemon.lockedMove!.moveId });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState, isAnimating, playerPokemon?.lockedMove, runTurnAnimation]);

  // Handlers
  const handleFight = () => {
    if (selectedMoveId && !isAnimating) runTurnAnimation({ type: 'fight', moveId: selectedMoveId });
  };
  const handleFlee = () => {
    cancelRef.current = true;
    resetBattle();
    navigation.navigate('MainMenu');
  };
  const handleVoluntarySwitch = async (idx: number) => {
    setSwitchModalVisible(false);
    if (isAnimating) return;
    await runTurnAnimation({ type: 'switch', idx });
  };
  const handleForcedSwitch = async (idx: number) => {
    sendOutPlayerPokemon(idx);
    await sleep(200);
    await animateSwitchIn('player');
  };

  // Log styling
  const getLogStyle = (line: string) => {
    if (line.includes('TURN'))                              return logS.turn;
    if (line.includes('used'))                             return logS.move;
    if (line.includes('super effective'))                  return logS.super;
    if (line.includes('not very'))                         return logS.weak;
    if (line.includes('fainted') || line.includes('Lost')) return logS.faint;
    if (line.includes('Win') || line.includes('sent out')) return logS.event;
    if (line.startsWith('---') || line.startsWith('===')) return logS.divider;
    if (isHPChangeLog(line) || line.includes('recovered HP')) return logS.damage;
    return logS.normal;
  };

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ── Error state ───────────────────────────────────────────────────────────────
  if (!playerPokemon || !opponentPokemon) {
    return (
      <View style={s.errorWrap}>
        <Text style={s.errorTxt}>No active battle found.</Text>
        <TouchableOpacity onPress={() => { resetBattle(); navigation.navigate('Setup'); }} style={s.errorBtn}>
          <Text style={s.errorBtnTxt}>Return to Setup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const dp         = displayPlayer ?? playerPokemon;
  const dopp       = displayOpp   ?? opponentPokemon;
  const SUBSTITUTE_FRONT = { uri: 'https://play.pokemonshowdown.com/sprites/substitutes/gen5/substitute.png' };
  const SUBSTITUTE_BACK  = { uri: 'https://play.pokemonshowdown.com/sprites/substitutes/gen5-back/substitute.png' };

  const playerSprite  = dp.substituteHp !== undefined
    ? SUBSTITUTE_BACK
    : (BackSprites[dp.baseId.toLowerCase().replace(/[^a-z0-9]/g, '')]   ?? BackSprites['bulbasaur']);
  const oppSprite     = dopp.substituteHp !== undefined
    ? SUBSTITUTE_FRONT
    : (FrontSprites[dopp.baseId.toLowerCase().replace(/[^a-z0-9]/g, '')] ?? FrontSprites['bulbasaur']);
  const canFight      = !!selectedMoveId && !isAnimating && gameState === 'battle';
  const isForcedSwitch = gameState === 'switch';

  return (
    <View style={s.safeArea}>
      <View style={s.root}>

        <View style={s.leftColumn}>
          {/* ═══════════ TOP BAR ═══════════ */}
          <TopBar
            turnCount={turnCount}
            totalTimer={totalTimer}
            turnTimer={turnTimer}
            fmtTime={fmtTime}
            weather={field.weather}
            playerHazards={field.player.hazards}
            opponentHazards={field.opponent.hazards}
            playerScreens={field.player.screens}
            opponentScreens={field.opponent.screens}
            sizes={sizes}
          />

          {/* ═══════════ BATTLE SCENE ═══════════ */}
          <View style={[s.arena, { flex: sizes.arenaFlex }]}>
            <Image source={{ uri: 'https://play.pokemonshowdown.com/sprites/battlebg/bg-forest.jpg' }} style={s.arenaBg} />
            <View style={s.arenaVignette} />

            <View style={s.enemyHalf}>
              <BattleInfoCard pokemon={dopp} isPlayer={false} team={opponentBattleTeam} activeIdx={opponentActiveIdx} sizes={sizes} />
              <View style={s.spriteWrapEnemy}>
                <View style={[s.baseShadow, { width: sizes.enemySprite * 0.7 }]} />
                <Animated.Image source={oppSprite} style={[{ width: sizes.enemySprite, height: sizes.enemySprite, zIndex: 2 }, { opacity: oppSpriteOpacity, transform: [{ translateX: oppSpriteX }] }]} resizeMode="contain" />
                {popups.filter(p => p.target === 'opponent').map(p => (
                  <PopupAnimation key={p.id} popup={p} onComplete={id => setPopups(curr => curr.filter(x => x.id !== id))} />
                ))}
              </View>
            </View>

            <View style={s.playerHalf}>
              <BattleInfoCard pokemon={dp} isPlayer={true} team={playerBattleTeam} activeIdx={playerActiveIdx} sizes={sizes} />
              <View style={s.spriteWrapPlayer}>
                <View style={[s.baseShadow, { width: sizes.playerSprite * 0.7 }]} />
                <Animated.Image source={playerSprite} style={[{ width: sizes.playerSprite, height: sizes.playerSprite, zIndex: 2 }, { opacity: playerSpriteOpacity, transform: [{ translateX: playerSpriteX }] }]} resizeMode="contain" />
                {popups.filter(p => p.target === 'player').map(p => (
                  <PopupAnimation key={p.id} popup={p} onComplete={id => setPopups(curr => curr.filter(x => x.id !== id))} />
                ))}
              </View>
            </View>
          </View>

          {/* ═══════════ CONTROLS PANEL ═══════════ */}
          <View style={[s.controlsPanel, { flex: sizes.controlsFlex }]}>
            {!isForcedSwitch && (
              <View style={s.controlsInner}>
                <View style={s.movesGrid}>
                  {playerPokemon.moves.map(move => {
                    const isSelected = selectedMoveId === move.id || (playerPokemon.lockedMove && move.id === playerPokemon.lockedMove.moveId);
                    const isLockedOut = (!!playerPokemon.lockedMove && move.id !== playerPokemon.lockedMove.moveId)
                      || (move.currentPp ?? move.pp) <= 0;
                    return (
                      <MoveButton
                        key={move.id}
                        move={move}
                        isSelected={!!isSelected}
                        isLockedOut={isLockedOut}
                        disabled={isAnimating}
                        sizes={sizes}
                        onPress={() => {
                          if (canFight && selectedMoveId === move.id) handleFight();
                          else setSelectedMoveId(move.id);
                        }}
                      />
                    );
                  })}
                </View>

                <View style={[s.actionRow, { height: sizes.actionRowHeight }]}>
                  {selectedMoveId ? (
                    <TouchableOpacity style={[s.actionBtn, s.actionCancel]} onPress={() => setSelectedMoveId(null)} disabled={isAnimating}>
                      <Text style={s.actionBtnTxt}>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity style={[s.actionBtn, s.actionSwitch]} onPress={() => setSwitchModalVisible(true)} disabled={isAnimating || !!playerPokemon.lockedMove}>
                        <Text style={s.actionBtnTxt}>Pokémon</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[s.actionBtn, s.actionRun]} onPress={handleFlee} disabled={isAnimating || !!playerPokemon.lockedMove}>
                        <Text style={s.actionBtnTxt}>Run</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={s.rightColumn}>
          {/* ═══════════ BATTLE LOG ═══════════ */}
          <View style={s.logPanel}>
            <View style={s.logHeader}><Text style={s.logHeaderTxt}>Battle Log</Text></View>
            <ScrollView ref={scrollRef} style={s.logScroll} contentContainerStyle={s.logContent} showsVerticalScrollIndicator={false}>
              {visibleLogs.map((line, idx) => (
                <AnimatedLogLine key={`${idx}-${line}`} text={line || ' '} textStyle={[logS.base, { fontSize: sizes.logFont }, getLogStyle(line)]} isNew={idx >= newFromIdx} />
              ))}
              {isAnimating && <Animated.Text style={logS.cursor}>▌</Animated.Text>}
            </ScrollView>
          </View>
        </View>

        {/* ═══════════ SWITCH MODAL ═══════════ */}
        <Modal visible={isForcedSwitch || isSwitchModalVisible} transparent animationType="fade">
          <View style={ms.overlay}>
            <View style={ms.sheet}>
              <View style={ms.headerAccent} />
              <View style={ms.header}>
                <View style={{ flex: 1 }}>
                  <Text style={ms.title}>
                    {isForcedSwitch
                      ? ((playerPokemon?.currentHp ?? 0) <= 0 ? 'YOUR POKÉMON FAINTED!' : 'YOUR POKÉMON WAS DRAGGED OUT!')
                      : 'SWITCH POKÉMON'}
                  </Text>
                </View>
                {!isForcedSwitch && (
                  <TouchableOpacity onPress={() => setSwitchModalVisible(false)} style={{ padding: 5 }}>
                    <Text style={{ color: '#94A3B8', fontSize: 16, fontWeight: 'bold' }}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <ScrollView style={ms.list} contentContainerStyle={ms.listContent} showsVerticalScrollIndicator={false}>
                {playerBattleTeam.map((poke, idx) => {
                  if (isForcedSwitch && idx === playerActiveIdx) return null;
                  return (
                    <SwitchCard key={poke.id} pokemon={poke} idx={idx} isActive={idx === playerActiveIdx} cardWidth={sizes.switchCardWidth} onPress={() => isForcedSwitch ? handleForcedSwitch(idx) : handleVoluntarySwitch(idx)} />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
};

// ─── Log styles ───────────────────────────────────────────────────────────────
const logS = StyleSheet.create({
  base:    { fontSize: 10, fontFamily: 'monospace', lineHeight: 14, marginVertical: 0.5 },
  normal:  { color: '#94A3B8' },
  turn:    { color: '#F59E0B', fontWeight: '800', marginTop: 4 },
  move:    { color: '#E2E8F0', fontWeight: '700' },
  damage:  { color: '#CBD5E1', fontWeight: '600' },
  super:   { color: '#10B981', fontWeight: '700' },
  weak:    { color: '#F59E0B', fontWeight: '600' },
  faint:   { color: '#EF4444', fontWeight: '700' },
  event:   { color: '#00C3E3', fontWeight: '700' },
  win:     { color: '#3B82F6', fontWeight: '800' },
  divider: { color: '#334155' },
  cursor:  { color: '#00C3E3', fontSize: 12 },
});

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  root:     { flex: 1, flexDirection: 'row' },

  leftColumn: { flex: 7, flexDirection: 'column' },
  rightColumn: { flex: 3, flexDirection: 'column', borderLeftWidth: 2, borderLeftColor: '#334155' },

  // Arena
  arena: { flex: 6, position: 'relative', overflow: 'hidden', backgroundColor: '#8ea679' },
  arenaBg: { position: 'absolute', width: '100%', height: '100%', opacity: 0.8 },
  arenaVignette: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent', borderWidth: 24, borderColor: 'rgba(0,0,0,0.18)' },

  enemyHalf: { position: 'absolute', top: 10, right: 12, alignItems: 'center', flexDirection: 'column' },
  spriteWrapEnemy: { position: 'relative', alignItems: 'center', justifyContent: 'center' },

  playerHalf: { position: 'absolute', bottom: 10, left: 12, alignItems: 'center', flexDirection: 'column' },
  spriteWrapPlayer: { position: 'relative', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 },

  baseShadow: { position: 'absolute', bottom: 0, height: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50, transform: [{ scaleX: 1.4 }], zIndex: 1 },

  // Controls Panel
  controlsPanel: { flex: 4, backgroundColor: '#1e293b', borderTopWidth: 2, borderTopColor: '#334155' },
  controlsInner: { flex: 1, padding: 8, justifyContent: 'space-between' },
  movesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, flex: 1 },

  actionRow: { flexDirection: 'row', gap: 6, marginTop: 6 },
  actionBtn: { flex: 1, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  actionSwitch: { backgroundColor: '#3b82f6' },
  actionRun: { backgroundColor: '#64748b' },
  actionCancel: { backgroundColor: '#ef4444' },
  actionBtnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },

  // Battle Log
  logPanel: { flex: 1, backgroundColor: '#020617' },
  logHeader: { paddingVertical: 8, backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b', alignItems: 'center' },
  logHeaderTxt: { color: '#94A3B8', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  logScroll: { flex: 1 },
  logContent: { padding: 8, flexGrow: 1, paddingBottom: 20 },

  // Error
  errorWrap:  { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  errorTxt:   { color: '#EF4444', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  errorBtn:   { backgroundColor: '#3B82F6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  errorBtnTxt:{ color: '#FFF', fontWeight: '800' },
});

// ─── Forced switch modal styles ───────────────────────────────────────────────
const ms = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  sheet: {
    backgroundColor: '#0F172A', borderRadius: 14, overflow: 'hidden',
    borderWidth: 2, borderColor: '#334155', width: '100%', maxWidth: 640, maxHeight: '90%',
  },
  headerAccent: { height: 4, backgroundColor: '#00C3E3' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  title:    { color: '#F8FAFC', fontSize: 16, fontWeight: '900', letterSpacing: 1.5 },
  subtitle: { color: '#94A3B8', fontSize: 11, textAlign: 'center', marginTop: 6, marginBottom: 14 },
  list:     { flexGrow: 0, padding: 16 },
  listContent: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
});
