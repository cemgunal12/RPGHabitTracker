import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Shield, Sword, Crown, Gem, Sparkles, TrendingUp, Trophy } from 'lucide-react-native';
import { FONTS } from '../../constants/theme';

export default function InventoryGrid() {
  const equipmentSlots = [
    { name: 'Weapon', icon: Sword },
    { name: 'Armor', icon: Shield },
    { name: 'Helmet', icon: Crown },
    { name: 'Accessory', icon: Gem },
    { name: 'Ring', icon: Sparkles },
    { name: 'Boots', icon: TrendingUp },
    { name: 'Gloves', icon: Shield },
    { name: 'Artifact', icon: Crown },
    { name: 'Charm', icon: Sparkles },
    { name: 'Relic', icon: Gem },
    { name: 'Trophy', icon: Trophy },
    { name: 'Medal', icon: Trophy },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Shield size={20} color="#00F0FF" />
        <Text style={styles.title}>Equipment Inventory</Text>
      </View>

      <View style={styles.grid}>
        {equipmentSlots.map((slot, index) => {
          const Icon = slot.icon;
          return (
            <View key={index} style={styles.slot}>
              <Icon size={24} color="#606060" />
              <Text style={styles.slotName}>{slot.name}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.hint}>Purchase items from the Shop to equip</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E1E1E', marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  slot: { width: '22%', aspectRatio: 1, backgroundColor: '#121212', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)', alignItems: 'center', justifyContent: 'center', gap: 4 },
  slotName: { color: '#606060', fontSize: 10, fontFamily: FONTS.regular },
  hint: { color: '#606060', fontSize: 12, textAlign: 'center', marginTop: 16 },
});