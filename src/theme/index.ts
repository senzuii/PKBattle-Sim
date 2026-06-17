import { useWindowDimensions } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// Shared design tokens — single source of truth for the mobile UI.
// Palette matches the existing dark-navy / Poké-ball-red look.
// ─────────────────────────────────────────────────────────────────────────────
export const COLORS = {
  bg:        '#070D1A',
  panel:     '#0D1525',
  card:      '#111827',
  cardAlt:   '#0F172A',
  border:    '#1E293B',
  borderHi:  '#334155',

  text:      '#F8FAFC',
  textDim:   '#94A3B8',
  textMuted: '#64748B',
  textFaint: '#475569',

  cyan:   '#00C3E3',
  red:    '#FF4554',
  purple: '#8B5CF6',
  gold:   '#F59E0B',
  green:  '#10B981',
  amber:  '#F59E0B',
} as const;

export const TYPE_COLORS: Record<string, string> = {
  Grass: '#4CAF50', Fire: '#FF5722', Water: '#2196F3',
  Poison: '#9C27B0', Normal: '#9E9E9E', Electric: '#FFC107',
  Psychic: '#E91E63', Ice: '#00BCD4', Dragon: '#673AB7',
  Fighting: '#795548', Flying: '#42A5F5', Bug: '#8BC34A',
  Rock: '#8D6E63', Ground: '#FF8F00', Ghost: '#7E57C2',
  Dark: '#37474F', Steel: '#607D8B', Fairy: '#F06292',
};

// ─────────────────────────────────────────────────────────────────────────────
// useResponsive — one hook every screen uses to size itself.
//
// The app is orientation-locked to landscape, so on a phone the *height* is the
// scarce dimension (~360–430px) while width is generous. We therefore treat a
// short OR narrow viewport as "phone" and drive a compact, dense layout from it.
// Tablets (min side ≥ 600) get a small scale-up so the UI doesn't feel tiny.
// ─────────────────────────────────────────────────────────────────────────────
export interface Responsive {
  width: number;
  height: number;
  /** Phone-sized viewport — use the dense, compact layout. */
  phone: boolean;
  /** Large tablet/desktop — allow slightly larger sizing. */
  tablet: boolean;
  /** Multiply a base (phone) size by this for the current device. */
  scale: (n: number) => number;
  /** Standard spacing scale (already device-scaled). */
  space: (mult?: number) => number;
}

export function useResponsive(): Responsive {
  const { width, height } = useWindowDimensions();
  const minSide = Math.min(width, height);
  const phone = height < 500 || width < 480;
  const tablet = minSide >= 600;

  // Phones render the compact base 1:1; tablets scale up gently, capped so
  // huge screens don't blow the UI out again.
  const factor = tablet ? Math.min(1.35, minSide / 600) : 1;
  const scale = (n: number) => Math.round(n * factor);
  const space = (mult = 1) => Math.round(8 * mult * factor);

  return { width, height, phone, tablet, scale, space };
}
