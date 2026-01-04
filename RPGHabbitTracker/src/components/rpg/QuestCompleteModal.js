import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// İkonları garanti olsun diye sadece lucide-react-native'den çekiyoruz
import { Trophy, Sparkles, Zap, Star, Coins } from 'lucide-react-native';
import { FONTS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

// Basit Konfeti Parçacığı
const ConfettiPiece = ({ delay, color, startX }) => {
  const animY = useRef(new Animated.Value(-50)).current;
  const animRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animY, {
          toValue: height,
          duration: 2000 + Math.random() * 1000,
          delay: delay,
          easing: Easing.linear,
          useNativeDriver: true, // Native driver performans için true olmalı
        }),
        Animated.timing(animRotate, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const rotate = animRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={{
      position: 'absolute',
      left: startX,
      top: animY,
      transform: [{ rotate }]
    }}>
      <Star size={16} fill={color} stroke="none" color={color} />
    </Animated.View>
  );
};

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
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        
        {/* Konfeti Efekti */}
        {showConfetti && (
           <View style={StyleSheet.absoluteFill} pointerEvents="none">
             {[...Array(15)].map((_, i) => (
               <ConfettiPiece 
                 key={i} 
                 delay={Math.random() * 1000} 
                 startX={Math.random() * width}
                 color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#8A2BE2' : '#00F0FF'}
               />
             ))}
           </View>
        )}

        {/* Ana Kart */}
        <View style={styles.cardContainer}>
          {/* Arka Plan Glow */}
          <View style={styles.glow} />
          
          <View style={styles.card}>
            
            {/* Header */}
            <View style={styles.header}>
              {isLevelUp ? (
                <>
                  <View style={styles.iconWrapperLarge}>
                    <LinearGradient colors={['#8A2BE2', '#00F0FF']} style={styles.iconGradientLarge}>
                      <Trophy size={48} color="#FFF" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.levelUpTitle}>LEVEL UP!</Text>
                  <Text style={styles.levelText}>Level {newLevel}</Text>
                </>
              ) : (
                <>
                  <View style={styles.iconWrapper}>
                    <LinearGradient colors={['#00F0FF', '#8A2BE2']} style={styles.iconGradient}>
                      <Sparkles size={32} color="#FFF" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.completeTitle}>Quest Complete!</Text>
                </>
              )}
            </View>

            {/* Quest Name */}
            <View style={styles.questNameBox}>
              <Text style={styles.questNameText}>{questName}</Text>
            </View>

            {/* Rewards */}
            <View style={styles.rewardsContainer}>
              {/* XP */}
              <View style={[styles.rewardRow, { borderColor: 'rgba(138,43,226,0.4)', backgroundColor: 'rgba(138,43,226,0.1)' }]}>
                <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                   <View style={{backgroundColor:'#8A2BE2', borderRadius:6, padding:4}}>
                     <Zap size={14} color="#FFF" />
                   </View>
                   <Text style={styles.rewardLabel}>Experience</Text>
                </View>
                <Text style={[styles.rewardValue, { color: '#8A2BE2' }]}>+{xpGained} XP</Text>
              </View>

              {/* Gold */}
              <View style={[styles.rewardRow, { borderColor: 'rgba(255,215,0,0.4)', backgroundColor: 'rgba(255,215,0,0.1)' }]}>
                <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                   <View style={{backgroundColor:'#FFD700', borderRadius:6, padding:4}}>
                     <Coins size={14} color="#000" />
                   </View>
                   <Text style={styles.rewardLabel}>Gold</Text>
                </View>
                <Text style={[styles.rewardValue, { color: '#FFD700' }]}>+{goldGained}g</Text>
              </View>

              {/* Stat */}
              {statGained && (
                <View style={[styles.rewardRow, { borderColor: 'rgba(0,240,255,0.4)', backgroundColor: 'rgba(0,240,255,0.1)' }]}>
                  <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                     <View style={{backgroundColor:'#00F0FF', borderRadius:6, padding:4}}>
                       <Star size={14} color="#000" />
                     </View>
                     <Text style={[styles.rewardLabel, {textTransform:'capitalize'}]}>{statGained.name}</Text>
                  </View>
                  <Text style={[styles.rewardValue, { color: '#00F0FF' }]}>+{statGained.amount}</Text>
                </View>
              )}
            </View>

            {/* Button */}
            <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
              <LinearGradient
                colors={['#8A2BE2', '#00F0FF']}
                // --- DÜZELTME BURADA YAPILDI (Array Formatı) ---
                start={[0, 0]} 
                end={[1, 0]}
                style={styles.button}
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

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  cardContainer: { width: '100%', maxWidth: 360, position: 'relative' },
  // Glow stilini biraz basitleştirdik ki hata vermesin
  glow: { position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: 24, backgroundColor: 'rgba(138,43,226,0.3)' },
  card: { backgroundColor: '#1E1E1E', borderRadius: 20, padding: 24, borderWidth: 2, borderColor: '#8A2BE2' },
  
  header: { alignItems: 'center', marginBottom: 20 },
  iconWrapper: { marginBottom: 12 },
  iconGradient: { padding: 12, borderRadius: 30 },
  iconWrapperLarge: { marginBottom: 16 },
  iconGradientLarge: { padding: 20, borderRadius: 50 },
  
  completeTitle: { color: '#FFF', fontSize: 24, fontFamily: FONTS.bold },
  levelUpTitle: { fontSize: 32, fontFamily: FONTS.bold, color: '#00F0FF' }, 
  levelText: { color: '#FFF', fontSize: 18 },

  questNameBox: { backgroundColor: '#121212', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  questNameText: { color: '#00F0FF', textAlign: 'center', fontFamily: FONTS.medium },

  rewardsContainer: { gap: 10, marginBottom: 24 },
  rewardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 12, borderWidth: 1 },
  rewardLabel: { color: '#FFF', fontSize: 14 },
  rewardValue: { fontSize: 14, fontFamily: FONTS.bold },

  button: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontFamily: FONTS.bold },
});