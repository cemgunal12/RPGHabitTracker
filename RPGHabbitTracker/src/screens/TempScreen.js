import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// --- IMPORTLAR ---
import { useGame } from '../context/GameContext'; // Context
import { COLORS } from '../constants/theme';

// Bileşenler
import HeroSection from '../components/rpg/HeroSection';
import StatusBars from '../components/rpg/StatusBars';
import StatsGrid from '../components/rpg/StatsGrid';
import BossWidget from '../components/rpg/BossWidget';
import CalendarModal from '../components/rpg/CalendarModal'; 

export default function DashboardScreen({ habits }) {
  // 1. DÜZELTME: 'boss' verisini Context'ten çekiyoruz
  const { gameState, boss } = useGame(); 

  const [isCalendarOpen, setCalendarOpen] = useState(false);

  // Streak Hesaplama
  const calculateMaxStreak = () => {
    if (!habits || habits.length === 0) return 0;
    const max = Math.max(...habits.map(h => h.streak || 0));
    return max > 0 ? max : 0;
  };

  const currentStreak = calculateMaxStreak(); 

  const handleNavigateBoss = () => {
    alert("Boss fight loading...");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Hero Section */}
        <HeroSection
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          streak={currentStreak} 
          onStreakPress={() => setCalendarOpen(true)}
        />

        {/* 2. Barlar (HP & XP) */}
        <StatusBars
          health={gameState.health}
          maxHealth={gameState.maxHealth}
          xp={gameState.currentXP}
          maxXP={gameState.maxXP}
        />

        {/* 3. Statlar */}
        <StatsGrid stats={gameState.stats} />

        {/* 4. Boss Widget */}
        {/* 2. DÜZELTME: 'bossData' yerine context'ten gelen 'boss' değişkenini verdik */}
        <BossWidget
          bossData={boss} 
          onAttack={handleNavigateBoss}
        />

      </ScrollView>

      {/* --- Takvim Modalı --- */}
      <CalendarModal
        visible={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        habits={habits} 
        currentStreak={currentStreak}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});