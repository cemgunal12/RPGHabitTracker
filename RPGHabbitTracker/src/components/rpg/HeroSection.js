import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme'; 

export default function HeroSection({ username, level, badge, streak, onStreakPress }) {
    return (
        <View style={styles.container}>
            {/* Arka Plan Gradienti */}
            <LinearGradient
                colors={['rgba(138,43,226,0.15)', 'transparent']}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
                {/* --- AVATAR & LEVEL --- */}
                <View style={styles.leftSection}>
                    <View style={styles.avatarWrapper}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            style={styles.avatarBorder}
                        >
                            <Image
                                source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }}
                                style={styles.avatar}
                            />
                        </LinearGradient>
                        
                        {/* Level Rozeti */}
                        <View style={styles.levelBadge}>
                            <LinearGradient
                                colors={['#FFD700', '#FFA500']}
                                style={styles.levelGradient}
                            >
                                <Text style={styles.levelText}>Lv {level}</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>

                {/* --- KULLANICI BİLGİSİ --- */}
                <View style={styles.infoSection}>
                    <Text style={styles.username} numberOfLines={1}>{username}</Text>
                    
                    <View style={styles.classRow}>
                        <MaterialCommunityIcons name="sword-cross" size={14} color={COLORS.secondary} />
                        <Text style={styles.classText}>Shadow Hunter</Text>
                    </View>

                    {/* Kazanılan Rozet (Varsa Göster) */}
                    {badge && (
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeIcon}>{badge.icon}</Text>
                            <Text style={styles.badgeName}>{badge.name}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderTopWidth: 0,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    
    // SOL: Avatar
    leftSection: {
        marginRight: 15,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarBorder: {
        width: 84,
        height: 84,
        borderRadius: 42,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 42,
        backgroundColor: '#121212',
    },
    levelBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#1A1A1A',
        overflow: 'hidden',
    },
    levelGradient: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    levelText: {
        color: '#121212',
        fontSize: 12,
        fontFamily: 'Orbitron_700Bold',
    },

    // ORTA: Bilgiler
    infoSection: {
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Orbitron_700Bold',
        marginBottom: 4,
    },
    classRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6
    },
    classText: {
        color: COLORS.secondary,
        fontSize: 12,
        fontFamily: 'Orbitron_400Regular',
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
        alignSelf: 'flex-start',
        gap: 6,
    },
    badgeIcon: {
        fontSize: 14,
    },
    badgeName: {
        color: '#FFD700',
        fontSize: 10,
        fontFamily: 'Orbitron_500Medium',
    },

    // SAĞ: Streak
    streakButton: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 23, 68, 0.4)',
    },
    streakGradient: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        minWidth: 70,
    },
    streakTexts: {
        alignItems: 'center',
        marginTop: 4,
    },
    streakValue: {
        color: '#FF1744',
        fontSize: 20,
        fontFamily: 'Orbitron_700Bold',
        lineHeight: 22,
    },
    streakLabel: {
        color: '#FF6B6B',
        fontSize: 8,
        fontFamily: 'Orbitron_400Regular',
    }
});