import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext'; 

import BossHeader from '../components/rpg/BossHeader';
import BossCardDetailed from '../components/rpg/BossCardDetailed';
import BossRewards from '../components/rpg/BossRewards';
import { FONTS } from '../constants/theme';

export default function BossScreen() {
  const { gameState, boss } = useGame();
  
  const isDefeated = boss.health <= 0;

  // Toplam hasar hesaplama (bilgilendirme için)
  const calculateDamage = (difficulty = 'medium') => {
    let habitDamage = 100; // medium default
    if (difficulty === 'easy') habitDamage = 50;
    if (difficulty === 'hard') habitDamage = 200;
    
    const characterBonus = gameState.level * 10;
    const weaponBonus = gameState.weaponDamage || 10;
    return habitDamage + characterBonus + weaponBonus;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}>
        
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

        {/* BİLGİLENDİRME KUTUSU */}
        {!isDefeated ? (
          <View style={styles.infoContainer}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(0, 240, 255, 0.1)']}
              style={styles.infoBox}
            >
              <View style={styles.infoHeader}>
                <MaterialCommunityIcons name="information" size={24} color="#00F0FF" />
                <Text style={styles.infoTitle}>How to Deal Damage</Text>
              </View>
              
              <Text style={styles.infoText}>
                Complete quests to automatically damage the boss!
              </Text>
              
              <View style={styles.damageInfo}>
                <View style={styles.damageRow}>
                  <View style={styles.damageLabel}>
                    <View style={[styles.dot, { backgroundColor: '#00FF88' }]} />
                    <Text style={styles.damageText}>Easy Quest</Text>
                  </View>
                  <Text style={styles.damageValue}>{calculateDamage('easy')} DMG</Text>
                </View>
                
                <View style={styles.damageRow}>
                  <View style={styles.damageLabel}>
                    <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />
                    <Text style={styles.damageText}>Medium Quest</Text>
                  </View>
                  <Text style={styles.damageValue}>{calculateDamage('medium')} DMG</Text>
                </View>
                
                <View style={styles.damageRow}>
                  <View style={styles.damageLabel}>
                    <View style={[styles.dot, { backgroundColor: '#FF1744' }]} />
                    <Text style={styles.damageText}>Hard Quest</Text>
                  </View>
                  <Text style={styles.damageValue}>{calculateDamage('hard')} DMG</Text>
                </View>
              </View>

              <View style={styles.bonusInfo}>
                <MaterialCommunityIcons name="sword" size={16} color="#8A2BE2" />
                <Text style={styles.bonusText}>
                  Bonus: Level x10 ({gameState.level * 10}) + Weapon ({gameState.weaponDamage || 10})
                </Text>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.defeatedContainer}>
            <LinearGradient
              colors={['rgba(0, 255, 136, 0.2)', 'rgba(0, 255, 136, 0.05)']}
              style={styles.defeatedBox}
            >
              <MaterialCommunityIcons name="trophy" size={48} color="#00FF88" />
              <Text style={styles.defeatedTitle}>BOSS DEFEATED!</Text>
              <Text style={styles.defeatedText}>The next challenge awaits...</Text>
            </LinearGradient>
          </View>
        )}

        <BossRewards 
          xp={100 * boss.bossNumber} 
          gold={200 * boss.bossNumber} 
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  
  // Bilgilendirme Kutusu
  infoContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  infoBox: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  infoText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  damageInfo: {
    gap: 10,
    marginBottom: 16,
  },
  damageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  damageLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  damageText: {
    color: '#FFF',
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  damageValue: {
    color: '#00F0FF',
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  bonusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.2)',
  },
  bonusText: {
    color: '#8A2BE2',
    fontSize: 12,
    flex: 1,
  },
  
  // Defeated Container
  defeatedContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  defeatedBox: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  defeatedTitle: {
    color: '#00FF88',
    fontSize: 24,
    fontFamily: FONTS.bold,
    letterSpacing: 2,
    marginTop: 12,
  },
  defeatedText: {
    color: '#A0A0A0',
    marginTop: 8,
    fontFamily: FONTS.regular,
  }
});