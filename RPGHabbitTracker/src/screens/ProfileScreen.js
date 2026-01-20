import React, { useState } from 'react'; // 1. useState EKLENDİ
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native'; // 2. Modal bileşenleri EKLENDİ
import { useGame } from '../context/GameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- BİLEŞENLER (Senin klasör yapına uygun) ---
import HeroSection from '../components/rpg/hero/HeroSection';
import StatusBars from '../components/rpg/hero/StatusBars';
import StatsPentagon from '../components/rpg/hero/StatsPentagon';
import BadgesSection from '../components/rpg/hero/BadgesSection';
import BossWidget from '../components/rpg/boss/BossWidget';

// 3. StatsOverview BİLEŞENİNİ IMPORT ET
import StatsOverview from '../components/rpg/hero/StatsOverview';

export default function ProfileScreen({ onLogout, onNavigateBoss, onOpenCalendar, streak }) {
  const { gameState, boss } = useGame();
  
  // 4. STATE TANIMLAMASI (Hata veren kısım burasıydı)
  const [modalVisible, setModalVisible] = useState(false);

  const handleEquipBadge = (badgeId) => {
    console.log("Equipping badge:", badgeId);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. Hero Section */}
        <HeroSection
          username={gameState.username}
          level={gameState.level}
          badge={gameState.equippedBadge}
          streak={streak}
          onStreakPress={onOpenCalendar}
        />

        {/* 2. Status Bars */}
        <StatusBars
          health={gameState.health}
          maxHealth={gameState.maxHealth}
          xp={gameState.currentXP}
          maxXP={gameState.maxXP}
        />

        {/* 3. Stats Pentagon (Tıklanabilir) */}
        <View style={styles.sectionSpacing}>
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)} // Artık hata vermez
            >
                <StatsPentagon stats={gameState.stats} />
                
                <View style={styles.hintContainer}>
                    <MaterialCommunityIcons name="gesture-tap" size={14} color="#666" />
                    <Text style={styles.clickHint}>Tap for details</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* 4. Boss Widget */}
        <View style={styles.sectionSpacing}>
          <BossWidget
            bossData={boss}
            onAttack={onNavigateBoss}
          />
        </View>

        {/* 5. Badges */}
        <BadgesSection
          badges={gameState.badges}
          equippedId={gameState.equippedBadge}
          onEquip={handleEquipBadge}
        />

        {/* 6. Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>SYSTEM DISCONNECT</Text>
            <MaterialCommunityIcons name="logout-variant" size={20} color="#FF4444" />
          </TouchableOpacity>
          <Text style={styles.versionText}>v1.0.0 Beta</Text>
        </View>

      </ScrollView>

      {/* --- 5. STATS MODAL (POP-UP) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={() => setModalVisible(false)}
                    >
                        <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                    </TouchableOpacity>

                    {/* Grid Bileşeni */}
                    <StatsOverview stats={gameState.stats} />
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },

  sectionSpacing: {
    marginTop: 24
  },

  // --- EKSİK OLAN STİLLER EKLENDİ ---
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
    marginBottom: 10,
    gap: 5
  },
  clickHint: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Orbitron_400Regular'
  },

  // Modal Stilleri
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: -10,
    padding: 10,
    zIndex: 10
  },

  // Logout Stilleri
  logoutContainer: {
    marginTop: 40,
    marginBottom: 20,
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
    gap: 10,
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