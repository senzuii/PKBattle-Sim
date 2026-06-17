import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS } from '../theme';

// ─────────────────────────────────────────────────────────────────────────────
// PrimaryButton — compact, consistent CTA. Sized for landscape phones (no more
// giant full-bleed bars). Use `block` only when a full-width action is wanted.
// ─────────────────────────────────────────────────────────────────────────────
export const PrimaryButton: React.FC<{
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  block?: boolean;
  style?: StyleProp<ViewStyle>;
}> = ({ label, onPress, color = COLORS.red, disabled, block, style }) => (
  <TouchableOpacity
    style={[
      s.btn,
      { backgroundColor: color },
      block && s.block,
      disabled && s.disabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={s.txt}>{label}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  btn: {
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: { alignSelf: 'stretch' },
  disabled: { opacity: 0.4 },
  txt: { color: '#FFF', fontSize: 14, fontWeight: '700', letterSpacing: 1.5 },
});
