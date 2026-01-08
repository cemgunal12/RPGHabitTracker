import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { SHOP_ITEMS } from '../constants/shopData'; // Dosya yolunun doğruluğundan emin ol
import { COLORS } from '../constants/theme';

export default function ShopScreen({ onPurchase }) {
  const { gameState } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'weapon', label: 'Weapons' },
    { id: 'armor', label: 'Armor' },
    { id: 'accessory', label: 'Acc.' },
    { id: 'companion', label: 'Pets' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? SHOP_ITEMS 
    : SHOP_ITEMS.filter(item => item.category === selectedCategory);

  const getIconName = (icon) => {
    const map = {
      sword: 'sword', shield: 'shield', crown: 'crown', shirt: 'tshirt-crew',
      footprints: 'shoe-print', sparkles: 'star-four-points', circle: 'ring',
      cat: 'cat', 
      
      // DÜZELTME BURADA: 'wolf' verisi için 'dog-side' ikonunu kullanıyoruz
      wolf: 'dog-side', 
      
      dragon: 'fire', zap: 'flash'
    };
    return map[icon] || 'package-variant';
  };

  const getRarityColors = (rarity) => {
    switch (rarity) {
      case 'legendary': return ['#FFD700', '#FFA500'];
      case 'epic': return ['#8A2BE2', '#9370DB'];
      default: return ['#00F0FF', '#0099CC']; // Rare
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['rgba(138,43,226,0.2)', 'transparent']} style={styles.header}>
        <View style={styles.headerTop}>
            <View style={{flexDirection:'row', alignItems:'center', gap: 10}}>
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="shopping" size={24} color="#FFF" />
                </View>
                <View>
                    <Text style={styles.title}>Equipment Shop</Text>
                    <Text style={styles.subtitle}>Upgrade your arsenal</Text>
                </View>
            </View>
            <View style={styles.goldBadge}>
                <MaterialCommunityIcons name="gold" size={20} color="#FFD700" />
                <Text style={styles.goldText}>{gameState.gold}g</Text>
            </View>
        </View>
        
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {categories.map(cat => (
                <TouchableOpacity 
                    key={cat.id} 
                    onPress={() => setSelectedCategory(cat.id)}
                    style={[styles.catButton, selectedCategory === cat.id && styles.catActive]}
                >
                    <Text style={[styles.catText, selectedCategory === cat.id && styles.catTextActive]}>
                        {cat.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </LinearGradient>

      {/* Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {filteredItems.map(item => {
            const canAfford = gameState.gold >= item.price;
            const isOwned = gameState.inventory.some(i => i.id === item.id);
            const colors = getRarityColors(item.rarity);

            return (
                <TouchableOpacity 
                    key={item.id} 
                    disabled={!canAfford || isOwned}
                    onPress={() => onPurchase(item)}
                    style={[styles.card, { borderColor: colors[0] }, isOwned && styles.ownedCard]}
                >
                    <LinearGradient colors={colors} style={styles.cardIconBg}>
                        <MaterialCommunityIcons name={getIconName(item.icon)} size={24} color="#FFF" />
                    </LinearGradient>
                    
                    <View style={styles.rarityBadge}>
                         <Text style={styles.rarityText}>{item.rarity}</Text>
                    </View>

                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.statText}>
                        +{item.statBonus.amount} {item.statBonus.stat.toUpperCase()}
                    </Text>

                    <View style={styles.priceRow}>
                        <MaterialCommunityIcons name="gold" size={14} color="#FFD700" />
                        <Text style={styles.priceText}>{item.price}g</Text>
                    </View>

                    <View style={[styles.buyBtn, (!canAfford || isOwned) && styles.disabledBtn]}>
                        <Text style={styles.buyBtnText}>
                            {isOwned ? 'OWNED' : canAfford ? 'BUY' : 'LOCKED'}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(138,43,226,0.3)' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#8A2BE2', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFF', fontSize: 18, fontFamily: 'Orbitron_700Bold' },
  subtitle: { color: '#AAA', fontSize: 12 },
  goldBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#FFD700' },
  goldText: { color: '#FFD700', marginLeft: 5, fontWeight: 'bold' },
  
  catScroll: { marginTop: 10 },
  catButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1E1E1E', marginRight: 10, borderWidth: 1, borderColor: '#333' },
  catActive: { backgroundColor: '#8A2BE2', borderColor: '#00F0FF' },
  catText: { color: '#AAA', fontSize: 12 },
  catTextActive: { color: '#FFF', fontWeight: 'bold' },

  grid: { padding: 15, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 100 },
  card: { width: '48%', backgroundColor: '#1E1E1E', borderRadius: 16, padding: 10, marginBottom: 15, borderWidth: 1 },
  ownedCard: { opacity: 0.5 },
  cardIconBg: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  rarityBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 6, borderRadius: 4 },
  rarityText: { color: '#FFF', fontSize: 8, textTransform: 'uppercase' },
  itemName: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  statText: { color: '#00F0FF', fontSize: 10, marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  priceText: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },
  buyBtn: { backgroundColor: '#8A2BE2', borderRadius: 8, paddingVertical: 6, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#333' },
  buyBtnText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' }
});