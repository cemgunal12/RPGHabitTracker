import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS } from '../../constants/theme';

export default function YourRankCard({ username, rank, level, xp }) {
  return (
    <LinearGradient
      colors={['rgba(99, 102, 241, 0.2)', 'rgba(168, 85, 247, 0.2)']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }} 
              style={styles.avatar} 
            />
          </View>
          <View>
            <Text style={styles.label}>Your Rank</Text>
            <View style={styles.rankRow}>
              <Text style={styles.rank}>#{rank}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.level}>Lvl {level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.xpLabel}>XP</Text>
          <Text style={styles.xpValue}>{xp.toLocaleString()}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 20, marginTop: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)', padding: 16 },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#818CF8', overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  label: { color: '#A5B4FC', fontSize: 12 },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rank: { color: '#FFF', fontFamily: FONTS.bold, fontSize: 16 },
  dot: { color: '#818CF8' },
  level: { color: '#D8B4FE', fontSize: 12 },
  right: { alignItems: 'flex-end' },
  xpLabel: { color: '#A5B4FC', fontSize: 12 },
  xpValue: { color: '#FFF', fontFamily: FONTS.bold },
});