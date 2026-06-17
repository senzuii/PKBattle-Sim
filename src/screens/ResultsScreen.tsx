import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';
import { BattlePokemon } from '../types/Pokemon';
import { FrontSprites } from '../assets/Sprites';
import { COLORS } from '../theme';

// ─── Roster row: one Pokémon's portrait, name/level, and HP/fainted state ─────
const RosterRow: React.FC<{ pokemon: BattlePokemon; accent: string; compact: boolean }> = ({ pokemon, accent, compact }) => {
  const sprite = FrontSprites[pokemon.baseId.toLowerCase().replace(/[^a-z0-9]/g, '')];
  const fainted = pokemon.currentHp <= 0;

  return (
    <View style={[rS.row, fainted && rS.rowFainted]}>
      <View style={[rS.accentBar, { backgroundColor: fainted ? '#475569' : accent }]} />
      <View style={rS.spriteWrap}>
        {sprite && <Image source={sprite} style={[rS.sprite, { opacity: fainted ? 0.35 : 1 }]} resizeMode="contain" />}
      </View>
      <View style={rS.info}>
        <View style={rS.nameRow}>
          <Text style={[rS.name, { fontSize: compact ? 13 : 15 }]} numberOfLines={1}>{pokemon.name}</Text>
          {fainted && <View style={rS.faintBadge}><Text style={rS.faintBadgeTxt}>KO</Text></View>}
        </View>
        <Text style={[rS.level, { fontSize: compact ? 10 : 12 }]} numberOfLines={1}>Lv{pokemon.level}</Text>
      </View>
    </View>
  );
};
const rS = StyleSheet.create({
  row: { width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,41,59,0.7)', borderRadius: 10, borderWidth: 1, borderColor: '#334155', overflow: 'hidden', marginBottom: 8 },
  rowFainted: { opacity: 0.6 },
  accentBar: { width: 6, alignSelf: 'stretch' },
  spriteWrap: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  sprite: { width: 48, height: 48 },
  info: { flex: 1, paddingVertical: 8, paddingRight: 14, paddingLeft: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { color: '#F8FAFC', fontWeight: '500', flex: 1 },
  level: { color: '#94A3B8', fontWeight: '400' },
  faintBadge: { backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 'auto' },
  faintBadgeTxt: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});

export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    winner,
    turnCount,
    playerDamageDealt,
    playerDamageTaken,
    playerPokemon,
    opponentPokemon,
    playerBattleTeam,
    opponentBattleTeam,
    resetBattle,
    setOpponentChoice,
    startBattle,
  } = useBattleStore();

  const { height } = useWindowDimensions();
  const compact = height < 500;
  const insets = useSafeAreaInsets();

  const handleReturn = () => {
    resetBattle();
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainMenu' }],
    });
  };

  const handleBattleAgain = () => {
    setOpponentChoice('random');
    startBattle();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Battle' }],
    });
  };

  const isPlayerWinner = winner === 'player';
  const accent = isPlayerWinner ? '#00C3E3' : '#FF4554';

  const getBattleNarrative = () => {
    if (!playerPokemon || !opponentPokemon) return '';
    if (isPlayerWinner) {
      return `Your ${playerPokemon.name} stood victorious, defeating the opponent's ${opponentPokemon.name} after a ${turnCount}-turn battle.`;
    }
    return `Your ${playerPokemon.name} was defeated by the opponent's ${opponentPokemon.name} after ${turnCount} turns.`;
  };

  const playerKOs = opponentBattleTeam.filter(p => p.currentHp <= 0).length;
  const opponentKOs = playerBattleTeam.filter(p => p.currentHp <= 0).length;

  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      {/* ═══════════ LEFT PANE: result, stats, actions ═══════════ */}
      <View style={s.leftPane}>
        <View style={[s.banner, { borderColor: accent, backgroundColor: isPlayerWinner ? 'rgba(0,195,227,0.08)' : 'rgba(255,69,84,0.08)' }]}>
          <View style={[s.bannerAccent, { backgroundColor: accent }]} />
          <Text style={[s.bannerText, { color: accent, fontSize: compact ? 26 : 32 }]}>
            {isPlayerWinner ? 'VICTORY' : 'DEFEAT'}
          </Text>
          <Text style={s.narrativeText} numberOfLines={4}>{getBattleNarrative()}</Text>
        </View>

        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={s.statValue}>{turnCount}</Text>
            <Text style={s.statLabel}>TURNS</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: '#10B981' }]}>{playerDamageDealt}</Text>
            <Text style={s.statLabel}>DMG DEALT</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: '#EF4444' }]}>{playerDamageTaken}</Text>
            <Text style={s.statLabel}>DMG TAKEN</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statValue}>{playerKOs}-{opponentKOs}</Text>
            <Text style={s.statLabel}>KOs (Y-O)</Text>
          </View>
        </View>

        <View style={s.actionsCol}>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: accent, borderColor: accent }]} onPress={handleBattleAgain}>
            <Text style={[s.actionBtnTxt, { color: '#06121A' }]}>⚔  BATTLE AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: 'transparent', borderColor: accent }]} onPress={handleReturn}>
            <Text style={[s.actionBtnTxt, { color: accent }]}>RETURN TO MENU</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ═══════════ RIGHT PANE: final teams ═══════════ */}
      <View style={s.rightPane}>
        <View style={s.rosterHeader}>
          <Text style={s.rosterHeaderTxt}>FINAL TEAMS</Text>
        </View>
        <ScrollView contentContainerStyle={s.rosterContent} showsVerticalScrollIndicator={false}>
          <View style={s.rosterTeams}>
            <View style={s.rosterTeamColumn}>
              <Text style={[s.rosterLabel, { color: '#00C3E3' }]}>YOUR TEAM</Text>
              <View style={s.rosterGrid}>
                {playerBattleTeam.map(p => (
                  <RosterRow key={p.id} pokemon={p} accent="#00C3E3" compact={compact} />
                ))}
              </View>
            </View>
            <View style={s.rosterTeamColumn}>
              <Text style={[s.rosterLabel, { color: '#FF4554' }]}>OPPONENT TEAM</Text>
              <View style={s.rosterGrid}>
                {opponentBattleTeam.map(p => (
                  <RosterRow key={p.id} pokemon={p} accent="#FF4554" compact={compact} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: COLORS.bg },

  // Left pane: vertically centered so the result feels balanced on short screens.
  leftPane: {
    width: '40%', maxWidth: 380, padding: 12, gap: 10, justifyContent: 'center',
    borderRightWidth: 1, borderRightColor: COLORS.border,
  },
  rightPane: { flex: 1, backgroundColor: '#0B1220' },

  banner: {
    borderRadius: 14, borderWidth: 2, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 12,
  },
  bannerAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
  bannerText: { fontWeight: '700', letterSpacing: 4 },
  narrativeText: { color: '#CBD5E1', textAlign: 'center', marginTop: 6, fontSize: 11, lineHeight: 15 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statCard: { flexBasis: '47%', flexGrow: 1, backgroundColor: COLORS.card, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', paddingVertical: 8 },
  statValue: { color: COLORS.text, fontSize: 16, fontWeight: '700', fontFamily: 'monospace' },
  statLabel: { color: COLORS.textMuted, fontSize: 9, fontWeight: '600', letterSpacing: 1, marginTop: 2 },

  actionsCol: { gap: 8, marginTop: 2 },
  actionBtn: { borderRadius: 10, borderWidth: 1.5, paddingVertical: 10, alignItems: 'center' },
  actionBtnTxt: { fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },

  rosterHeader: { paddingVertical: 8, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rosterHeaderTxt: { color: COLORS.textDim, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  rosterContent: { padding: 10 },
  rosterTeams: { flexDirection: 'row', gap: 12 },
  rosterTeamColumn: { flex: 1 },
  rosterGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  rosterLabel: { width: '100%', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 },
});
