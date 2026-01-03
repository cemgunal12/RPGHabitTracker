import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Flame, Trash2 } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { STAT_ICONS, STAT_COLORS, DIFFICULTY_CONFIG } from '../../constants/habitConfig';

export default function HabitCard({ habit, onComplete, onDelete }) {
  const StatIcon = STAT_ICONS[habit.stat];
  const difficulty = DIFFICULTY_CONFIG[habit.difficulty];
  const statColor = STAT_COLORS[habit.stat];

  return (
    <View style={[
      styles.card, 
      { borderColor: difficulty.borderColor },
      habit.completed && styles.cardCompleted
    ]}>
      {/* Arka Plan Glow */}
      {!habit.completed && (
        <LinearGradient
          colors={difficulty.gradient}
          style={[StyleSheet.absoluteFillObject, { opacity: 0.05, borderRadius: 16 }]}
        />
      )}

      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          {/* Zorluk Badge */}
          <LinearGradient
            colors={difficulty.gradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>{difficulty.label}</Text>
          </LinearGradient>

          {/* Streak Alevi */}
          {habit.streak > 0 && (
            <View style={styles.streakContainer}>
              <Flame size={14} color="#FF1744" />
              <Text style={styles.streakText}>{habit.streak}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={() => onDelete(habit.id)}>
          <Trash2 size={20} color={COLORS.mutedForeground} />
        </TouchableOpacity>
      </View>

      <Text style={styles.habitName}>{habit.name}</Text>

      <View style={styles.cardFooter}>
        {/* Sol Kısım: Stat ve Ödül */}
        <View style={styles.footerInfo}>
          <View style={[styles.statBadge, { borderColor: statColor[0] }]}>
            <StatIcon size={14} color={statColor[0]} />
            <Text style={[styles.statText, { color: statColor[0] }]}>{habit.stat}</Text>
          </View>
          <View style={styles.rewardTextContainer}>
            <Text style={styles.rewardText}>{difficulty.xp}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.rewardText}>{difficulty.gold}</Text>
          </View>
        </View>

        {/* Sağ Kısım: Tamamla Butonu */}
        <TouchableOpacity
          onPress={() => !habit.completed && onComplete(habit.id)}
          disabled={habit.completed}
        >
          {habit.completed ? (
            <View style={styles.doneButton}>
              <Check size={16} color="#FFF" />
              <Text style={styles.doneText}>Done</Text>
            </View>
          ) : (
            <LinearGradient
              colors={['#8A2BE2', '#00F0FF']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.completeButton}
            >
              <Text style={styles.completeText}>Complete</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1.5 },
  cardCompleted: { opacity: 0.6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  headerLeft: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#121212', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  streakContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,23,68,0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,23,68,0.3)' },
  streakText: { color: '#FF1744', fontSize: 10, fontWeight: 'bold' },
  habitName: { color: '#FFF', fontSize: 16, fontFamily: FONTS.medium, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerInfo: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  statText: { fontSize: 12, textTransform: 'capitalize' },
  rewardTextContainer: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  rewardText: { color: COLORS.mutedForeground, fontSize: 11 },
  dot: { color: COLORS.mutedForeground, fontSize: 11 },
  completeButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  completeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  doneButton: { backgroundColor: '#00FF88', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, gap: 4 },
  doneText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});