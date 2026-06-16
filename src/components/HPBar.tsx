import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface HPBarProps {
  currentHp: number;
  maxHp: number;
  /** When true the bar animates to the new HP; when false it snaps instantly */
  animate?: boolean;
}

export const HPBar: React.FC<HPBarProps> = ({ currentHp, maxHp, animate = true }) => {
  const targetPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  // Animated value tracks the bar width as a 0-100 percentage
  const animatedPercent = useRef(new Animated.Value(targetPercent)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(animatedPercent, {
        toValue: targetPercent,
        duration: 600,
        useNativeDriver: false, // width % cannot use native driver
      }).start();
    } else {
      animatedPercent.setValue(targetPercent);
    }
  }, [targetPercent, animate]);

  // Derive bar color from the animated percent value
  const barColor = animatedPercent.interpolate({
    inputRange: [0, 20, 20.01, 50, 50.01, 100],
    outputRange: [
      '#EF4444', // critical red
      '#EF4444',
      '#F59E0B', // warning amber
      '#F59E0B',
      '#10B981', // healthy green
      '#10B981',
    ],
    extrapolate: 'clamp',
  });

  const widthPercent = animatedPercent.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hpLabel}>HP</Text>
        <Text style={styles.hpText}>
          {currentHp} / {maxHp}
        </Text>
      </View>
      <View style={styles.barContainer}>
        <Animated.View
          style={[styles.bar, { width: widthPercent, backgroundColor: barColor }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  hpLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#121212',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    letterSpacing: 0.5,
  },
  hpText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#E5E7EB',
    fontFamily: 'monospace',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
