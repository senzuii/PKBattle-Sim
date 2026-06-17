import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export interface SegmentTab {
  key: string;
  label: string;
  sub?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SegmentedTabs — a slim pill-style segmented control. Replaces tall stacked
// tab bars; reads as a native iOS/Android segmented control.
// ─────────────────────────────────────────────────────────────────────────────
export const SegmentedTabs: React.FC<{
  tabs: SegmentTab[];
  active: string;
  onChange: (key: string) => void;
  accent?: string;
}> = ({ tabs, active, onChange, accent = COLORS.cyan }) => (
  <View style={s.wrap}>
    {tabs.map(tab => {
      const isActive = tab.key === active;
      return (
        <TouchableOpacity
          key={tab.key}
          style={[s.seg, isActive && { backgroundColor: accent }]}
          onPress={() => onChange(tab.key)}
          activeOpacity={0.85}
        >
          <Text style={[s.label, isActive ? s.labelActive : null]} numberOfLines={1}>
            {tab.label}
          </Text>
          {tab.sub && (
            <Text style={[s.sub, isActive && s.subActive]} numberOfLines={1}>{tab.sub}</Text>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 3,
    gap: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  seg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 7,
    borderRadius: 8,
  },
  label: { color: COLORS.textDim, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  labelActive: { color: '#06121A' },
  sub: { color: COLORS.textFaint, fontSize: 10, fontWeight: '700' },
  subActive: { color: 'rgba(6,18,26,0.7)' },
});
