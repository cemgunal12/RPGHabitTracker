import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Brain, Heart, BookOpen, Coins, Sparkles } from 'lucide-react-native';
import { COLORS, FONTS } from '../../../constants/theme';

const StatBar = ({ label, value, icon: Icon, color }) => (
  <View style={styles.statRow}>
    <View style={styles.labelContainer}>
      <Icon size={16} color={color} />
      <Text style={styles.label}>{label}</Text>
    </View>
    
    <View style={styles.barContainer}>
      <View style={styles.track}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${Math.min(value, 100)}%` }]}
        />
      </View>
    </View>
    
    <Text style={[styles.value, { color }]}>{value}</Text>
  </View>
);

export default function StatsOverview({ stats }) {
  const statsList = [
    { name: 'Mind', value: stats.mind, icon: Brain, color: '#8A2BE2' },
    { name: 'Vitality', value: stats.vitality, icon: Heart, color: '#FF1744' },
    { name: 'Knowledge', value: stats.knowledge, icon: BookOpen, color: '#00F0FF' },
    { name: 'Wealth', value: stats.wealth, icon: Coins, color: '#FFD700' },
    { name: 'Creativity', value: stats.creativity, icon: Sparkles, color: '#FF69B4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={20} color={COLORS.secondary} />
        <Text style={styles.title}>Character Stats</Text>
      </View>

      <View style={styles.list}>
        {statsList.map((stat) => (
          <StatBar key={stat.name} label={stat.name} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E1E1E', margin: 20, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  list: { gap: 16 },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 100 },
  label: { color: '#FFF', fontSize: 14, fontFamily: FONTS.medium },
  barContainer: { flex: 1 },
  track: { height: 8, backgroundColor: '#121212', borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  fill: { height: '100%', borderRadius: 4 },
  value: { width: 30, textAlign: 'right', fontSize: 14, fontFamily: FONTS.bold },
});