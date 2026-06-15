import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';

interface GameOption {
  id: number | null;
  name: string;
  gen: string;
  color: string;
  implemented: boolean;
}

const GAMES: GameOption[] = [
  { id: null, name: 'ALL GAMES', gen: '', color: '#8B5CF6', implemented: true },

  // Gen 1
  { id: 1, name: 'RED & BLUE / YELLOW', gen: 'GEN 1', color: '#FF4554', implemented: true },

  // Gen 2
  { id: 2, name: 'GOLD & SILVER / CRYSTAL', gen: 'GEN 2', color: '#F59E0B', implemented: true },

  // Gen 3
  { id: 3, name: 'RUBY & SAPPHIRE / EMERALD', gen: 'GEN 3', color: '#10B981', implemented: true },
  { id: 3, name: 'FIRE RED & LEAF GREEN', gen: 'GEN 3', color: '#DC2626', implemented: false },

  // Gen 4
  { id: 4, name: 'DIAMOND & PEARL / PLATINUM', gen: 'GEN 4', color: '#3B82F6', implemented: false },

  // Gen 5
  { id: 5, name: 'BLACK & WHITE', gen: 'GEN 5', color: '#64748B', implemented: false },
  { id: 5, name: 'BLACK 2 & WHITE 2', gen: 'GEN 5', color: '#94A3B8', implemented: false },

  // Gen 6
  { id: 6, name: 'X & Y', gen: 'GEN 6', color: '#EC4899', implemented: false },

  // Gen 7
  { id: 7, name: 'SUN & MOON', gen: 'GEN 7', color: '#F97316', implemented: false },
  { id: 7, name: "ULTRA SUN & MOON", gen: 'GEN 7', color: '#FB923C', implemented: false },
  { id: 7, name: "LET'S GO PIKACHU/EEVEE", gen: 'GEN 7', color: '#FBBF24', implemented: false },

  // Gen 8
  { id: 8, name: 'SWORD & SHIELD', gen: 'GEN 8', color: '#6366F1', implemented: false },
  { id: 8, name: 'BRILLIANT DIAMOND/SHINING PEARL', gen: 'GEN 8', color: '#818CF8', implemented: false },
  { id: 8, name: 'LEGENDS ARCEUS', gen: 'GEN 8', color: '#A78BFA', implemented: false },

  // Gen 9
  { id: 9, name: 'SCARLET & VIOLET', gen: 'GEN 9', color: '#EF4444', implemented: false },
  { id: 9, name: 'LEGENDS Z-A', gen: 'GEN 9', color: '#7C3AED', implemented: false },
];

const CARD_H_PADDING = 16; // horizontal padding of the card grid (matches cardGrid.padding)
const CARD_GAP = 12;       // gap between cards (matches cardGrid.gap)

export const GenSelectScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedGeneration, setGeneration } = useBattleStore();

  // Responsive grid: fewer, larger cards on narrow (mobile) screens.
  const { width } = useWindowDimensions();
  const columns = width < 420 ? 2 : width < 720 ? 3 : 4;
  const cardWidth = Math.floor((width - CARD_H_PADDING * 2 - CARD_GAP * (columns - 1)) / columns);

  const handleSelectGeneration = (genId: number | null) => {
    setGeneration(genId);
    navigation.navigate('Setup');
  };

  return (
    <View style={s.root}>
      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backTxt}>← BACK</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>SELECT GAME</Text>
          <Text style={s.headerSub}>Choose the format for your Quick Battle</Text>
        </View>
        <View style={{ width: 70 }} />
      </View>

      {/* ── Game Cards ── */}
      <ScrollView contentContainerStyle={s.cardGrid}>
        {GAMES.map((game, idx) => {
          // Only the playable card for a gen shows as active — several cards
          // can share an id (e.g. RSE and FR&LG are both Gen 3).
          const isSelected = selectedGeneration === game.id && game.implemented;
          return (
            <TouchableOpacity
              key={`${game.id ?? 'all'}-${idx}`}
              style={[
                s.card,
                { width: cardWidth },
                isSelected && { borderColor: game.color, backgroundColor: `${game.color}15` },
                !game.implemented && s.cardDisabled,
              ]}
              onPress={() => game.implemented && handleSelectGeneration(game.id)}
              disabled={!game.implemented}
              activeOpacity={0.8}
            >
              <View style={[s.cardAccent, { backgroundColor: game.color }]} />
              <Text style={[s.gameName, isSelected && { color: game.color }]} numberOfLines={3}>{game.name}</Text>
              <Text style={s.genTag} numberOfLines={1}>{game.gen}</Text>
              {isSelected && (
                <View style={[s.statusBadge, { backgroundColor: game.color }]}>
                  <Text style={s.activeBadgeTxt}>✓ ACTIVE</Text>
                </View>
              )}
              {!game.implemented && (
                <View style={[s.statusBadge, s.soonBadge]}>
                  <Text style={s.soonBadgeTxt}>SOON</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070D1A' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D1525',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1E293B',
  },
  backBtn: { backgroundColor: '#1E293B', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
  backTxt: { color: '#94A3B8', fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  headerCenter: { alignItems: 'center', gap: 4 },
  headerTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  headerSub: { color: '#64748B', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 12,
    padding: 16,
    flexGrow: 1,
  },
  card: {
    minHeight: 132,
    backgroundColor: '#111827',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    overflow: 'hidden',
    gap: 6,
  },
  cardDisabled: {
    opacity: 0.45,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  gameName: {
    fontSize: 12,
    fontWeight: '900',
    color: '#F1F5F9',
    letterSpacing: 1,
    textAlign: 'center',
  },
  genTag: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  statusBadge: {
    marginTop: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeTxt: {
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  soonBadge: {
    backgroundColor: '#1E293B',
  },
  soonBadgeTxt: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});
