import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// --- IMPORT DÜZELTMELERİ BURADA ---
// src/screens içinde olduğumuz için sadece bir üst klasöre (../) çıkıyoruz.
import { useGame } from '../context/GameContext'; 
import { COLORS } from '../constants/theme';

// Bileşenler (src/components klasörüne ulaşmak için de tek ../ yeterli)
import HeroSection from '../components/rpg/HeroSection';
import StatusBars from '../components/rpg/StatusBars';
import StatsGrid from '../components/rpg/StatsGrid';
import BossWidget from '../components/rpg/BossWidget';

export default function DashboardScreen({ habits }) {
  const { gameState } = useGame();
  
  // Örnek Boss Verisi (İleride Context'e taşınabilir)
  const bossData = {
    name: "Dark Dragon",
    health: 3500,
    maxHealth: 5000,
    imageUrl: "https://via.placeholder.com/400x200/000000/FFFFFF?text=Dark+Dragon",
    bossNumber: 1,
    totalBosses: 5
  };

  const handleNavigateBoss = () => {
    // Navigasyon mantığı
    alert("Boss'a saldırılıyor!"); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 1. Üst Kısım (Hero) */}
        <HeroSection 
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          streak={0} 
          onStreakPress={() => alert('Calendar Modal Açılacak')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});