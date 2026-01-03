import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext'; 

// Components
import ProfileHeader from '../components/rpg/ProfileHeader';
import StatsPentagon from '../components/rpg/StatsPentagon'; // YENİ
import InventoryGrid from '../components/rpg/InventoryGrid';
import BadgesSection from '../components/rpg/BadgesSection';

export default function ProfileScreen() {
  const { gameState } = useGame();

  const totalStats = Object.values(gameState.stats).reduce((a, b) => a + b, 0);

  const handleEquipBadge = (badgeId) => {
    console.log("Equipping badge:", badgeId);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Header */}
        <ProfileHeader 
          username={gameState.username}
          level={gameState.level}
          gold={gameState.gold}
          totalStats={totalStats}
        />

        {/* YENİ: Beşgen Stat Grafiği */}
        <StatsPentagon stats={gameState.stats} />

        {/* Inventory */}
        <InventoryGrid />

        {/* Badges */}
        <BadgesSection 
          badges={gameState.badges} 
          equippedId={gameState.equippedBadge}
          onEquip={handleEquipBadge}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});