import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Skull, Trophy } from 'lucide-react-native';
import { FONTS } from '../../../constants/theme';

export default function BossHeader({ bossNumber, totalBosses }) {
  return (
    <LinearGradient
      colors={['rgba(255, 63, 63, 0.2)', 'rgba(255, 23, 68, 0.1)', 'transparent']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <LinearGradient colors={['#FF3F3F', '#FF1744']} style={styles.iconGradient}>
              <Skull size={24} color="#FFF" />
            </LinearGradient>
          </View>
          <View>
            <Text style={styles.title}>Boss Battle</Text>
            <Text style={styles.subtitle}>Defeat to earn badges</Text>
          </View>
        </View>

        <View style={styles.counter}>
          <Trophy size={16} color="#FFD700" />
          <Text style={styles.counterText}>{bossNumber} / {totalBosses}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 63, 63, 0.3)' },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  left: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  iconBox: { borderRadius: 16, shadowColor: '#FF3F3F', shadowOpacity: 0.4, shadowRadius: 10 },
  iconGradient: { padding: 10, borderRadius: 16 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  subtitle: { color: '#A0A0A0', fontSize: 12 },
  counter: { flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#1E1E1E', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 63, 63, 0.4)', alignItems: 'center' },
  counterText: { color: '#FFF', fontSize: 14, fontFamily: FONTS.bold },
});