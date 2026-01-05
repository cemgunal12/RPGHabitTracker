import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Vibration } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext'; 

// Components
import BossHeader from '../components/rpg/BossHeader';
import BossCardDetailed from '../components/rpg/BossCardDetailed';
import BossRewards from '../components/rpg/BossRewards';
import { COLORS } from '../constants/theme';

export default function BossScreen() {
  // 1. Context'ten güncel boss verisini ve saldırı fonksiyonunu çekiyoruz
  const { gameState, boss, damageBoss } = useGame();
  
  const isDefeated = boss.health <= 0;

  // Saldırı Mantığı
  const handleAttack = () => {
    // Hasar hesaplama: Sabit 50 + (Karakterin Gücü * 5)
    // "stats.mind" veya senin belirlediğin bir stat'ı kullanabilirsin.
    // Şimdilik örnek olarak Vitality ve Mind toplamını hasar olarak alalım.
    const playerDamage = 50 + ((gameState.stats.vitality || 0) + (gameState.stats.mind || 0)) * 2;
    
    // Titreşim efekti (Opsiyonel, telefonda güzel hissettirir)
    Vibration.vibrate(50);
    
    // Context'teki fonksiyonu çağır
    damageBoss(playerDamage);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}>
        
        {/* Header: Kaçıncı Boss olduğunu gösterir */}
        <BossHeader 
          bossNumber={boss.bossNumber} 
          totalBosses={boss.totalBosses} 
        />

        <View style={{ height: 20 }} />

        {/* Boss Kartı: Resim, Can Barı, İsim */}
        {/* Artık veriler tamamen Context'ten geliyor */}
        <BossCardDetailed 
          boss={boss} 
          isDefeated={isDefeated} 
          userLevel={gameState.level} 
        />

        {/* --- SALDIRI BUTONU --- */}
        {!isDefeated ? (
          <TouchableOpacity 
            onPress={handleAttack} 
            activeOpacity={0.7}
            style={styles.attackButtonContainer}
          >
            <LinearGradient
              colors={['#FF3F3F', '#8B0000']}
              style={styles.attackButton}
            >
              <MaterialCommunityIcons name="sword-cross" size={32} color="#FFF" />
              <Text style={styles.attackText}>ATTACK</Text>
              <Text style={styles.damageText}>
                DMG: {50 + ((gameState.stats.vitality || 0) + (gameState.stats.mind || 0)) * 2}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.defeatedContainer}>
            <Text style={styles.defeatedText}>BOSS DEFEATED</Text>
            <Text style={styles.waitingText}>Searching for next opponent...</Text>
          </View>
        )}

        {/* Ödüller: Boss sırasına göre artan ödüller */}
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
  
  attackButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  attackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6666',
  },
  attackText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Orbitron_700Bold',
    marginLeft: 10,
    letterSpacing: 2,
  },
  damageText: {
    position: 'absolute',
    right: 15,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 10,
  },
  
  defeatedContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(0, 255, 128, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 128, 0.3)',
    marginHorizontal: 20,
  },
  defeatedText: {
    color: '#00FF80',
    fontSize: 20,
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
  },
  waitingText: {
    color: '#888',
    marginTop: 5,
    fontFamily: 'Orbitron_400Regular',
  }
});