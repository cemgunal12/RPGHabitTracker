import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Flame, Calendar as CalendarIcon, TrendingUp } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS } from '../../constants/theme'; 

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 60) / 7;

// --- YARDIMCI: İki tarih aynı gün mü? (Saat farkını siler) ---
const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// --- Dairesel İlerleme Çubuğu ---
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
  // NaN veya undefined gelirse 0 kabul et
  const safePercent = isNaN(percent) ? 0 : percent;
  
  // Yüzdelik hesaplama (Tersi alınır çünkü strokeDashoffset boşluğu temsil eder)
  const strokeDashoffset = circumference - (safePercent / 100) * circumference;

  const getStrokeColor = () => {
    if (safePercent >= 100) return '#8A2BE2'; // Tamamlandı (Mor)
    if (safePercent > 0) return '#00F0FF';    // Başlandı (Mavi)
    return '#3A3A3A';                         // Boş (Gri)
  };

  return (
    <View style={styles.cellContent}>
      <Svg height="36" width="36" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        {/* Arka plan dairesi (Gri) */}
        <Circle cx="18" cy="18" r={radius} stroke="#2A2A2A" strokeWidth="2.5" fill="none" />
        
        {/* İlerleme dairesi (Renkli) */}
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
      <Text style={[styles.dayText, isToday && styles.todayText, safePercent >= 100 && styles.completedText]}>
        {day}
      </Text>
      {isToday && <View style={styles.todayIndicator} />}
    </View>
  );
};

// --- Ana Takvim Bileşeni ---
export default function StreakCalendar({ habits = [], currentStreak = 0 }) {
  
  // Belirli bir tarih için % hesapla
  const getCompletionForDate = (targetDateObj) => {
    // 1. Eğer hiç alışkanlık yoksa 0 döndür
    if (!habits || habits.length === 0) return 0;

    // 2. O tarihte tamamlanması gereken toplam görev sayısı
    // (İstersen burada sadece 'daily' olanları filtreleyebilirsin ama projeleri de istedin)
    const totalTasks = habits.length;

    if (totalTasks === 0) return 0;

    // 3. O tarihte tamamlanan görev sayısı
    const completedCount = habits.filter(h => {
      // completionDates dizisi var mı kontrol et
      if (!h.completionDates || !Array.isArray(h.completionDates)) return false;

      // Dizinin içindeki tarihlerin herhangi biri hedef tarihle aynı gün mü?
      return h.completionDates.some(completedDate => isSameDay(completedDate, targetDateObj));
    }).length;

    // 4. Yüzdeyi Hesapla
    return (completedCount / totalTasks) * 100;
  };

  const generateMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Ayın kaç çektiğini bul
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Ayın ilk gününün haftanın hangi günü olduğunu bul (Pazar=0)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Ayın başındaki boşluklar
    for (let i = 0; i < firstDayOfWeek; i++) { days.push(null); }
    
    // Günleri doldur
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      
      const isPastOrToday = dateObj <= today; 
      const isToday = isSameDay(dateObj, today);

      days.push({
        day,
        dateObj, // Date objesini sakla
        isPast: isPastOrToday,
        isToday,
        // Sadece geçmiş ve bugün için hesaplama yap
        completionPercent: isPastOrToday ? getCompletionForDate(dateObj) : null,
      });
    }
    return days;
  };

  const monthDays = generateMonthDays();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // %100 olan gün sayısı
  const perfectDays = monthDays.filter(d => d && d.completionPercent >= 100).length;

  return (
    <View style={styles.container}>
      {/* İstatistikler */}
      <View style={styles.statsRow}>
        <LinearGradient colors={['rgba(255, 23, 68, 0.2)', 'transparent']} style={styles.statCard}>
          <View style={styles.statHeader}>
            <Flame size={16} color="#FF1744" />
            <Text style={styles.statLabel}>Streak</Text>
          </View>
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

      {/* Takvim Başlığı */}
      <View style={styles.monthHeader}>
        <CalendarIcon size={16} color="#00F0FF" />
        <Text style={styles.monthText}>{currentMonth}</Text>
      </View>
      
      {/* Legend (Açıklama) */}
      <View style={styles.legend}>
        <LegendItem color="#8A2BE2" label="100%" filled />
        <LegendItem color="#00F0FF" label="Doing" dashed /> 
        <LegendItem color="#3A3A3A" label="0%" outline />
      </View>

      {/* Grid */}
      <View style={styles.calendarContainer}>
        <View style={styles.weekRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <Text key={i} style={styles.weekText}>{d}</Text>)}
        </View>
        <View style={styles.daysGrid}>
          {monthDays.map((dayData, index) => (
            <View key={index} style={styles.dayCell}>
              {dayData ? (
                <RadialProgress 
                  percent={dayData.completionPercent} 
                  day={dayData.day} 
                  isToday={dayData.isToday} 
                />
              ) : <View />}
            </View>
          ))}
        </View>
      </View>

      {/* Mesaj */}
      <LinearGradient colors={['rgba(138, 43, 226, 0.2)', 'rgba(0, 240, 255, 0.2)']} style={styles.messageBox}>
         <View style={{flexDirection:'row', gap: 10, alignItems: 'center'}}>
            <Flame size={20} color="#FF1744" />
            <View>
              <Text style={styles.messageTitle}>Keep going!</Text>
              <Text style={styles.messageText}>Every habit counts towards your success.</Text>
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
  statValue: { color: '#FFF', fontSize: 20, fontFamily: FONTS.bold || 'System' },
  statSub: { color: '#606060', fontSize: 10 },
  monthHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  monthText: { color: '#FFF', fontFamily: FONTS.medium || 'System', fontSize: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { color: '#A0A0A0', fontSize: 10 },
  calendarContainer: { width: '100%' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 6 },
  weekText: { width: CELL_SIZE, textAlign: 'center', color: '#606060', fontSize: 10, fontFamily: FONTS.bold || 'System' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100/7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  cellContent: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dayText: { color: '#FFF', fontSize: 12, fontFamily: FONTS.medium || 'System' },
  dayTextMuted: { color: '#333', fontSize: 12 },
  todayText: { color: '#00F0FF', fontFamily: FONTS.bold || 'System' },
  completedText: { color: '#8A2BE2' },
  todayIndicator: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: '#00F0FF' },
  messageBox: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138, 43, 226, 0.3)' },
  messageTitle: { color: '#FFF', fontSize: 12, fontFamily: FONTS.bold || 'System' },
  messageText: { color: '#A0A0A0', fontSize: 10 },
});