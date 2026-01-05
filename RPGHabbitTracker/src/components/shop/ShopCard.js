// components/shop/ShopCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Coins } from 'lucide-react-native';
import { getIcon, getRarityColors, getBorderColor } from '../../constants/shopData';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48 - 16) / 2;

export default function ShopCard({ item, userGold, onPurchase }) {
  const affordable = userGold >= item.price;
  const rarityColors = getRarityColors(item.rarity);
  const borderColor = getBorderColor(item.rarity);

  return (
    <View style={[styles.card, { borderColor: borderColor, opacity: affordable ? 1 : 0.6 }]}>
      {/* Background Glow */}
      <LinearGradient colors={rarityColors} style={[StyleSheet.absoluteFill, { opacity: 0.05 }]} />

      {/* Icon Circle */}
      <View style={styles.cardIconWrapper}>
        <LinearGradient colors={rarityColors} style={[StyleSheet.absoluteFill, { borderRadius: 12, opacity: 0.2 }]} />
        {getIcon(item.icon, '#FFF')}
      </View>

      {/* Info */}
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>

      {/* Price & Tag */}
      <View style={styles.priceRow}>
        <View style={styles.priceTag}>
          <Coins size={14} color="#FFD700" />
          <Text style={styles.priceText}>{item.price}g</Text>
        </View>
        <LinearGradient
          colors={rarityColors}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.rarityBadge}
        >
          <Text style={styles.rarityText}>{item.rarity}</Text>
        </LinearGradient>
      </View>

      {/* Buy Button */}
      <TouchableOpacity
        onPress={() => affordable && onPurchase(item)}
        disabled={!affordable}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={affordable ? ['#8A2BE2', '#00F0FF'] : ['#2A2A2A', '#2A2A2A']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.buyButton}
        >
          <Text style={[styles.buyButtonText, !affordable && { color: '#606060' }]}>
            {affordable ? 'BUY' : 'Need Gold'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: ITEM_WIDTH, backgroundColor: '#1E1E1E', borderRadius: 16, padding: 12, borderWidth: 1, marginBottom: 16, overflow: 'hidden' },
  cardIconWrapper: { width: 64, height: 64, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12, overflow: 'hidden' },
  itemName: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  itemDesc: { color: '#A0A0A0', fontSize: 12, marginBottom: 12, height: 32 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  priceTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  priceText: { color: '#FFD700', fontWeight: 'bold', fontSize: 14 },
  rarityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  rarityText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textTransform: 'capitalize' },
  buyButton: { paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  buyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});