import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS } from '../../../constants/theme';

export default function RankListItem({ user }) {
  const progress = (user.level / 50) * 100; // Örnek progress mantığı

  return (
    <View style={styles.container}>
      {/* Rank Number */}
      <View style={styles.rankBox}>
        <Text style={styles.rankText}>#{user.rank}</Text>
      </View>

      {/* Avatar */}
      <Image 
        source={{ uri: user.avatar }} 
        style={styles.avatar} 
      />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.username} numberOfLines={1}>{user.username}</Text>
          <View style={styles.xpBadge}>
            <Zap size={10} color="#60A5FA" />
            <Text style={styles.xpText}>{user.xp.toLocaleString()}</Text>
          </View>
        </View>

        {/* Level Bar */}
        <View style={styles.barContainer}>
          <View style={styles.track}>
            <LinearGradient
              colors={['#A855F7', '#3B82F6']}
              style={[styles.fill, { width: `${progress}%` }]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.levelText}>Lvl {user.level}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(17, 24, 39, 0.6)', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#1F2937' },
  rankBox: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.3)', marginRight: 12 },
  rankText: { color: '#D8B4FE', fontSize: 12, fontFamily: FONTS.bold },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.3)', marginRight: 12 },
  info: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  username: { color: '#FFF', fontSize: 14, fontFamily: FONTS.medium },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  xpText: { color: '#60A5FA', fontSize: 10 },
  barContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  track: { flex: 1, height: 6, backgroundColor: '#1F2937', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%' },
  levelText: { color: '#9CA3AF', fontSize: 10 },
});