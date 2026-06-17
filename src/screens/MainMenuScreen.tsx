import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBattleStore } from '../store/useBattleStore';
import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../theme';

// ── Brand palette (pulled from the logo: Poké Ball red + sparkle gold) ──────────
const PALETTE = {
  red: '#EF4444',   // PK / ball top
  gold: '#F59E0B',  // sparkles
  amber: '#FBBF24', // "SIM" / highlights
};

const LOGO = require('../../assets/icons/icon.png');

const MENU_ITEMS = [
  {
    key: 'battle',
    icon: '⚡',
    label: 'QUICK PLAY',
    desc: 'Select a generation and fight the AI',
    color: PALETTE.red,
    onPress: (nav: NativeStackNavigationProp<RootStackParamList>) => {
      useBattleStore.getState().setBattleMode('quick');
      nav.navigate('GenSelect');
    },
  },
  {
    key: 'sandbox',
    icon: '🔮',
    label: 'SANDBOX',
    desc: 'No rules — custom enemies, all-out battles',
    color: PALETTE.gold,
    onPress: (nav: NativeStackNavigationProp<RootStackParamList>) => {
      useBattleStore.getState().setBattleMode('sandbox');
      nav.navigate('SandboxSetup');
    },
  },
  {
    key: 'builder',
    icon: '🛠️',
    label: 'TEAM BUILDER',
    desc: 'Customize moves and validate legality',
    color: PALETTE.amber,
    onPress: (nav: NativeStackNavigationProp<RootStackParamList>) => {
      nav.navigate('TeamBuilder', { target: 'player' });
    },
  },
] as const;

export const MainMenuScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { loadPersistedData } = useBattleStore();
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const shortScreen = height < 480;
  const logoSize = shortScreen ? 78 : 124;

  useEffect(() => {
    const init = async () => {
      await loadPersistedData();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return null;

  return (
    <View style={s.root}>
      {/* ── Header / logo ── */}
      <View
        style={[
          s.header,
          {
            paddingTop: insets.top + (shortScreen ? 8 : 22),
            paddingBottom: shortScreen ? 8 : 22,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
          },
        ]}
      >
        <Image source={LOGO} style={{ width: logoSize, height: logoSize }} resizeMode="contain" />
      </View>

      {/* ── Single-column menu list (scrolls when short) ── */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          s.list,
          {
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
            paddingTop: shortScreen ? 14 : 0,
            paddingBottom: insets.bottom + (shortScreen ? 14 : 0),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.key}
            style={s.row}
            onPress={() => item.onPress(navigation)}
            activeOpacity={0.8}
          >
            <View style={[s.accentBar, { backgroundColor: item.color }]} />
            <View style={[s.iconCircle, { borderColor: item.color }]}>
              <Text style={s.iconTxt}>{item.icon}</Text>
            </View>
            <View style={s.textWrap}>
              <Text style={[s.rowLabel, { color: item.color }]}>{item.label}</Text>
              <Text style={s.rowDesc}>{item.desc}</Text>
            </View>
            <Text style={[s.chevron, { color: item.color }]}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[s.version, { bottom: insets.bottom + 6, right: insets.right + 12 }]}>v1.0</Text>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.panel,
  },

  list: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingRight: 16,
    width: '100%',
    maxWidth: 460,
  },
  accentBar: { width: 5, alignSelf: 'stretch' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: 'rgba(15,23,42,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  iconTxt: { fontSize: 20 },
  textWrap: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '700', letterSpacing: 2 },
  rowDesc: { color: COLORS.textMuted, fontSize: 11, fontWeight: '500', marginTop: 3 },
  chevron: { fontSize: 24, fontWeight: '700', marginLeft: 8 },

  version: {
    position: 'absolute',
    color: '#334155',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
