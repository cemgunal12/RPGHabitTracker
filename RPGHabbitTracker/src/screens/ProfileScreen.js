import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useGame } from '../context/GameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import ProfileHeader from '../components/rpg/ProfileHeader';
import StatsPentagon from '../components/rpg/StatsPentagon';
import InventoryGrid from '../components/rpg/InventoryGrid';
import BadgesSection from '../components/rpg/BadgesSection';

// App.js'den gelen onLogout fonksiyonunu prop olarak alıyoruz
export default function ProfileScreen({ onLogout }) {
  const { gameState } = useGame();

  const totalStats = Object.values(gameState.stats).reduce((a, b) => a + b, 0);

  const handleEquipBadge = (badgeId) => {
    console.log("Equipping badge:", badgeId);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <ProfileHeader 
          username={gameState.username}
          level={gameState.level}
          gold={gameState.gold}
          totalStats={totalStats}
        />

        {/* Beşgen Stat Grafiği */}
        <StatsPentagon stats={gameState.stats} />

        {/* Inventory */}
        <InventoryGrid />

        {/* Badges */}
        <BadgesSection 
          badges={gameState.badges} 
          equippedId={gameState.equippedBadge}
          onEquip={handleEquipBadge}
        />

        {/* --- LOG OUT BUTTON --- */}
        <View style={styles.logoutContainer}>
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={onLogout}
                activeOpacity={0.7}
            >
                <Text style={styles.logoutText}>SYSTEM DISCONNECT</Text>
                <MaterialCommunityIcons name="logout-variant" size={20} color="#FF4444" />
            </TouchableOpacity>
            <Text style={styles.versionText}>v1.0.0 Alpha Build</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  
  // Logout Styles
  logoutContainer: {
    marginTop: 30,
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
    gap: 10, // İkon ve yazı arası boşluk
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