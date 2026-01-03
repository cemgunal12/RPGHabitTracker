import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { Trophy, Sparkles, Star, Zap, Coins } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme'; // Theme file path

const { width, height } = Dimensions.get('window');

// --- SUB-COMPONENT: Reward Row (To prevent repeating code) ---
const RewardItem = ({ icon: Icon, color, label, amount, suffix = '' }) => (
  <LinearGradient
    colors={[`${color}33`, 'transparent']} // %20 opacity (hex 33)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[styles.rewardRow, { borderColor: `${color}66` }]} // %40 opacity
  >
    <View style={styles.rewardLeft}>
      <View style={[styles.rewardIconBox, { backgroundColor: color }]}>
        <Icon color="#121212" size={16} fill="#121212" />
      </View>
      <Text style={styles.rewardLabel}>{label}</Text>
    </View>
    <Text style={[styles.rewardAmount, { color: color }]}>
      +{amount}{suffix}
    </Text>
  </LinearGradient>
);

// --- SUB-COMPONENT: Confetti Effect (Simple Animation) ---
const ConfettiStar = ({ delay, color, style }) => {
  const animValue = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: height,
          duration: 2000 + Math.random() * 1000,
          delay: delay,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.confetti, style, { transform: [{ translateY: animValue }] }]}>
      <Star color={color} fill={color} size={16} />
    </Animated.View>
  );
};

// --- MAIN COMPONENT: QuestCompleteModal ---
export function QuestCompleteModal({
  isOpen,
  onClose,
  questName,
  xpGained,
  goldGained,
  statGained,
  isLevelUp = false,
  newLevel,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Modal kapalıysa null döndür
  if (!isOpen) return null;

  return (
    <Modal
      transparent={true}
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        {/* 1. KONFETİ EFEKTİ */}
        {showConfetti && (
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {[...Array(15)].map((_, i) => (
              <ConfettiStar
                key={i}
                delay={Math.random() * 1000}
                color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#8A2BE2' : '#00F0FF'}
                style={{ left: Math.random() * width }}
              />
            ))}
          </View>
        )}

        {/* 2. ANA KART */}
        <View style={styles.cardContainer}>
          {/* Arkadaki Glow Efekti */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.cardGlow}
          />

          <View style={styles.cardContent}>

            {/* HEADER SECTION */}
            <View style={styles.header}>
              {isLevelUp ? (
                <>
                  <View style={styles.iconWrapper}>
                    <View style={styles.iconGlow} />
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.secondary]}
                      style={styles.iconCircle}
                    >
                      <Trophy color="#FFF" size={48} />
                    </LinearGradient>
                  </View>
                  <Text style={styles.levelUpTitle}>LEVEL UP!</Text>
                  <Text style={styles.levelText}>Level {newLevel}</Text>
                </>
              ) : (
                <>
                  <View style={styles.iconWrapper}>
                    <View style={[styles.iconGlow, { backgroundColor: COLORS.secondary }]} />
                    <LinearGradient
                      colors={[COLORS.secondary, COLORS.primary]}
                      style={styles.iconCircle}
                    >
                      <Sparkles color="#FFF" size={40} />
                    </LinearGradient>
                  </View>
                  <Text style={styles.questCompleteTitle}>Quest Complete!</Text>
                </>
              )}
            </View>

            {/* QUEST NAME */}
            <View style={styles.questNameBox}>
              <Text style={styles.questNameText}>{questName}</Text>
            </View>

            {/* ÖDÜLLER LİSTESİ */}
            <View style={styles.rewardsContainer}>
              <RewardItem
                icon={Zap}
                color={COLORS.primary} // #8A2BE2
                label="Experience"
                amount={xpGained}
                suffix=" XP"
              />

              <RewardItem
                icon={Coins}
                color="#FFD700"
                label="Gold"
                amount={goldGained}
                suffix="g"
              />

              {statGained && (
                <RewardItem
                  icon={Star}
                  color={COLORS.secondary} // #00F0FF
                  label={statGained.name}
                  amount={statGained.amount}
                />
              )}
            </View>

            {/* DEVAM BUTONU */}
            <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueButton}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
}

// --- STYLES (CSS CLASSES KARŞILIĞI) ---
const styles = StyleSheet.create({
  // Genel Overlay (bg-black/80 backdrop-blur-sm)
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Confetti
  confetti: {
    position: 'absolute',
    top: -50,
  },

  // Kart Yapısı
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute',
    top: -4, left: -4, right: -4, bottom: -4,
    borderRadius: 28,
    opacity: 0.4,
  },
  cardContent: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    // Shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    opacity: 0.6,
  },
  iconCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  levelUpTitle: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.primary, // Gradient text zor olduğu için primary renk
    marginBottom: 4,
    textShadowColor: COLORS.secondary,
    textShadowRadius: 10,
  },
  levelText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: FONTS.medium,
  },
  questCompleteTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFF',
  },

  // Quest Name Box
  questNameBox: {
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)',
    width: '100%',
  },
  questNameText: {
    color: COLORS.secondary,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },

  // Rewards Area
  rewardsContainer: {
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardIconBox: {
    padding: 6,
    borderRadius: 8,
  },
  rewardLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: FONTS.regular,
    textTransform: 'capitalize',
  },
  rewardAmount: {
    fontSize: 14,
    fontFamily: FONTS.bold,
  },

  // Button
  continueButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});