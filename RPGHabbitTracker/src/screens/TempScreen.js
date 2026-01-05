import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// --- IMPORTLAR ---
import { useGame } from '../context/GameContext';
import { COLORS } from '../constants/theme';

// Bileşenler
import HeroSection from '../components/rpg/HeroSection';
import StatusBars from '../components/rpg/StatusBars';
import StatsGrid from '../components/rpg/StatsGrid';
import BossWidget from '../components/rpg/BossWidget';
import CalendarModal from '../components/rpg/CalendarModal'; 

export default function DashboardScreen({ habits }) {
  const { gameState } = useGame();
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  // --- GÜNCELLEME: Streak Hesaplama Mantığı ---
  // Şimdilik habits array'indeki en yüksek streak'i alıyoruz.
  const calculateMaxStreak = () => {
    if (!habits || habits.length === 0) return 0;
    // En yüksek streak'e sahip alışkanlığı bul
    const max = Math.max(...habits.map(h => h.streak || 0));
    return max > 0 ? max : 0;
  };

  const currentStreak = calculateMaxStreak(); 
  // NOT: Eğer sabit bir değer (5) görmek istiyorsanız üstteki satırı silip şunu yazın:
  // const currentStreak = 5;

  const bossData = {
    name: "Dark Dragon",
    health: 3500,
    maxHealth: 5000,
    imageUrl: "https://via.placeholder.com/400x200/000000/FFFFFF?text=Dark+Dragon",
    bossNumber: 1,
    totalBosses: 5
  };

  const handleNavigateBoss = () => {
    alert("Boss fight loading...");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Hero Section */}
        {/* GÜNCELLEME: Hesaplanan streak'i buraya gönderiyoruz */}
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
        <BossWidget
          bossData={bossData}
          onAttack={handleNavigateBoss}
        />

      </ScrollView>

      {/* --- Takvim Modalı --- */}
      {/* GÜNCELLEME: Hesaplanan streak'i buraya da gönderiyoruz */}
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