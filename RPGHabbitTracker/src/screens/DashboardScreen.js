import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// --- IMPORT FIXES HERE ---
// We're inside src/screens, so just go up one folder (../)
import { useGame } from '../context/GameContext';
import { COLORS } from '../constants/theme';

// Components (to reach src/components folder, single ../ is enough)
import HeroSection from '../components/rpg/HeroSection';
import StatusBars from '../components/rpg/StatusBars';
import StatsGrid from '../components/rpg/StatsGrid';
import BossWidget from '../components/rpg/BossWidget';

export default function DashboardScreen({ habits }) {
  const { gameState } = useGame();

  // Sample Boss Data (Can be moved to Context later)
  const bossData = {
    name: "Dark Dragon",
    health: 3500,
    maxHealth: 5000,
    imageUrl: "https://via.placeholder.com/400x200/000000/FFFFFF?text=Dark+Dragon",
    bossNumber: 1,
    totalBosses: 5
  };

  const handleNavigateBoss = () => {
    // Navigation logic
    alert("Attacking the Boss!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Top Section (Hero) */}
        <HeroSection
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          streak={0}
          onStreakPress={() => alert('Calendar Modal Will Open')}
        />

        {/* 2. Bars (HP & XP) */}
        <StatusBars
          health={gameState.health}
          maxHealth={gameState.maxHealth}
          xp={gameState.currentXP}
          maxXP={gameState.maxXP}
        />

        {/* 3. Stats */}
        <StatsGrid stats={gameState.stats} />

        {/* 4. Boss Widget */}
        <BossWidget
          bossData={bossData}
          onAttack={handleNavigateBoss}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});