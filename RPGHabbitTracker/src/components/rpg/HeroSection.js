import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Lucide yerine Expo iconları
import { COLORS, FONTS } from '../../constants/theme';

export default function HeroSection({ username, level, badge, streak, onStreakPress }) {
  return (
    <LinearGradient
      colors={['rgba(138,43,226,0.2)', 'transparent']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Avatar & Profil */}
        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.avatarBorder}>
              <Image 
                source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }} 
                style={styles.avatar} 
              />
            </LinearGradient>
            <View style={styles.levelBadge}>
               <Text style={styles.levelText}>Lv {level}</Text>
            </View>
          </View>

          <View style={styles.infoCol}>
            <Text style={styles.username}>{username}</Text>
            {badge && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            )}
          </View>

          {/* Streak Butonu */}
          <TouchableOpacity onPress={onStreakPress} style={styles.streakButton}>
            <MaterialCommunityIcons name="fire" size={24} color="#FF1744" />
            <View>
              <Text style={styles.streakValue}>{streak}</Text>
              <Text style={styles.streakLabel}>streak</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  content: { paddingHorizontal: 20 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  avatarContainer: { position: 'relative' },
  avatarBorder: { width: 80, height: 80, borderRadius: 40, padding: 3, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: '100%', height: '100%', borderRadius: 40, backgroundColor: '#333' },
  levelBadge: { position: 'absolute', bottom: -5, right: -5, backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 2, borderColor: '#121212' },
  levelText: { color: '#FFF', fontSize: 10, fontFamily: FONTS.bold },
  infoCol: { flex: 1 },
  username: { color: '#FFF', fontSize: 22, fontFamily: FONTS.bold },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,30,30,0.8)', padding: 6, borderRadius: 8, alignSelf: 'flex-start', marginTop: 6, gap: 6, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  badgeIcon: { fontSize: 16 },
  badgeName: { color: COLORS.secondary, fontSize: 12, fontFamily: FONTS.regular },
  streakButton: { backgroundColor: '#1E1E1E', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,23,68,0.4)', flexDirection: 'row', alignItems: 'center', gap: 8 },
  streakValue: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold, lineHeight: 20 },
  streakLabel: { color: '#A0A0A0', fontSize: 10 },
});