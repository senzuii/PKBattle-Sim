import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, useResponsive } from '../theme';

// ─────────────────────────────────────────────────────────────────────────────
// ScreenHeader — a single slim top bar shared across screens.
// One row: [back]  TITLE · badge  [right slot]. Built for landscape phones
// where vertical space is scarce, so it stays ~44px tall.
// ─────────────────────────────────────────────────────────────────────────────
export const ScreenHeader: React.FC<{
  title: string;
  badge?: string;
  badgeColor?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}> = ({ title, badge, badgeColor = COLORS.red, onBack, right }) => {
  const insets = useSafeAreaInsets();
  const { scale } = useResponsive();

  return (
    <View
      style={[
        s.bar,
        {
          paddingTop: insets.top + 6,
          paddingBottom: 6,
          paddingLeft: insets.left + 12,
          paddingRight: insets.right + 12,
        },
      ]}
    >
      <View style={s.side}>
        {onBack && (
          <TouchableOpacity style={s.backBtn} onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={s.backTxt}>‹ BACK</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.center}>
        <Text style={[s.title, { fontSize: scale(15) }]} numberOfLines={1}>{title}</Text>
        {badge && (
          <View style={[s.badge, { backgroundColor: badgeColor }]}>
            <Text style={s.badgeTxt}>{badge}</Text>
          </View>
        )}
      </View>

      <View style={[s.side, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
};

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.panel,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  side: { width: 96, justifyContent: 'center' },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backTxt: { color: COLORS.textDim, fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  center: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  title: { color: COLORS.text, fontWeight: '700', letterSpacing: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeTxt: { color: '#FFF', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
});
