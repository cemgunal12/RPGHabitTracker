import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Coins } from 'lucide-react-native';
import { COLORS, FONTS } from '../../../constants/theme';

export default function ProfileHeader({ username, level, totalStats, gold }) {
  return (
    <LinearGradient
      colors={['rgba(138,43,226,0.2)', 'transparent']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.avatarBorder}
          >
            <Image
              source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }}
              style={styles.avatar}
            />
          </LinearGradient>
          
          <View style={styles.levelBadge}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.levelGradient}
            >
              <Text style={styles.levelText}>Level {level}</Text>
            </LinearGradient>
          </View>
        </View>

        <Text style={styles.username}>{username}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <TrendingUp size={16} color={COLORS.secondary} />
            <Text style={styles.statText}>{totalStats} Stats</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Coins size={16} color="#FFD700" />
            <Text style={[styles.statText, { color: '#FFD700' }]}>{gold}g</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  content: { alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatarBorder: { width: 120, height: 120, borderRadius: 60, padding: 4, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: '100%', height: '100%', borderRadius: 60, backgroundColor: '#333' },
  levelBadge: { position: 'absolute', bottom: -10, alignSelf: 'center' },
  levelGradient: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 2, borderColor: '#121212' },
  levelText: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold },
  username: { color: '#FFF', fontSize: 24, fontFamily: FONTS.bold, marginBottom: 12 },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,30,30,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, gap: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: '#A0A0A0', fontSize: 14, fontFamily: FONTS.medium },
  divider: { width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.2)' },
});