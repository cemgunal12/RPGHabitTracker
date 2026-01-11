import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Swords, Shield } from 'lucide-react-native';
import { FONTS } from '../../../constants/theme';

export default function BossCardDetailed({ boss, isDefeated, userLevel }) {
  const healthPercentage = (boss.health / boss.maxHealth) * 100;

  return (
    <View style={[styles.card, isDefeated ? styles.cardDefeated : styles.cardActive]}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: boss.imageUrl }}
          style={[styles.image, isDefeated && { opacity: 0.5 }]}
        />
        <LinearGradient colors={['transparent', '#1E1E1E']} style={styles.imageOverlay} />

        {/* Badges */}
        <View style={[styles.badge, isDefeated ? styles.badgeGreen : styles.badgeRed]}>
          {isDefeated ? <Trophy size={14} color="#FFF" /> : <Swords size={14} color="#FFF" />}
          <Text style={styles.badgeText}>
            {isDefeated ? 'DEFEATED' : `BOSS #${boss.bossNumber}`}
          </Text>
        </View>

        {!isDefeated && (
          <View style={styles.threatBadge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>THREAT LEVEL: HIGH</Text>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{boss.name}</Text>
            <Text style={styles.sub}>World Boss • Level {userLevel + 5}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.bossLabel}>BOSS</Text>
            <Text style={styles.bossNum}>#{boss.bossNumber}</Text>
          </View>
        </View>

        {/* Health Bar */}
        <View style={{ marginTop: 16 }}>
          <View style={styles.hpRow}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Shield size={14} color="#FF3F3F" />
              <Text style={styles.hpLabel}>BOSS HEALTH</Text>
            </View>
            <Text style={styles.hpValue}>{boss.health} / {boss.maxHealth}</Text>
          </View>

          <View style={styles.track}>
            <LinearGradient
              colors={isDefeated ? ['#00FF88', '#00CC6A'] : ['#FF3F3F', '#FF1744']}
              style={[styles.fill, { width: `${healthPercentage}%` }]}
            />
          </View>
        </View>

        {/* Status Box */}
        <View style={[styles.statusBox, isDefeated ? styles.statusGreen : styles.statusRed]}>
          {isDefeated ? (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Trophy size={24} color="#00FF88" />
              <View>
                <Text style={styles.statusTitle}>Victory!</Text>
                <Text style={styles.statusSub}>The next boss awaits...</Text>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Swords size={24} color="#FF3F3F" />
              <View>
                <Text style={styles.statusTitle}>Attack!</Text>
                <Text style={styles.statusSub}>Complete quests to deal damage.</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E1E', borderRadius: 20, borderWidth: 2, overflow: 'hidden', marginHorizontal: 20 },
  cardActive: { borderColor: 'rgba(255, 63, 63, 0.4)' },
  cardDefeated: { borderColor: 'rgba(0, 255, 136, 0.4)', opacity: 0.8 },
  imageContainer: { height: 200, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 },
  badge: { position: 'absolute', top: 16, left: 16, flexDirection: 'row', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  badgeRed: { backgroundColor: 'rgba(255, 63, 63, 0.9)', borderColor: '#FF3F3F' },
  badgeGreen: { backgroundColor: 'rgba(0, 255, 136, 0.9)', borderColor: '#00FF88' },
  badgeText: { color: '#FFF', fontSize: 10, fontFamily: FONTS.bold },
  threatBadge: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255, 63, 63, 0.9)', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFF' },
  info: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: '#FFF', fontSize: 22, fontFamily: FONTS.bold },
  sub: { color: '#A0A0A0', fontSize: 12 },
  bossLabel: { color: '#A0A0A0', fontSize: 10, textAlign: 'right' },
  bossNum: { color: '#FF3F3F', fontSize: 18, fontFamily: FONTS.bold },
  hpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  hpLabel: { color: '#A0A0A0', fontSize: 10, fontFamily: FONTS.bold },
  hpValue: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold },
  track: { height: 12, backgroundColor: '#121212', borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  fill: { height: '100%', borderRadius: 6 },
  statusBox: { marginTop: 20, padding: 12, borderRadius: 12, borderWidth: 1 },
  statusRed: { backgroundColor: 'rgba(255, 63, 63, 0.1)', borderColor: 'rgba(255, 63, 63, 0.3)' },
  statusGreen: { backgroundColor: 'rgba(0, 255, 136, 0.1)', borderColor: 'rgba(0, 255, 136, 0.3)' },
  statusTitle: { color: '#FFF', fontFamily: FONTS.bold },
  statusSub: { color: '#A0A0A0', fontSize: 12 },
});