import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Crown, Star } from 'lucide-react-native';
import { FONTS } from '../../constants/theme';

const PodiumItem = ({ user, rank, height, colors, borderColor, icon: Icon, iconColor }) => (
  <View style={styles.podiumItem}>
    <View style={{ marginBottom: 8 }}>
      <Icon size={rank === 1 ? 32 : 24} color={iconColor} />
    </View>
    
    <LinearGradient
      colors={colors}
      style={[styles.pillar, { height, borderColor }]}
    >
      <View style={[styles.avatarContainer, { borderColor: iconColor }]}>
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar} 
        />
      </View>
      <Text style={styles.username} numberOfLines={1}>{user.username}</Text>
      <Text style={[styles.level, { color: iconColor }]}>Lvl {user.level}</Text>
    </LinearGradient>
    
    <View style={styles.xpContainer}>
       {rank === 1 && <Star size={10} color={iconColor} />}
       <Text style={[styles.xpText, { color: iconColor }]}>{user.xp.toLocaleString()} XP</Text>
    </View>
  </View>
);

export default function Podium({ topThree }) {
  if (topThree.length < 3) return null;

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Trophy size={20} color="#C084FC" />
        <Text style={styles.title}>Top Champions</Text>
      </View>

      <View style={styles.podiumRow}>
        {/* 2nd Place */}
        <PodiumItem 
          user={topThree[1]} rank={2} height={100}
          colors={['rgba(156, 163, 175, 0.3)', 'rgba(75, 85, 99, 0.3)']}
          borderColor="rgba(156, 163, 175, 0.4)"
          icon={Trophy} iconColor="#D1D5DB"
        />

        {/* 1st Place */}
        <PodiumItem 
          user={topThree[0]} rank={1} height={140}
          colors={['rgba(250, 204, 21, 0.3)', 'rgba(202, 138, 4, 0.3)']}
          borderColor="rgba(250, 204, 21, 0.6)"
          icon={Crown} iconColor="#FACC15"
        />

        {/* 3rd Place */}
        <PodiumItem 
          user={topThree[2]} rank={3} height={80}
          colors={['rgba(217, 119, 6, 0.3)', 'rgba(146, 64, 14, 0.3)']}
          borderColor="rgba(217, 119, 6, 0.4)"
          icon={Trophy} iconColor="#F59E0B"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 20 },
  header: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 20 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  podiumRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 12 },
  podiumItem: { flex: 1, alignItems: 'center' },
  pillar: { width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderWidth: 2, alignItems: 'center', paddingTop: 12, paddingHorizontal: 4 },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, overflow: 'hidden', marginBottom: 8 },
  avatar: { width: '100%', height: '100%' },
  username: { color: '#E5E7EB', fontSize: 10, fontFamily: FONTS.medium, marginBottom: 2 },
  level: { fontSize: 10, fontFamily: FONTS.bold },
  xpContainer: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  xpText: { fontSize: 10, fontFamily: FONTS.bold },
});