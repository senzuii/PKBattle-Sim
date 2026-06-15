import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BattlePokemon, StatStages } from '../types/Pokemon';
import { HPBar } from './HPBar';
import { getStatMultiplier } from '../engine/effects/StatStages';

interface PokemonCardProps {
  pokemon: BattlePokemon;
  isPlayer: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isPlayer }) => {
  // Helper to color type badges
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Grass':
        return '#10B981';
      case 'Fire':
        return '#F97316';
      case 'Water':
        return '#3B82F6';
      case 'Poison':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  // Helper to display modified stat values
  const renderStat = (label: string, key: keyof StatStages, baseValue: number) => {
    const stage = pokemon.statStages[key];
    const multiplier = getStatMultiplier(stage);
    const modifiedValue = Math.floor(baseValue * multiplier);

    return (
      <View style={styles.statItem} key={key}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statValueContainer}>
          <Text style={styles.statValue}>{modifiedValue}</Text>
          {stage !== 0 && (
            <Text
              style={[
                styles.statStageText,
                { color: stage > 0 ? '#10B981' : '#EF4444' },
              ]}
            >
              {stage > 0 ? `+${stage}` : stage}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const activeStages = Object.entries(pokemon.statStages).filter(
    ([key, value]) => value !== 0
  );

  return (
    <View
      style={[
        styles.card,
        isPlayer ? styles.playerCard : styles.opponentCard,
      ]}
    >
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.level}>Lv.{pokemon.level}</Text>
      </View>

      {/* Types Row */}
      <View style={styles.typesRow}>
        {pokemon.types.map((type) => (
          <View
            key={type}
            style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}
          >
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      {/* HP Bar */}
      <HPBar currentHp={pokemon.currentHp} maxHp={pokemon.maxHp} />

      {/* Status Indicators (Seeded, etc.) */}
      {(pokemon.isSeeded || activeStages.length > 0) && (
        <View style={styles.statusRow}>
          {pokemon.isSeeded && (
            <View style={styles.seededBadge}>
              <Text style={styles.statusBadgeText}>SEEDED</Text>
            </View>
          )}
          {activeStages.map(([stat, val]) => (
            <View
              key={stat}
              style={[
                styles.stageBadge,
                { borderColor: val > 0 ? '#10B981' : '#EF4444' },
              ]}
            >
              <Text
                style={[
                  styles.stageBadgeText,
                  { color: val > 0 ? '#10B981' : '#EF4444' },
                ]}
              >
                {stat.toUpperCase()} {val > 0 ? `+${val}` : val}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Stats Breakdown */}
      <View style={styles.statsTable}>
        <View style={styles.statsRow}>
          {renderStat('ATK', 'atk', pokemon.stats.atk)}
          {renderStat('DEF', 'def', pokemon.stats.def)}
          {renderStat('SPE', 'spe', pokemon.stats.spe)}
        </View>
        <View style={styles.statsRow}>
          {renderStat('SPA', 'spa', pokemon.stats.spa)}
          {renderStat('SPD', 'spd', pokemon.stats.spd)}
          {renderStat('ACC', 'accuracy', 100)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1.5,
    marginVertical: 0,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playerCard: {
    borderColor: '#00C3E3',
  },
  opponentCard: {
    borderColor: '#FF4554',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  level: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  typesRow: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 5,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
    marginRight: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    alignItems: 'center',
  },
  seededBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 2,
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  stageBadge: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 2,
  },
  stageBadgeText: {
    fontSize: 8,
    fontWeight: '800',
  },
  statsTable: {
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: '#334155',
    paddingTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '700',
    marginBottom: 1,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F1F5F9',
  },
  statStageText: {
    fontSize: 8,
    fontWeight: '800',
    marginLeft: 2,
  },
});
