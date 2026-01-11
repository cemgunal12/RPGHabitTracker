import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme';

export default function BadgesSection({ badges, equippedId, onEquip }) {
  return (
    <View style={styles.container}>
      {/* --- BAŞLIK --- */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="trophy-award" size={20} color="#FFD700" />
        <Text style={styles.title}>Achievement Badges</Text>
        <Text style={styles.count}>{badges?.length || 0} Unlocked</Text>
      </View>

      {/* --- ROZET LİSTESİ --- */}
      {(!badges || badges.length === 0) ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="trophy-outline" size={40} color="#606060" />
          <Text style={styles.emptyText}>No badges earned yet</Text>
          <Text style={styles.emptySub}>Defeat bosses to earn legendary badges!</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {badges.map((badge, index) => {
            // Benzersiz ID veya Index kullanarak key oluştur
            const uniqueKey = badge.id || `badge-${index}`;
            const isEquipped = badge.id === equippedId;

            return (
              <TouchableOpacity
                key={uniqueKey}
                onPress={() => onEquip(badge.id)}
                activeOpacity={0.7}
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
                    <Text style={styles.equippedText}>EQUIPPED</Text>
                  </LinearGradient>
                )}

                {/* Badge Icon (Emoji veya Text) */}
                <Text style={styles.badgeIcon}>{badge.icon || '🏅'}</Text>

                <Text style={styles.badgeName} numberOfLines={1}>{badge.name}</Text>
                <Text style={styles.bossName} numberOfLines={1}>{badge.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* --- İPUCU KUTUSU --- */}
      <View style={styles.tipContainer}>
        <View style={styles.tipRow}>
          <MaterialCommunityIcons name="creation" size={20} color={COLORS.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>Tap on a badge to showcase it on your profile.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginBottom: 40, // Alt boşluk artırıldı
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Orbitron_700Bold',
    flex: 1
  },
  count: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular'
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#121212',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333'
  },
  emptyText: {
    color: '#A0A0A0',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Orbitron_500Medium'
  },
  emptySub: {
    color: '#606060',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4
  },

  // Grid & Cards
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Kartları yay
    gap: 12
  },
  badgeCard: {
    width: '48%', // 2'li grid
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)',
    marginBottom: 10,
    position: 'relative'
  },
  equippedCard: {
    borderColor: COLORS.secondary,
    backgroundColor: 'rgba(0,240,255,0.05)'
  },
  equippedLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  equippedText: {
    color: '#000',
    fontSize: 8,
    fontWeight: 'bold'
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8
  },
  badgeName: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Orbitron_500Medium',
    textAlign: 'center',
    marginBottom: 2
  },
  bossName: {
    color: '#A0A0A0',
    fontSize: 10,
    textAlign: 'center'
  },

  // Tip Section
  tipContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(138,43,226,0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.2)'
  },
  tipRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  tipTitle: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Orbitron_700Bold',
    marginBottom: 2
  },
  tipText: {
    color: '#A0A0A0',
    fontSize: 11,
    fontFamily: 'Orbitron_400Regular'
  },
});