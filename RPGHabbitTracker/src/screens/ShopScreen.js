// screens/ShopScreen.js
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

// Parçaları import ediyoruz
import ShopHeader from '../components/shop/ShopHeader';
import ShopCard from '../components/shop/ShopCard';
import { SHOP_ITEMS } from '../constants/shopData';

export default function ShopScreen({ gold = 1000, onPurchase }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header Component */}
                <ShopHeader gold={gold} />

                {/* Grid Area */}
                <View style={styles.gridContainer}>
                    {SHOP_ITEMS.map((item) => (
                        <ShopCard
                            key={item.id}
                            item={item}
                            userGold={gold}
                            onPurchase={onPurchase}
                        />
                    ))}
                </View>

                {/* Tip Box (Basit olduğu için burada bıraktım ama istersen bunu da ayırabilirsin) */}
                <LinearGradient
                    colors={['rgba(138, 43, 226, 0.1)', 'rgba(0, 240, 255, 0.1)']}
                    style={styles.tipContainer}
                >
                    <View style={styles.tipContent}>
                        <Sparkles size={20} color="#00F0FF" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.tipTitle}>Tip</Text>
                            <Text style={styles.tipText}>
                                Complete quests and defeat bosses to earn gold. Permanent stat boosts help you level up faster!
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    gridContainer: { padding: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
    tipContainer: { marginHorizontal: 24, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(138, 43, 226, 0.3)' },
    tipContent: { flexDirection: 'row', gap: 12 },
    tipTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
    tipText: { color: '#A0A0A0', fontSize: 12, lineHeight: 18 },
});