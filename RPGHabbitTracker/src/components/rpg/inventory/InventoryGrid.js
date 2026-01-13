import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Shield, Trash2, PackageOpen } from 'lucide-react-native';
import { FONTS } from '../../../constants/theme';
import { useGame } from '../../../context/GameContext';

// ÖNEMLİ DEĞİŞİKLİK: getIcon fonksiyonunu buradan çekiyoruz
// (Dosya yolunuzun doğru olduğundan emin olun, genelde ../../../constants/shopData şeklindedir)
import { getIcon } from '../../../constants/shopData'; 

export default function InventoryGrid() {
  const { gameState, sellItem } = useGame();

  const handleSellRequest = (item) => {
    const sellPrice = Math.floor(item.price * 0.5);

    Alert.alert(
      "Sell Item",
      `Are you sure you want to sell ${item.name} for ${sellPrice} Gold?`,
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

  const getRarityColor = (rarity) => {
    if (rarity === 'legendary') return '#FFD700';
    if (rarity === 'epic') return '#8A2BE2';
    return '#00F0FF'; // Rare/Default
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Shield size={20} color="#00F0FF" />
        <Text style={styles.title}>Inventory ({gameState.inventory.length})</Text>
      </View>

      {gameState.inventory.length === 0 ? (
        <View style={styles.emptyState}>
          <PackageOpen size={40} color="#333" />
          <Text style={styles.emptyText}>Your inventory is empty.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {gameState.inventory.map((item, index) => (
            <View
              key={`${item.id}-${index}`}
              style={[styles.slot, { borderColor: getRarityColor(item.rarity) }]}
            >
              {/* Eşya İkonu - Artık shopData'dan gelen fonksiyonu kullanıyor */}
              {getIcon(item.icon, getRarityColor(item.rarity), 24)}

              {/* Eşya İsmi */}
              <Text style={styles.slotName} numberOfLines={1}>{item.name}</Text>

              {/* --- ÇÖP KUTUSU BUTONU --- */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleSellRequest(item)}
                activeOpacity={0.7}
              >
                <View style={styles.deleteBg}>
                  <Trash2 size={12} color="#FF4444" />
                </View>
              </TouchableOpacity>

              {/* Satış Fiyatı */}
              <Text style={styles.sellPriceText}>+{Math.floor(item.price * 0.5)}g</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.hint}>Tap the trash icon to sell items for gold.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: FONTS.bold
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    width: '30%', // Grid yapısı
    aspectRatio: 0.9,
    backgroundColor: '#121212',
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 5,
    position: 'relative',
  },
  slotName: {
    color: '#DDD',
    fontSize: 10,
    fontFamily: FONTS.medium,
    textAlign: 'center'
  },
  deleteButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
  },
  deleteBg: {
    backgroundColor: '#2A1111',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellPriceText: {
    color: '#FFD700',
    fontSize: 8,
    fontFamily: FONTS.regular,
    marginTop: 2
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10
  },
  emptyText: {
    color: '#666',
    fontSize: 12,
    fontFamily: FONTS.regular
  },
  hint: {
    color: '#606060',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16
  },
});