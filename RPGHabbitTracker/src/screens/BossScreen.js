import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext'; 

// Components
import BossHeader from '../components/rpg/BossHeader';
import BossCardDetailed from '../components/rpg/BossCardDetailed';
import BossRewards from '../components/rpg/BossRewards';

export default function BossScreen() {
  const { gameState } = useGame();
  
  // Örnek Boss Verisi (Context'e taşınabilir)
  const boss = {
    name: "Dark Dragon",
    health: 3500,
    maxHealth: 5000,
    imageUrl: "https://via.placeholder.com/400x300/1a1a1a/FFFFFF?text=Dark+Dragon",
    bossNumber: 1,
    totalBosses: 5
  };
  
  const isDefeated = boss.health <= 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        <BossHeader 
          bossNumber={boss.bossNumber} 
          totalBosses={boss.totalBosses} 
        />

        <View style={{ height: 20 }} />

        <BossCardDetailed 
          boss={boss} 
          isDefeated={isDefeated} 
          userLevel={gameState.level} 
        />

        <BossRewards 
          xp={100 * boss.bossNumber} 
          gold={200 * boss.bossNumber} 
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});