import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import StreakCalendar from '../streak/StreakCalendar';

const { height } = Dimensions.get('window');

export default function CalendarModal({ visible, onClose, habits, currentStreak }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Arkaya basınca kapanması için */}
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.container}>
          <LinearGradient
            colors={['#1E1E1E', '#121212']}
            style={styles.content}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Streak Calendar</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={COLORS.mutedForeground || '#888'} />
              </TouchableOpacity>
            </View>

            {/* Calendar Content */}
            <View style={styles.calendarWrapper}>
              {/* Habits undefined ise boş array gönderiyoruz */}
              <StreakCalendar habits={habits || []} currentStreak={currentStreak || 0} />
            </View>

          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    height: height * 0.85,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E', // Fallback renk
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: FONTS.bold || 'System',
  },
  closeButton: {
    padding: 4,
  },
  calendarWrapper: {
    flex: 1,
  }
});