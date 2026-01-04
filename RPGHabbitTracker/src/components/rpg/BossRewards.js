import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Trophy, Zap, Coins } from 'lucide-react-native';
import { FONTS } from '../../constants/theme';

export default function BossRewards({ xp, gold }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Trophy size={20} color="#FFD700" />
        <Text style={styles.title}>Defeat Rewards</Text>
      </View>

      <View style={styles.list}>
        <View style={styles.row}>
           <View style={styles.left}>
             <Zap size={16} color="#8A2BE2" />
             <Text style={styles.label}>Experience</Text>
           </View>
           <Text style={[styles.value, { color: '#8A2BE2' }]}>+{xp} XP</Text>
        </View>

        <View style={styles.row}>
           <View style={styles.left}>
             <Coins size={16} color="#FFD700" />
             <Text style={styles.label}>Gold</Text>
           </View>
           <Text style={[styles.value, { color: '#FFD700' }]}>+{gold}g</Text>
        </View>

        <View style={styles.row}>
           <View style={styles.left}>
             <Trophy size={16} color="#00F0FF" />
             <Text style={styles.label}>Badge</Text>
           </View>
           <Text style={[styles.value, { color: '#00F0FF' }]}>Exclusive</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E1E1E', marginHorizontal: 20, marginTop: 20, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  header: { flexDirection: 'row', gap: 8, marginBottom: 16, alignItems: 'center' },
  title: { color: '#FFF', fontSize: 16, fontFamily: FONTS.bold },
  list: { gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  label: { color: '#A0A0A0', fontSize: 14 },
  value: { fontSize: 14, fontFamily: FONTS.bold },
});