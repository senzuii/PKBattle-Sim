import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../theme';
import { ScreenHeader } from '../components/ScreenHeader';

interface GameOption {
  id: number | null;
  name: string;
  gen: string;
  color: string;
  implemented: boolean;
  icon?: any;
}

const GAMES: GameOption[] = [
  { id: null, name: 'ALL GAMES', gen: '', color: '#8B5CF6', implemented: true, icon: require('../../assets/icons/icon.png') },

  // Gen 1
  { id: 1, name: 'RED & BLUE / YELLOW', gen: 'GEN 1', color: '#FF4554', implemented: true, icon: require('../../assets/genicons/rby.png') },

  // Gen 2
  { id: 2, name: 'GOLD & SILVER / CRYSTAL', gen: 'GEN 2', color: '#F59E0B', implemented: true, icon: require('../../assets/genicons/gsc.png') },

  // Gen 3
  { id: 3, name: 'RUBY & SAPPHIRE / EMERALD', gen: 'GEN 3', color: '#10B981', implemented: true, icon: require('../../assets/genicons/rse.png') },
  { id: 3, name: 'FIRE RED & LEAF GREEN', gen: 'GEN 3', color: '#DC2626', implemented: false, icon: require('../../assets/genicons/frlg.png') },

  // Gen 4
  { id: 4, name: 'DIAMOND & PEARL / PLATINUM', gen: 'GEN 4', color: '#3B82F6', implemented: false, icon: require('../../assets/genicons/dppt.png') },
  { id: 4, name: 'HEARTGOLD & SOULSILVER', gen: 'GEN 4', color: '#EAB308', implemented: false, icon: require('../../assets/genicons/hgss.png') },

  // Gen 5
  { id: 5, name: 'BLACK & WHITE', gen: 'GEN 5', color: '#64748B', implemented: false, icon: require('../../assets/genicons/bw.png') },
  { id: 5, name: 'BLACK 2 & WHITE 2', gen: 'GEN 5', color: '#94A3B8', implemented: false, icon: require('../../assets/genicons/b2w2.png') },

  // Gen 6
  { id: 6, name: 'X & Y', gen: 'GEN 6', color: '#EC4899', implemented: false, icon: require('../../assets/genicons/xy.png') },
  { id: 6, name: 'OMEGA RUBY & ALPHA SAPPHIRE', gen: 'GEN 6', color: '#0EA5E9', implemented: false, icon: require('../../assets/genicons/oras.png') },

  // Gen 7
  { id: 7, name: 'SUN & MOON', gen: 'GEN 7', color: '#F97316', implemented: false, icon: require('../../assets/genicons/sm.png') },
  { id: 7, name: "ULTRA SUN & MOON", gen: 'GEN 7', color: '#FB923C', implemented: false, icon: require('../../assets/genicons/usum.png') },
  { id: 7, name: "LET'S GO PIKACHU/EEVEE", gen: 'GEN 7', color: '#FBBF24', implemented: false, icon: require('../../assets/genicons/lgpe.png') },

  // Gen 8
  { id: 8, name: 'SWORD & SHIELD', gen: 'GEN 8', color: '#6366F1', implemented: false, icon: require('../../assets/genicons/swsh.png') },
  { id: 8, name: 'BRILLIANT DIAMOND/SHINING PEARL', gen: 'GEN 8', color: '#818CF8', implemented: false, icon: require('../../assets/genicons/bdsp.png') },
  { id: 8, name: 'LEGENDS ARCEUS', gen: 'GEN 8', color: '#A78BFA', implemented: false, icon: require('../../assets/genicons/arceus.png') },

  // Gen 9
  { id: 9, name: 'SCARLET & VIOLET', gen: 'GEN 9', color: '#EF4444', implemented: false, icon: require('../../assets/genicons/sv.png') },
  { id: 9, name: 'LEGENDS Z-A', gen: 'GEN 9', color: '#7C3AED', implemented: false, icon: require('../../assets/genicons/lza.png') },
];

const CARD_H_PADDING = 14; // horizontal padding of the card grid (matches scrollContent.padding)
const CARD_GAP = 10;       // gap between cards (matches grid.gap)
const COLUMNS = 4;         // always 4 cards across, on every screen size
const MAX_TILE = 160;      // never let a tile grow past this (keeps wide screens sane)
// Cap the whole grid to 4 tiles wide so flex-wrap can't fit more per row on
// wide screens; the grid is then centered in the viewport.
const GRID_MAX_WIDTH = MAX_TILE * COLUMNS + CARD_GAP * (COLUMNS - 1);

export const GenSelectScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedGeneration, setGeneration } = useBattleStore();

  // Derive tile size from the *grid* width (capped at GRID_MAX_WIDTH), so there
  // are always exactly 4 columns regardless of viewport width.
  const { width } = useWindowDimensions();
  const gridWidth = Math.min(width - CARD_H_PADDING * 2, GRID_MAX_WIDTH);
  const cardWidth = Math.floor((gridWidth - CARD_GAP * (COLUMNS - 1)) / COLUMNS);

  const handleSelectGeneration = (genId: number | null) => {
    setGeneration(genId);
    navigation.navigate('Setup');
  };

  return (
    <View style={s.root}>
      <ScreenHeader title="SELECT GAME" badge="QUICK BATTLE" badgeColor={COLORS.purple} onBack={() => navigation.goBack()} />

      {/* ── Game Cards ── */}
      <ScrollView contentContainerStyle={s.scrollContent}>
       <View style={[s.grid, { maxWidth: GRID_MAX_WIDTH }]}>
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
              {game.icon && (
                <Image source={game.icon} style={s.cardIcon} resizeMode="contain" />
              )}
            </TouchableOpacity>
          );
        })}
       </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  scrollContent: {
    alignItems: 'center',
    padding: 14,
    flexGrow: 1,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 10,
  },
  card: {
    aspectRatio: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    overflow: 'hidden',
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
  cardIcon: {
    width: '82%',
    height: '82%',
  },
});
