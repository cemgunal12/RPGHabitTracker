import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS } from '../../constants/theme';

const StatItem = ({ icon, label, value, color }) => (
  <View style={[styles.card, { borderColor: `${color}4D` }]}>
    <MaterialCommunityIcons name={icon} size={24} color={color} style={{marginBottom: 6}} />
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.level}>Lv {Math.floor(value/10)}</Text>
  </View>
);

export default function StatsGrid({ stats }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="chart-bar" size={20} color="#00F0FF" />
        <Text style={styles.title}>Character Stats</Text>
      </View>
      
      <View style={styles.grid}>
        <StatItem icon="brain" label="Mind" value={stats.mind} color="#8A2BE2" />
        <StatItem icon="arm-flex" label="Vitality" value={stats.vitality} color="#FF1744" />
        <StatItem icon="book-open-variant" label="Knowledge" value={stats.knowledge} color="#00F0FF" />
      </View>
      
      <View style={[styles.grid, { marginTop: 10, justifyContent: 'center' }]}>
        <StatItem icon="gold" label="Wealth" value={stats.wealth} color="#FFD700" />
        <StatItem icon="sparkles" label="Creativity" value={stats.creativity} color="#FF69B4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 8 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  grid: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, backgroundColor: '#1E1E1E', padding: 12, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  value: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  label: { color: '#A0A0A0', fontSize: 10, textTransform: 'uppercase', marginTop: 2 },
  level: { color: '#666', fontSize: 10, marginTop: 4 },
});