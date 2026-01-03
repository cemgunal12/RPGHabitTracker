import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Sparkles } from 'lucide-react-native'; // Sparkles import edildi
import { COLORS, FONTS } from '../../constants/theme';

export default function BadgesSection({ badges, equippedId, onEquip }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Trophy size={20} color="#FFD700" />
        <Text style={styles.title}>Achievement Badges</Text>
        <Text style={styles.count}>{badges.length} Unlocked</Text>
      </View>

      {badges.length === 0 ? (
        <View style={styles.emptyState}>
          <Trophy size={40} color="#606060" />
          <Text style={styles.emptyText}>No badges earned yet</Text>
          <Text style={styles.emptySub}>Defeat bosses to earn badges!</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {badges.map((badge) => {
            const isEquipped = badge.id === equippedId;
            return (
              <TouchableOpacity
                key={badge.id}
                onPress={() => onEquip(badge.id)}
                style={[
                  styles.badgeCard,
                  isEquipped && styles.equippedCard
                ]}
              >
                {isEquipped && (
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.equippedLabel}
                  >
                    <Text style={styles.equippedText}>Equipped</Text>
                  </LinearGradient>
                )}
                
                {/* Badge Icon (Emoji olarak geliyor genelde) */}
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.bossName}>{badge.bossName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Tip Section - İkon hatasını düzeltmek için Sparkles kullanıldı */}
      <View style={styles.tipContainer}>
        <View style={styles.tipRow}>
          <Sparkles size={16} color={COLORS.secondary} />
          <View style={{flex: 1}}>
            <Text style={styles.tipTitle}>Tip</Text>
            <Text style={styles.tipText}>Click on badges to equip them on your profile.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E1E1E', marginHorizontal: 20, marginBottom: 100, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold, flex: 1 },
  count: { color: '#A0A0A0', fontSize: 12 },
  emptyState: { alignItems: 'center', padding: 30 },
  emptyText: { color: '#A0A0A0', marginTop: 10, fontSize: 14 },
  emptySub: { color: '#606060', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard: { width: '48%', backgroundColor: '#121212', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  equippedCard: { borderColor: COLORS.secondary, backgroundColor: 'rgba(0,240,255,0.05)' },
  equippedLabel: { position: 'absolute', top: 8, right: 8, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  equippedText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  badgeIcon: { fontSize: 32, marginBottom: 8 },
  badgeName: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold, textAlign: 'center' },
  bossName: { color: '#A0A0A0', fontSize: 10, textAlign: 'center' },
  
  tipContainer: { marginTop: 20, backgroundColor: 'rgba(138,43,226,0.1)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138,43,226,0.2)' },
  tipRow: { flexDirection: 'row', gap: 10 },
  tipTitle: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold, marginBottom: 2 },
  tipText: { color: '#A0A0A0', fontSize: 11 },
});