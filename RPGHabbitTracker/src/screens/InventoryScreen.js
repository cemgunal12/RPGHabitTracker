import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';

export default function InventoryScreen() {
  // GÜNCELLEME: sellItem fonksiyonunu çektik
  const { gameState, equipItem, unequipItem, sellItem } = useGame();

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

  const getRarityColor = (rarity) => {
     if(rarity === 'legendary') return '#FFD700';
     if(rarity === 'epic') return '#8A2BE2';
     return '#00F0FF';
  };

  const getStatValue = (val) => val || 0;

  const handleEquip = (item) => {
    if (!item.slotType) {
        Alert.alert("Info", "This item cannot be equipped (No slot type).");
        return;
    }
    equipItem(item);
  };

  const handleUnequip = (slotType) => {
    unequipItem(slotType);
  };

  // --- GÜNCELLEME: SATIŞ MANTIĞI ---
  const handleSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.5); // Yarı fiyatına sat
    Alert.alert(
        "Sell Item",
        `Sell ${item.name} for ${sellPrice} Gold?`,
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Sell", 
                style: "destructive", 
                onPress: () => {
                    const result = sellItem(item);
                    if(result.success) {
                        // Opsiyonel: Başarı mesajı
                    }
                }
            }
        ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header & Stats */}
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Character Gear</Text>
         <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>STR</Text>
                <Text style={[styles.statVal, {color:'#FF3F3F'}]}>
                    +{getStatValue(gameState.stats?.strength) * 2}
                </Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>VIT</Text>
                <Text style={[styles.statVal, {color:'#00F0FF'}]}>
                    +{getStatValue(gameState.stats?.vitality) * 1.5}
                </Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>HP</Text>
                <Text style={[styles.statVal, {color:'#8A2BE2'}]}>
                    +{getStatValue(gameState.maxHealth)}
                </Text>
            </View>
         </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- EQUIPMENT SLOTS --- */}
        <View style={styles.slotsGrid}>
            {slots.map((slot) => {
                const equippedItem = (gameState.equippedItems || {})[slot.type];

                return (
                    <View key={slot.type} style={[styles.slotContainer, equippedItem && { borderColor: getRarityColor(equippedItem.rarity) }]}>
                        {equippedItem ? (
                            <>
                                <View style={styles.slotIconBg}>
                                    <MaterialCommunityIcons 
                                        name={getIconName(equippedItem.icon)} 
                                        size={24} 
                                        color={getRarityColor(equippedItem.rarity)} 
                                    />
                                </View>
                                <Text style={[styles.slotLabel, {color: '#FFF'}]} numberOfLines={1}>{equippedItem.name}</Text>
                                <TouchableOpacity 
                                    style={styles.removeBtn} 
                                    onPress={() => handleUnequip(slot.type)}
                                >
                                    <MaterialCommunityIcons name="close" size={12} color="#FFF" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={styles.slotIconBgEmpty}>
                                    <MaterialCommunityIcons name={slot.icon} size={24} color="#444" />
                                </View>
                                <Text style={styles.slotLabel}>{slot.label}</Text>
                                <View style={styles.addBtnPlaceholder}>
                                    <MaterialCommunityIcons name="plus" size={10} color="#666" />
                                </View>
                            </>
                        )}
                    </View>
                );
            })}
        </View>

        {/* --- INVENTORY LIST --- */}
        <Text style={styles.sectionTitle}>Backpack ({gameState.inventory.length})</Text>
        
        {gameState.inventory.length === 0 ? (
            <View style={styles.emptyState}>
                <MaterialCommunityIcons name="bag-personal-off" size={48} color="#444" />
                <Text style={styles.emptyText}>Inventory is empty</Text>
            </View>
        ) : (
            <View style={styles.inventoryGrid}>
                {gameState.inventory.map((item, index) => {
                    const bonusAmount = item.statBonus?.amount || 0;
                    const bonusStatName = item.statBonus?.stat ? item.statBonus.stat.slice(0,3).toUpperCase() : '???';
                    const isEquipped = Object.values(gameState.equippedItems || {}).some(e => e.id === item.id);

                    return (
                        <TouchableOpacity 
                            key={`${item.id}-${index}`} 
                            style={[
                                styles.invItem, 
                                { borderColor: getRarityColor(item.rarity) },
                                isEquipped && styles.equippedItemOpacity 
                            ]}
                            onPress={() => handleEquip(item)}
                            disabled={isEquipped}
                        >
                            <LinearGradient colors={['#2A2A2A', '#1A1A1A']} style={styles.invItemContent}>
                                <MaterialCommunityIcons 
                                    name={getIconName(item.icon)} 
                                    size={28} 
                                    color={getRarityColor(item.rarity)} 
                                />
                                <Text style={styles.invName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.invStat}>
                                    +{bonusAmount} {bonusStatName}
                                </Text>
                                
                                {isEquipped ? (
                                    <View style={styles.equippedBadge}>
                                        <Text style={styles.equippedText}>E</Text>
                                    </View>
                                ) : (
                                    // --- GÜNCELLEME: Sadece takılı değilse çöp kutusu göster ---
                                    <TouchableOpacity 
                                        style={styles.deleteBadge}
                                        onPress={() => handleSell(item)}
                                    >
                                        <MaterialCommunityIcons name="delete" size={12} color="#FFF" />
                                    </TouchableOpacity>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}
            </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 20, backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: '#333' },
  headerTitle: { color: '#FFF', fontSize: 20, fontFamily: 'Orbitron_700Bold', textAlign: 'center', marginBottom: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center', backgroundColor: '#121212', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, borderWidth: 1, borderColor: '#333', minWidth: 80 },
  statLabel: { color: '#888', fontSize: 10, marginBottom: 4, fontFamily: 'Orbitron_500Medium' },
  statVal: { fontSize: 16, fontFamily: 'Orbitron_700Bold' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 20, justifyContent: 'center' },
  slotContainer: { width: '30%', aspectRatio: 1, backgroundColor: '#1E1E1E', borderRadius: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  slotIconBg: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  slotIconBgEmpty: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#252525', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  slotLabel: { color: '#666', fontSize: 10, fontFamily: 'Orbitron_400Regular' },
  addBtnPlaceholder: { position: 'absolute', bottom: 6, right: 6, backgroundColor: '#333', borderRadius: 10, padding: 4 },
  removeBtn: { position: 'absolute', top: 5, right: 5, backgroundColor: '#FF3F3F', borderRadius: 10, padding: 4, zIndex: 10 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontFamily: 'Orbitron_700Bold', marginLeft: 20, marginTop: 10, marginBottom: 10 },
  emptyState: { alignItems: 'center', marginTop: 30 },
  emptyText: { color: '#666', marginTop: 10, fontFamily: 'Orbitron_400Regular' },
  inventoryGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, gap: 12 },
  invItem: { width: '31%', aspectRatio: 0.85, borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  equippedItemOpacity: { opacity: 0.5 },
  invItemContent: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5 },
  invName: { color: '#FFF', fontSize: 10, marginTop: 8, textAlign: 'center', fontFamily: 'Orbitron_500Medium' },
  invStat: { color: '#888', fontSize: 9, marginTop: 2, fontFamily: 'Orbitron_400Regular' },
  
  equippedBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#00F0FF', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  equippedText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  
  // GÜNCELLEME: Çöp Kutusu Stili
  deleteBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#FF3F3F', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', zIndex: 10 }
});