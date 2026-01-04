import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import StreakCalendar from './StreakCalendar';

const { height } = Dimensions.get('window');

export default function CalendarModal({ visible, onClose, habits }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1E1E1E', '#121212']}
            style={styles.content}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Streak Calendar</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={COLORS.mutedForeground} />
              </TouchableOpacity>
            </View>

            {/* Calendar Content */}
            <View style={styles.calendarWrapper}>
              <StreakCalendar habits={habits} />
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
    height: height * 0.85, // Ekranın %85'ini kaplasın
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
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
    fontFamily: FONTS.bold,
  },
  closeButton: {
    padding: 4,
  },
  calendarWrapper: {
    flex: 1,
  }
});