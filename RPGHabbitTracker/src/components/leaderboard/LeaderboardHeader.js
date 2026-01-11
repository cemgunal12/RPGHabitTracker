import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown } from 'lucide-react-native';
import { FONTS, COLORS } from '../../constants/theme';

export default function LeaderboardHeader() {
  return (
    <LinearGradient
      colors={['rgba(88, 28, 135, 0.3)', 'transparent']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Global Rankings</Text>
          <Text style={styles.subtitle}>Compete with the best</Text>
        </View>
        <View style={styles.iconBox}>
          <Crown size={24} color="#C084FC" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(168, 85, 247, 0.2)' },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  title: { color: '#FFF', fontSize: 22, fontFamily: FONTS.bold },
  subtitle: { color: '#D8B4FE', fontSize: 14 },
  iconBox: { padding: 10, backgroundColor: 'rgba(168, 85, 247, 0.2)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.3)' },
});