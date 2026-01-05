// components/shop/ShopHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBag, Coins } from 'lucide-react-native';

export default function ShopHeader({ gold }) {
  return (
    <LinearGradient
      colors={['rgba(138, 43, 226, 0.2)', 'transparent']}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        {/* Title Section */}
        <View style={styles.titleRow}>
          <LinearGradient colors={['#8A2BE2', '#00F0FF']} style={styles.iconBox}>
            <ShoppingBag size={24} color="#FFF" />
          </LinearGradient>
          <View>
            <Text style={styles.headerTitle}>Rewards Shop</Text>
            <Text style={styles.headerSubtitle}>Upgrade your character</Text>
          </View>
        </View>

        {/* Gold Display */}
        <View style={styles.goldContainer}>
          <View style={styles.goldRow}>
            <View style={styles.coinIconBox}>
              <LinearGradient colors={['#FFD700', '#FFA500']} style={StyleSheet.absoluteFill} />
              <Coins size={16} color="#121212" />
            </View>
            <Text style={styles.goldLabel}>Your Gold</Text>
          </View>
          <Text style={styles.goldAmount}>{gold}g</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: { paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(138, 43, 226, 0.3)' },
  headerContent: { paddingHorizontal: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  iconBox: { padding: 12, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#A0A0A0' },
  goldContainer: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  goldRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  coinIconBox: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  goldLabel: { color: '#A0A0A0', fontSize: 14 },
  goldAmount: { fontSize: 24, fontWeight: 'bold', color: '#FFD700' },
});