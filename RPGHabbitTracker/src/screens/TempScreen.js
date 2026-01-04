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
import CalendarModal from '../components/rpg/CalendarModal'; // YENİ EKLENDİ

export default function DashboardScreen({ habits }) {
  const { gameState } = useGame();

  // --- YENİ: Takvim Modal State'i ---
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  // Örnek Boss Verisi
  const bossData = {
    name: "Dark Dragon",
    health: 3500,
    maxHealth: 5000,
    imageUrl: "https://via.placeholder.com/400x200/000000/FFFFFF?text=Dark+Dragon",
    bossNumber: 1,
    totalBosses: 5
  };

  const handleNavigateBoss = () => {
    alert("Boss sekmesine gidiliyor...");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Üst Kısım (Hero) */}
        <HeroSection
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          streak={3} // Şimdilik sabit 3, habits verisinden hesaplanabilir
          // --- GÜNCELLEME: Butona basınca state'i true yapıyoruz ---
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

      {/* --- YENİ: Takvim Modalı Buraya Eklendi --- */}
      <CalendarModal
        visible={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        habits={habits} // App.js'den gelen habits verisini takvime gönderiyoruz
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});