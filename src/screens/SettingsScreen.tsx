import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { useSettingsStore, BattleSpeed } from '../store/useSettingsStore';

const SPEED_OPTIONS: { key: BattleSpeed; label: string; desc: string }[] = [
  { key: 'slow',   label: 'SLOW',   desc: 'Relaxed pacing — read every line' },
  { key: 'normal', label: 'NORMAL', desc: 'Standard battle pacing' },
  { key: 'fast',   label: 'FAST',   desc: 'Snappy — half the pauses' },
];

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const soundEnabled   = useSettingsStore(s => s.soundEnabled);
  const battleSpeed    = useSettingsStore(s => s.battleSpeed);
  const setSoundEnabled = useSettingsStore(s => s.setSoundEnabled);
  const setBattleSpeed  = useSettingsStore(s => s.setBattleSpeed);

  return (
    <View style={s.root}>
      <ScreenHeader title="SETTINGS" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content}>
        {/* ── Audio ── */}
        <Text style={s.sectionTitle}>AUDIO</Text>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.rowLabel}>Sound effects</Text>
            <Text style={s.rowDesc}>Play Pokémon cries during battle</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: COLORS.border, true: COLORS.cyan }}
            thumbColor="#F8FAFC"
          />
        </View>

        {/* ── Battle speed ── */}
        <Text style={[s.sectionTitle, { marginTop: 20 }]}>BATTLE SPEED</Text>
        <View style={s.speedGroup}>
          {SPEED_OPTIONS.map(opt => {
            const active = battleSpeed === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[s.speedCard, active && s.speedCardActive]}
                onPress={() => setBattleSpeed(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={[s.speedLabel, active && { color: COLORS.cyan }]}>{opt.label}</Text>
                <Text style={s.speedDesc}>{opt.desc}</Text>
                {active && <View style={s.speedCheck}><Text style={s.speedCheckTxt}>✓</Text></View>}
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
  content: { padding: 16, maxWidth: 620, width: '100%', alignSelf: 'center' },

  sectionTitle: { color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 10 },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 14, paddingVertical: 12,
  },
  rowLabel: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  rowDesc: { color: COLORS.textMuted, fontSize: 11, fontWeight: '500', marginTop: 2 },

  speedGroup: { flexDirection: 'row', gap: 10 },
  speedCard: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border,
    padding: 14, gap: 4, position: 'relative', overflow: 'hidden',
  },
  speedCardActive: { borderColor: COLORS.cyan, backgroundColor: 'rgba(0,195,227,0.06)' },
  speedLabel: { color: COLORS.textDim, fontSize: 14, fontWeight: '700', letterSpacing: 1 },
  speedDesc: { color: COLORS.textFaint, fontSize: 10, fontWeight: '500' },
  speedCheck: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.cyan, alignItems: 'center', justifyContent: 'center' },
  speedCheckTxt: { color: COLORS.cardAlt, fontSize: 11, fontWeight: '700' },
});
