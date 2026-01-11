import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useGame } from '../context/GameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeroSection from '../components/rpg/hero/HeroSection';
import StatusBars from '../components/rpg/hero/StatusBars';
import StatsPentagon from '../components/rpg/hero/StatsPentagon';
import BadgesSection from '../components/rpg/hero/BadgesSection';
import BossWidget from '../components/rpg/boss/BossWidget';


export default function ProfileScreen({ onLogout, onNavigateBoss, onOpenCalendar, streak }) {
  const { gameState, boss } = useGame();

  const handleEquipBadge = (badgeId) => {
    console.log("Equipping badge:", badgeId);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Hero Section */}
        <HeroSection
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          // GÜNCELLEME: Gerçek streak verisi ve tıklama fonksiyonu
          streak={streak}
          onStreakPress={onOpenCalendar}
        />

        {/* 2. Status Bars */}
        <StatusBars
          health={gameState.health}
          maxHealth={gameState.maxHealth}
          xp={gameState.currentXP}
          maxXP={gameState.maxXP}
        />

        {/* 3. Stats Pentagon */}
        <View style={styles.sectionSpacing}>
          <StatsPentagon stats={gameState.stats} />
        </View>

        {/* 4. Boss Widget */}
        <View style={styles.sectionSpacing}>
          <BossWidget
            bossData={boss}
            onAttack={onNavigateBoss}
          />
        </View>

        {/* 5. Badges */}
        <BadgesSection
          badges={gameState.badges}
          equippedId={gameState.equippedBadge}
          onEquip={handleEquipBadge}
        />

        {/* 6. Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>SYSTEM DISCONNECT</Text>
            <MaterialCommunityIcons name="logout-variant" size={20} color="#FF4444" />
          </TouchableOpacity>
          <Text style={styles.versionText}>v1.0.0 Beta</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },

  sectionSpacing: {
    marginTop: 24
  },

  logoutContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    backgroundColor: 'rgba(255, 68, 68, 0.05)',
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    color: '#FF4444',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  versionText: {
    color: '#444',
    fontSize: 10,
    marginTop: 10,
    fontFamily: 'Orbitron_400Regular'
  }
});