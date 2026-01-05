import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS } from '../../constants/theme';

export default function BossWidget({ bossData, onAttack }) {
  if (!bossData) return null;

  // Can yüzdesi hesabı
  const healthPercent = Math.max(0, (bossData.health / bossData.maxHealth) * 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Glow */}
        <LinearGradient colors={['rgba(255, 63, 63, 0.1)', 'transparent']} style={StyleSheet.absoluteFill} />
        
        {/* Boss Image */}
        <View style={styles.imageContainer}>
          {/* GÜNCELLEME: resizeMode EKLENDİ */}
          <Image 
            source={{ uri: bossData.imageUrl }} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.bossLabel}>
             <MaterialCommunityIcons name="sword-cross" size={14} color="#FFF" />
             <Text style={styles.bossLabelText}>BOSS #{bossData.bossNumber}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Text style={styles.name} numberOfLines={1}>{bossData.name}</Text>
              <Text style={styles.sub}>World Boss</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <Text style={styles.sub}>Progress</Text>
              <Text style={styles.number}>{bossData.bossNumber}/{bossData.totalBosses}</Text>
            </View>
          </View>

          {/* Health Bar */}
          <View style={{marginTop: 12}}>
            <View style={styles.hpRow}>
              <Text style={styles.hpLabel}>BOSS HEALTH</Text>
              <Text style={styles.hpValue}>{Math.floor(bossData.health)} / {bossData.maxHealth}</Text>
            </View>
            <View style={styles.track}>
              <LinearGradient
                colors={['#FF3F3F', '#FF1744']}
                style={[styles.fill, { width: `${healthPercent}%` }]}
              />
            </View>
          </View>

          {/* Attack Button */}
          <TouchableOpacity onPress={onAttack} activeOpacity={0.8} style={{marginTop: 16}}>
            <LinearGradient
              colors={['#FF3F3F', '#FF1744']}
              style={styles.button}
            >
              <MaterialCommunityIcons name="sword" size={20} color="#FFF" />
              <Text style={styles.buttonText}>ATTACK BOSS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 20, marginBottom: 20 },
  container: { backgroundColor: '#1E1E1E', borderRadius: 20, borderWidth: 2, borderColor: 'rgba(255, 63, 63, 0.4)', overflow: 'hidden' },
  imageContainer: { height: 160, width: '100%', position: 'relative', backgroundColor: '#000' },
  image: { width: '100%', height: '100%' },
  bossLabel: { position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255, 63, 63, 0.9)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#FF3F3F' },
  bossLabelText: { color: '#FFF', fontSize: 10, fontFamily: FONTS.bold },
  info: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  sub: { color: '#A0A0A0', fontSize: 12 },
  number: { color: '#FF3F3F', fontSize: 16, fontFamily: FONTS.bold },
  hpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  hpLabel: { color: '#A0A0A0', fontSize: 10, fontFamily: FONTS.bold },
  hpValue: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold },
  track: { height: 12, backgroundColor: '#121212', borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255, 63, 63, 0.3)' },
  fill: { height: '100%', borderRadius: 6 },
  button: { padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { color: '#FFF', fontFamily: FONTS.bold, fontSize: 14 },
});