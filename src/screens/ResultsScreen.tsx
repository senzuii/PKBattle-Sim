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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';
import { BattlePokemon } from '../types/Pokemon';
import { FrontSprites } from '../assets/Sprites';

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
        <Text style={[rS.level, { fontSize: compact ? 10 : 12 }]}>Lv{pokemon.level}</Text>
      </View>
    </View>
  );
};
const rS = StyleSheet.create({
  row: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,41,59,0.7)', borderRadius: 10, borderWidth: 1, borderColor: '#334155', overflow: 'hidden', marginBottom: 10 },
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
    <View style={s.root}>
      {/* ═══════════ LEFT: RESULT BANNER ═══════════ */}
      <View style={s.leftColumn}>
        <View style={[s.banner, { borderColor: accent, backgroundColor: isPlayerWinner ? 'rgba(0,195,227,0.08)' : 'rgba(255,69,84,0.08)' }]}>
          <View style={[s.bannerAccent, { backgroundColor: accent }]} />
          <Text style={[s.bannerText, { color: accent, fontSize: compact ? 30 : 44 }]}>
            {isPlayerWinner ? 'VICTORY' : 'DEFEAT'}
          </Text>
          <Text style={[s.narrativeText, { fontSize: compact ? 10 : 12 }]}>{getBattleNarrative()}</Text>
        </View>

        <View style={s.statsRow}>
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
      </View>

      {/* ═══════════ RIGHT: FINAL TEAMS ═══════════ */}
      <View style={s.rightColumn}>
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
        <View style={s.actionsRow}>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: '#1E293B', borderColor: accent }]} onPress={handleReturn}>
            <Text style={[s.actionBtnTxt, { color: accent }]}>RETURN TO MENU</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: accent, borderColor: accent }]} onPress={handleBattleAgain}>
            <Text style={[s.actionBtnTxt, { color: '#0F172A' }]}>BATTLE AGAIN (RANDOM)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, flexDirection: 'column', backgroundColor: '#0F172A' },

  leftColumn: { padding: 16, alignItems: 'center' },
  rightColumn: { flex: 1, borderTopWidth: 2, borderTopColor: '#334155', backgroundColor: '#0B1220' },

  banner: {
    width: '100%', maxWidth: 480,
    borderRadius: 14, borderWidth: 2, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center', paddingVertical: 18, paddingHorizontal: 16,
  },
  bannerAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
  bannerText: { fontWeight: '700', letterSpacing: 6 },
  narrativeText: { color: '#CBD5E1', textAlign: 'center', marginTop: 10, lineHeight: 18, maxWidth: 480 },

  statsRow: { width: '100%', maxWidth: 480, flexDirection: 'row', gap: 8, marginVertical: 12 },
  statCard: { flex: 1, backgroundColor: '#1E293B', borderRadius: 10, borderWidth: 1, borderColor: '#334155', alignItems: 'center', paddingVertical: 10 },
  statValue: { color: '#F8FAFC', fontSize: 18, fontWeight: '700', fontFamily: 'monospace' },
  statLabel: { color: '#64748B', fontSize: 9, fontWeight: '600', letterSpacing: 1, marginTop: 2 },

  actionsRow: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: '#334155' },
  actionBtn: { flex: 1, borderRadius: 10, borderWidth: 1.5, paddingVertical: 14, alignItems: 'center' },
  actionBtnTxt: { fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },

  rosterHeader: { paddingVertical: 10, alignItems: 'center', backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  rosterHeaderTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  rosterContent: { padding: 10, alignItems: 'center' },
  rosterTeams: { width: '100%', maxWidth: 900, flexDirection: 'row', gap: 16 },
  rosterTeamColumn: { flex: 1 },
  rosterGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  rosterLabel: { width: '100%', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 },
});
