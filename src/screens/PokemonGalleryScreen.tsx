// ─────────────────────────────────────────────────────────────────────────────
// Pokémon Gallery — browse the downloaded Showdown animated sprites (GIFs).
// Front / back toggle + name search. Uses expo-image so the GIFs actually
// animate (RN's built-in <Image> won't animate GIFs on Android). Tap a card to
// play that species' cry (expo-audio). Reach it from Main Menu → "SPRITE GALLERY".
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { AniFrontSprites, AniBackSprites } from '../assets/AnimatedSprites';
import { Cries } from '../assets/Cries';
import { Pokedex } from '../../learnsets/pokedex';

// A sprite id may be a form (e.g. "charizard-mega-x") with no cry of its own —
// fall back to the base species' cry by stripping trailing hyphen segments.
const cryFor = (id: string): number | undefined => {
  if (Cries[id]) return Cries[id];
  const parts = id.split('-');
  while (parts.length > 1) {
    parts.pop();
    const key = parts.join('-');
    if (Cries[key]) return Cries[key];
  }
  return undefined;
};

const prettyName = (id: string) =>
  id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// National dex number for a sprite id. Forms (e.g. "abomasnow-mega") usually
// have their own Pokedex entry; cosmetic ones (e.g. "abomasnow-f") don't, so we
// strip trailing hyphen segments until we find the base species' number. Sprites
// with no match (placeholders) sort last.
const dexNum = (id: string): number => {
  let key = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (Pokedex[key]?.num != null) return Pokedex[key].num!;
  const parts = id.toLowerCase().split('-');
  while (parts.length > 1) {
    parts.pop();
    key = parts.join('').replace(/[^a-z0-9]/g, '');
    if (Pokedex[key]?.num != null) return Pokedex[key].num!;
  }
  return 99999;
};

// Dex number ascending; ties (forms of the same species) fall back to the id so
// they stay grouped in a stable order.
const byDex = (a: string, b: string): number =>
  dexNum(a) - dexNum(b) || a.localeCompare(b);

export const PokemonGalleryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [side, setSide] = useState<'front' | 'back'>('front');
  const [query, setQuery] = useState('');

  // One reusable player; tapping a card swaps its source and replays from 0.
  const playerRef = useRef<AudioPlayer | null>(null);
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    const player = createAudioPlayer(null);
    playerRef.current = player;
    return () => { player.remove(); playerRef.current = null; };
  }, []);

  const playCry = (id: string) => {
    const cry = cryFor(id);
    const player = playerRef.current;
    if (!cry || !player) return;
    try {
      player.replace(cry);
      player.seekTo(0);
      player.play();
    } catch { /* ignore rapid re-taps */ }
  };

  const set = side === 'front' ? AniFrontSprites : AniBackSprites;
  // Showdown gives CAP (fan-made) and Pokéstar Studios mons negative dex numbers,
  // and placeholders get 99999. Keep only real National Dex species (num >= 1).
  const ids = useMemo(
    () => Object.keys(set).filter((id) => { const n = dexNum(id); return n >= 1 && n < 99999; }).sort(byDex),
    [set],
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ids.filter((id) => id.includes(q)) : ids;
  }, [ids, query]);

  // Responsive grid: aim for ~110px tiles.
  const gutter = 10;
  const numColumns = Math.max(2, Math.floor((width - gutter) / 120));
  const tile = Math.floor((width - gutter * (numColumns + 1)) / numColumns);

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[s.header, { paddingLeft: insets.left + 12, paddingRight: insets.right + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.back}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <Text style={s.title}>SPRITE GALLERY</Text>
        <View style={s.toggle}>
          {(['front', 'back'] as const).map((sd) => (
            <TouchableOpacity
              key={sd}
              onPress={() => setSide(sd)}
              style={[s.toggleBtn, side === sd && s.toggleBtnOn]}
            >
              <Text style={[s.toggleTxt, side === sd && s.toggleTxtOn]}>{sd.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search */}
      <View style={[s.searchWrap, { marginLeft: insets.left + 12, marginRight: insets.right + 12 }]}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={`Search ${filtered.length} sprites…`}
          placeholderTextColor="#64748B"
          style={s.search}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={s.clear}><Text style={s.clearTxt}>✕</Text></TouchableOpacity>
        )}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(id) => id}
        contentContainerStyle={{ padding: gutter, paddingBottom: insets.bottom + gutter }}
        columnWrapperStyle={{ gap: gutter }}
        ItemSeparatorComponent={() => <View style={{ height: gutter }} />}
        initialNumToRender={24}
        windowSize={5}
        removeClippedSubviews
        renderItem={({ item }) => (
          <TouchableOpacity style={[s.card, { width: tile }]} activeOpacity={0.7} onPress={() => playCry(item)}>
            <View style={[s.spriteBox, { height: tile - 4 }]}>
              <Image
                source={set[item]}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
              {cryFor(item) != null && <Text style={s.cryIcon}>🔊</Text>}
            </View>
            <Text style={s.name} numberOfLines={1}>{prettyName(item)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={s.empty}>No sprites match “{query}”.</Text>}
      />
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0b1220' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  back: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  backTxt: { color: '#E2E8F0', fontSize: 24, fontWeight: '800', marginTop: -2 },
  title: { color: '#F8FAFC', fontSize: 15, fontWeight: '800', letterSpacing: 1.5, flex: 1 },
  toggle: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 8, padding: 2, borderWidth: 1, borderColor: '#334155' },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6 },
  toggleBtnOn: { backgroundColor: '#22D3EE' },
  toggleTxt: { color: '#94A3B8', fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  toggleTxtOn: { color: '#0F172A' },

  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111c30', borderRadius: 10, borderWidth: 1, borderColor: '#334155', marginBottom: 8, paddingHorizontal: 12 },
  search: { flex: 1, color: '#F8FAFC', fontSize: 14, paddingVertical: 9 },
  clear: { padding: 6 },
  clearTxt: { color: '#64748B', fontSize: 14, fontWeight: '700' },

  card: { backgroundColor: '#111c30', borderRadius: 12, borderWidth: 1, borderColor: '#1e293b', padding: 6, alignItems: 'center' },
  spriteBox: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  cryIcon: { position: 'absolute', top: 2, right: 2, fontSize: 11, opacity: 0.7 },
  name: { color: '#CBD5E1', fontSize: 10, fontWeight: '600', marginTop: 2 },
  empty: { color: '#64748B', textAlign: 'center', marginTop: 40, fontSize: 14 },
});
