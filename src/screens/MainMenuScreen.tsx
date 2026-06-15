import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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

const MENU_ITEMS = [
  {
    key: 'battle',
    icon: '⚡',
    label: 'QUICK PLAY',
    desc: 'Select a generation and fight the AI',
    color: '#FF4554',
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
    color: '#8B5CF6',
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
    color: '#00C3E3',
    onPress: (nav: NativeStackNavigationProp<RootStackParamList>) => {
      nav.navigate('TeamBuilder', { target: 'player' });
    },
  },
] as const;

export const MainMenuScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { loadPersistedData } = useBattleStore();
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const compact = width < 820;
  const short = height < 520; // landscape phones — shrink chrome so the list fits

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
      {/* ── Header ── */}
      <View
        style={[
          s.header,
          {
            paddingTop: insets.top + (short ? 12 : 28),
            paddingBottom: short ? 12 : 28,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
          },
        ]}
      >
        <View style={[s.brandAccent, short && { marginBottom: 8 }]} />
        <Text style={[s.title, { fontSize: compact ? 22 : 30, letterSpacing: compact ? 1.5 : 3 }]}>PKBATTLE SIM</Text>
        <Text style={[s.subtitle, { fontSize: compact ? 9 : 11, letterSpacing: compact ? 4 : 6 }]}>OFFLINE SIMULATOR</Text>
        {!short && (
          <View style={s.versionBadge}>
            <Text style={s.versionTxt}>v1.0</Text>
          </View>
        )}
      </View>

      {/* ── Menu List (scrolls if the screen is too short to fit it) ── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.list,
          {
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
            paddingBottom: insets.bottom + 16,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[s.row, short && { paddingVertical: 11 }]}
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
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070D1A' },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0D1525',
  },
  brandAccent: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00C3E3',
    marginBottom: 12,
  },
  title: {
    color: '#F8FAFC',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,195,227,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  subtitle: {
    color: '#00C3E3',
    fontWeight: '800',
    marginTop: 8,
  },
  versionBadge: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  versionTxt: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  scroll: { flex: 1 },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1E293B',
    overflow: 'hidden',
    paddingVertical: 14,
    paddingRight: 18,
    width: '100%',
    maxWidth: 480,
  },
  accentBar: {
    width: 5,
    alignSelf: 'stretch',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: 'rgba(15,23,42,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  iconTxt: {
    fontSize: 22,
  },
  textWrap: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  rowDesc: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  chevron: {
    fontSize: 26,
    fontWeight: '900',
    marginLeft: 8,
  },
});
