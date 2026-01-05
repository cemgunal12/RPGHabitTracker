import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Flame, Calendar as CalendarIcon, TrendingUp } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 60) / 7;

const RadialProgress = ({ percent, day, isToday }) => {
  if (percent === null) {
    return (
      <View style={styles.cellContent}>
        <Text style={styles.dayTextMuted}>{day}</Text>
      </View>
    );
  }

  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const getStrokeColor = () => {
    if (percent >= 100) return '#8A2BE2';
    if (percent >= 50) return '#8A2BE2';
    return '#3A3A3A';
  };

  return (
    <View style={styles.cellContent}>
      <Svg height="36" width="36" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx="18" cy="18" r={radius} stroke="#2A2A2A" strokeWidth="2.5" fill="none" />
        <Circle
          cx="18" cy="18" r={radius}
          stroke={getStrokeColor()}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={[styles.dayText, isToday && styles.todayText, percent >= 100 && styles.completedText]}>
        {day}
      </Text>
      {isToday && <View style={styles.todayIndicator} />}
    </View>
  );
};

// GÜNCELLEME: currentStreak prop'u eklendi
export default function StreakCalendar({ habits, currentStreak = 0 }) {
  const getCompletionForDate = (dateString) => {
    const dailyHabits = habits.filter(h => h.type === 'daily');
    if (dailyHabits.length === 0) return 0;
    const completedCount = dailyHabits.filter(h => 
      h.completionDates && h.completionDates.includes(dateString)
    ).length;
    return (completedCount / dailyHabits.length) * 100;
  };

  const generateMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const days = [];
    
    for (let i = 0; i < startDayOfWeek; i++) { days.push(null); }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = date <= today;
      const isToday = date.toDateString() === today.toDateString();
      days.push({
        day, dateString, isPast, isToday,
        completionPercent: isPast ? getCompletionForDate(dateString) : null,
      });
    }
    return days;
  };

  const monthDays = generateMonthDays();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const perfectDays = monthDays.filter(d => d && d.completionPercent >= 100).length;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <LinearGradient colors={['rgba(255, 23, 68, 0.2)', 'transparent']} style={styles.statCard}>
          <View style={styles.statHeader}>
            <Flame size={16} color="#FF1744" />
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          {/* GÜNCELLEME: Prop'tan gelen değeri gösteriyoruz */}
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statSub}>days</Text>
        </LinearGradient>

        <LinearGradient colors={['rgba(138, 43, 226, 0.2)', 'transparent']} style={styles.statCard}>
          <View style={styles.statHeader}>
            <TrendingUp size={16} color="#8A2BE2" />
            <Text style={styles.statLabel}>Perfect</Text>
          </View>
          <Text style={styles.statValue}>{perfectDays}</Text>
          <Text style={styles.statSub}>days</Text>
        </LinearGradient>
      </View>

      <View style={styles.monthHeader}>
        <CalendarIcon size={16} color="#00F0FF" />
        <Text style={styles.monthText}>{currentMonth}</Text>
      </View>
      
      {/* Legend ve Takvim Grid'i aynı kaldı */}
      <View style={styles.legend}>
        <LegendItem color="#8A2BE2" label="100%" filled />
        <LegendItem color="#8A2BE2" label="50%" dashed />
        <LegendItem color="#3A3A3A" label="0%" outline />
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.weekRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <Text key={i} style={styles.weekText}>{d}</Text>)}
        </View>
        <View style={styles.daysGrid}>
          {monthDays.map((dayData, index) => (
            <View key={index} style={styles.dayCell}>
              {dayData ? (
                <RadialProgress percent={dayData.completionPercent} day={dayData.day} isToday={dayData.isToday} />
              ) : <View />}
            </View>
          ))}
        </View>
      </View>

      <LinearGradient colors={['rgba(138, 43, 226, 0.2)', 'rgba(0, 240, 255, 0.2)']} style={styles.messageBox}>
         <View style={{flexDirection:'row', gap: 10}}>
            <Flame size={20} color="#FF1744" />
            <View>
              <Text style={styles.messageTitle}>Keep it up!</Text>
              <Text style={styles.messageText}>You are building a powerful habit.</Text>
            </View>
         </View>
      </LinearGradient>
    </View>
  );
}

const LegendItem = ({ color, label, filled, dashed, outline }) => (
  <View style={styles.legendItem}>
    <View style={[
      styles.legendDot, 
      { borderColor: color },
      filled && { backgroundColor: color },
      outline && { backgroundColor: 'transparent', borderWidth: 2 }
    ]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statHeader: { flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 4 },
  statLabel: { color: '#A0A0A0', fontSize: 12 },
  statValue: { color: '#FFF', fontSize: 20, fontFamily: FONTS.bold },
  statSub: { color: '#606060', fontSize: 10 },
  monthHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  monthText: { color: '#FFF', fontFamily: FONTS.medium, fontSize: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { color: '#A0A0A0', fontSize: 10 },
  calendarContainer: { width: '100%' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 6 },
  weekText: { width: CELL_SIZE, textAlign: 'center', color: '#606060', fontSize: 10, fontFamily: FONTS.bold },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100/7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  cellContent: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dayText: { color: '#FFF', fontSize: 12, fontFamily: FONTS.medium },
  dayTextMuted: { color: '#333', fontSize: 12 },
  todayText: { color: '#00F0FF', fontFamily: FONTS.bold },
  completedText: { color: '#8A2BE2' },
  todayIndicator: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: '#00F0FF' },
  messageBox: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138, 43, 226, 0.3)' },
  messageTitle: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold },
  messageText: { color: '#A0A0A0', fontSize: 10 },
});