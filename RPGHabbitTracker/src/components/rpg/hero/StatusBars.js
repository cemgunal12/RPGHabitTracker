import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../../constants/theme';

const ProgressBar = ({ label, current, max, color, icon, gradient }) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  return (
    <View style={[styles.barContainer, { borderColor: `${color}4D` }]}> 
      <View style={styles.barHeader}>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name={icon} size={16} color={color} />
          <Text style={styles.barLabel}>{label}</Text>
        </View>
        <Text style={styles.barValue}>{current} / {max}</Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${percentage}%` }]}
        />
      </View>
    </View>
  );
};

export default function StatusBars({ health, maxHealth, xp, maxXP }) {
  return (
    <View style={styles.container}>
      <ProgressBar 
        label="Health" current={health} max={maxHealth} 
        color="#FF1744" icon="heart" gradient={['#FF1744', '#FF5252']} 
      />
      <View style={{ height: 12 }} />
      <ProgressBar 
        label="Experience" current={xp} max={maxXP} 
        color={COLORS.primary} icon="lightning-bolt" gradient={[COLORS.primary, COLORS.secondary]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 10 },
  barContainer: { backgroundColor: '#1E1E1E', padding: 12, borderRadius: 16, borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  labelRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  barLabel: { color: '#A0A0A0', fontSize: 12, fontFamily: FONTS.bold },
  barValue: { color: '#FFF', fontSize: 12, fontFamily: FONTS.regular },
  track: { height: 10, backgroundColor: '#121212', borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});