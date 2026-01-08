import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { COLORS } from '../constants/theme';

export default function InventoryScreen() {
  const { gameState, equipItem, unequipItem, sellItem } = useGame();

  // HATA ÖNLEYİCİ: Veri yüklenene kadar bekle
  if (!gameState || !gameState.inventory) {
     return <View style={styles.container}><Text style={{color:'white', marginTop:50, textAlign:'center'}}>Loading...</Text></View>;
  }

  const slots = [
    { type: 'weapon', icon: 'sword', label: 'Weapon' },
    { type: 'shield', icon: 'shield', label: 'Shield' },
    { type: 'helmet', icon: 'crown', label: 'Helm' },
    { type: 'chest', icon: 'tshirt-crew', label: 'Armor' },
    { type: 'legs', icon: 'shoe-print', label: 'Legs' },
    { type: 'ring', icon: 'ring', label: 'Ring' },
    { type: 'companion', icon: 'paw', label: 'Pet' },
  ];

  const getIconName = (icon) => {
    const map = {
      sword: 'sword', shield: 'shield', crown: 'crown', shirt: 'tshirt-crew',
      footprints: 'shoe-print', sparkles: 'sparkles', circle: 'ring',
      cat: 'cat', wolf: 'dog-side', dragon: 'fire', paw: 'paw'
    };
    return map[icon] || 'package-variant';
  };

  // Renk belirleyici (Shop ile aynı)
  const getRarityColors = (rarity) => {
    switch (rarity) {
      case 'legendary': return ['#FFD700', '#FFA500'];
      case 'epic': return ['#8A2BE2', '#9370DB'];
      default: return ['#00F0FF', '#0099CC']; // Rare
    }
  };

  const getStatValue = (val) => val || 0;

  const handleEquip = (item) => {
    if (!item.slotType) {
        Alert.alert("Info", "This item cannot be equipped.");
        return;
    }
    equipItem(item);
  };

  const handleUnequip = (slotType) => {
    unequipItem(slotType);
  };

  const handleSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.5);
    Alert.alert(
        "Sell Item",
        `Sell ${item.name} for ${sellPrice} Gold?`,
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Sell", 
                style: "destructive", 
                onPress: () => sellItem(item)
            }
        ]
    );
  };

  return (
    <View style={styles.container}>
      {/* --- HEADER (Modern Tasarım) --- */}
      <LinearGradient colors={['rgba(138,43,226,0.2)', 'transparent']} style={styles.header}>
         <View style={styles.headerTop}>
            <View style={{flexDirection:'row', alignItems:'center', gap: 10}}>
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="bag-personal" size={24} color="#FFF" />
                </View>
                <View>
                    <Text style={styles.title}>Inventory</Text>
                    <Text style={styles.subtitle}>Manage your gear</Text>
                </View>
            </View>
         </View>

         {/* KARAKTER İSTATİSTİKLERİ */}
         <View style={styles.statsContainer}>
            <View style={[styles.statBadge, { borderColor: '#FF3F3F' }]}>
                <Text style={styles.statLabel}>STR</Text>
                <Text style={[styles.statVal, {color:'#FF3F3F'}]}>+{getStatValue(gameState.stats?.strength) * 2}</Text>
            </View>
            <View style={[styles.statBadge, { borderColor: '#00F0FF' }]}>
                <Text style={styles.statLabel}>VIT</Text>
                <Text style={[styles.statVal, {color:'#00F0FF'}]}>+{getStatValue(gameState.stats?.vitality) * 1.5}</Text>
            </View>
            <View style={[styles.statBadge, { borderColor: '#8A2BE2' }]}>
                <Text style={styles.statLabel}>HP</Text>
                <Text style={[styles.statVal, {color:'#8A2BE2'}]}>+{getStatValue(gameState.maxHealth)}</Text>
            </View>
         </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- EQUIPMENT SLOTS (Yatay Kaydırmalı) --- */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Equipped</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotsScroll}>
                {slots.map((slot, index) => {
                    const equippedItem = (gameState.equippedItems || {})[slot.type];
                    const colors = equippedItem ? getRarityColors(equippedItem.rarity) : ['#333', '#444'];

                    return (
                        <View key={index} style={styles.slotWrapper}>
                            <View style={[styles.slotCard, equippedItem && { borderColor: colors[0], borderWidth: 1 }]}>
                                {equippedItem ? (
                                    <>
                                        <LinearGradient colors={colors} style={styles.slotIconBg}>
                                            <MaterialCommunityIcons name={getIconName(equippedItem.icon)} size={20} color="#FFF" />
                                        </LinearGradient>
                                        <TouchableOpacity style={styles.unequipBtn} onPress={() => handleUnequip(slot.type)}>
                                            <MaterialCommunityIcons name="close" size={10} color="#FFF" />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <View style={styles.slotIconBgEmpty}>
                                        <MaterialCommunityIcons name={slot.icon} size={20} color="#555" />
                                    </View>
                                )}
                            </View>
                            <Text style={styles.slotLabel}>{slot.label}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>

        {/* --- INVENTORY GRID (Shop Tarzı Kartlar) --- */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Backpack ({gameState.inventory.length})</Text>
            
            {gameState.inventory.length === 0 ? (
                <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="bag-personal-off" size={48} color="#444" />
                    <Text style={styles.emptyText}>Inventory is empty</Text>
                </View>
            ) : (
                <View style={styles.grid}>
                    {gameState.inventory.map((item, index) => {
                        const bonusAmount = item.statBonus?.amount || 0;
                        const bonusStatName = item.statBonus?.stat ? item.statBonus.stat.slice(0,3).toUpperCase() : '???';
                        const isEquipped = Object.values(gameState.equippedItems || {}).some(e => e.id === item.id);
                        const colors = getRarityColors(item.rarity);

                        return (
                            <TouchableOpacity 
                                key={`${item.id}-${index}`} 
                                disabled={isEquipped}
                                onPress={() => handleEquip(item)}
                                style={[
                                    styles.card, 
                                    { borderColor: colors[0] }, 
                                    isEquipped && styles.equippedCard
                                ]}
                            >
                                {/* İkon */}
                                <LinearGradient colors={colors} style={styles.cardIconBg}>
                                    <MaterialCommunityIcons name={getIconName(item.icon)} size={24} color="#FFF" />
                                </LinearGradient>
                                
                                {/* Sağ Üst: Çöp Kutusu veya Equipped Yazısı */}
                                <View style={styles.topRightBadge}>
                                    {isEquipped ? (
                                        <View style={styles.equippedTag}>
                                            <Text style={styles.equippedText}>E</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity onPress={() => handleSell(item)} style={styles.deleteBtn}>
                                            <MaterialCommunityIcons name="delete-outline" size={14} color="#FF4444" />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* İsim & Stat */}
                                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.statText}>
                                    +{bonusAmount} {bonusStatName}
                                </Text>

                                {/* Satış Fiyatı */}
                                <View style={styles.priceRow}>
                                    <MaterialCommunityIcons name="gold" size={12} color="#AAA" />
                                    <Text style={styles.sellPriceText}>+{Math.floor(item.price * 0.5)}g</Text>
                                </View>

                                {/* Alt Buton (Görsel Amaçlı) */}
                                <View style={[styles.actionBtn, isEquipped && styles.disabledBtn]}>
                                    <Text style={styles.actionBtnText}>
                                        {isEquipped ? 'EQUIPPED' : 'EQUIP'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  
  // HEADER
  header: { padding: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(138,43,226,0.3)' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#8A2BE2', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFF', fontSize: 18, fontFamily: 'Orbitron_700Bold' },
  subtitle: { color: '#AAA', fontSize: 12 },

  // STATS ROW
  statsContainer: { flexDirection: 'row', gap: 10 },
  statBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  statLabel: { color: '#AAA', fontSize: 10, marginRight: 5, fontWeight: 'bold' },
  statVal: { fontSize: 12, fontWeight: 'bold' },

  // SECTION TITLES & CONTAINERS
  sectionContainer: { marginTop: 20, paddingHorizontal: 15 },
  sectionTitle: { color: '#FFF', fontSize: 14, fontFamily: 'Orbitron_700Bold', marginBottom: 10, opacity: 0.8 },

  // EQUIPMENT SLOTS
  slotsScroll: { paddingBottom: 10 },
  slotWrapper: { alignItems: 'center', marginRight: 15 },
  slotCard: { width: 50, height: 50, borderRadius: 14, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  slotIconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  slotIconBgEmpty: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#252525', justifyContent: 'center', alignItems: 'center' },
  slotLabel: { color: '#666', fontSize: 10, marginTop: 5 },
  unequipBtn: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF4444', borderRadius: 10, padding: 2, zIndex: 10 },

  // INVENTORY GRID & CARDS
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#1E1E1E', borderRadius: 16, padding: 10, marginBottom: 15, borderWidth: 1 },
  equippedCard: { opacity: 0.6, borderColor: '#333' },
  
  cardIconBg: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  
  topRightBadge: { position: 'absolute', top: 10, right: 10 },
  deleteBtn: { backgroundColor: 'rgba(255, 68, 68, 0.1)', padding: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 68, 68, 0.3)' },
  equippedTag: { backgroundColor: '#00F0FF', width: 20, height: 20, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  equippedText: { color: '#000', fontSize: 10, fontWeight: 'bold' },

  itemName: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  statText: { color: '#00F0FF', fontSize: 10, marginBottom: 8 },
  
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  sellPriceText: { color: '#AAA', fontSize: 10 },

  actionBtn: { backgroundColor: '#333', borderRadius: 8, paddingVertical: 6, alignItems: 'center', borderWidth: 1, borderColor: '#444' },
  disabledBtn: { backgroundColor: '#222', borderColor: '#222' },
  actionBtnText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  emptyState: { alignItems: 'center', marginTop: 30 },
  emptyText: { color: '#666', marginTop: 10 },
});