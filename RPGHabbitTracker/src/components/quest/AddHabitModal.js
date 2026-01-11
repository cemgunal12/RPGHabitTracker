import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { STAT_ICONS, DIFFICULTY_CONFIG } from '../../constants/habitConfig';

export default function AddHabitModal({ visible, onClose, onAdd }) {
  const [newHabit, setNewHabit] = useState({
    name: '',
    stat: 'mind',
    difficulty: 'medium',
    type: 'daily',
  });

  const handleAdd = () => {
    if (newHabit.name.trim()) {
      onAdd(newHabit);
      setNewHabit({ name: '', stat: 'mind', difficulty: 'medium', type: 'daily' });
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient colors={['#8A2BE2', '#00F0FF']} style={styles.modalGlow} />
          <View style={styles.modalInner}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Quest</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={COLORS.mutedForeground} />
              </TouchableOpacity>
            </View>

            {/* Form Elemanları */}
            <Text style={styles.label}>Quest Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quest name..."
              placeholderTextColor={COLORS.mutedForeground}
              value={newHabit.name}
              onChangeText={(text) => setNewHabit({ ...newHabit, name: text })}
            />

            <Text style={styles.label}>Stat Boost</Text>
            <View style={styles.gridRow}>
              {Object.keys(STAT_ICONS).map((stat) => {
                const Icon = STAT_ICONS[stat];
                const isSelected = newHabit.stat === stat;
                return (
                  <TouchableOpacity
                    key={stat}
                    onPress={() => setNewHabit({ ...newHabit, stat })}
                    style={[styles.optionButton, isSelected && { backgroundColor: 'rgba(138,43,226,0.2)', borderColor: '#8A2BE2' }]}
                  >
                    <Icon size={20} color={isSelected ? '#FFF' : COLORS.mutedForeground} />
                    <Text style={[styles.optionText, isSelected && { color: '#FFF' }]}>{stat}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.gridRow}>
              {Object.keys(DIFFICULTY_CONFIG).map((diff) => {
                const isSelected = newHabit.difficulty === diff;
                const config = DIFFICULTY_CONFIG[diff];
                return (
                  <TouchableOpacity
                    key={diff}
                    onPress={() => setNewHabit({ ...newHabit, difficulty: diff })}
                    style={[styles.optionButton, isSelected && { borderColor: config.borderColor, backgroundColor: config.gradient[0] + '33' }]}
                  >
                    <Text style={[styles.optionText, isSelected && { color: '#FFF' }]}>{config.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Type</Text>
            <View style={styles.gridRow}>
              {['daily', 'weekly'].map((type) => {
                const isSelected = newHabit.type === type;
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setNewHabit({ ...newHabit, type })}
                    style={[styles.optionButton, isSelected && { borderColor: '#00F0FF', backgroundColor: 'rgba(0,240,255,0.2)' }]}
                  >
                    <Text style={[styles.optionText, isSelected && { color: '#FFF' }]}>{type.toUpperCase()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={handleAdd}>
                <LinearGradient colors={['#8A2BE2', '#00F0FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.createButton}>
                  <Text style={styles.createText}>Create Quest</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { position: 'relative' },
  modalGlow: { position: 'absolute', top: -2, left: -2, right: -2, bottom: -2, borderRadius: 22, opacity: 0.5 },
  modalInner: { backgroundColor: '#1E1E1E', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#8A2BE2' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: '#FFF', fontSize: 20, fontFamily: FONTS.bold },
  label: { color: COLORS.mutedForeground, fontSize: 14, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#121212', borderWidth: 1, borderColor: 'rgba(138,43,226,0.3)', borderRadius: 12, color: '#FFF', padding: 12 },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', flexGrow: 1, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  optionText: { color: COLORS.mutedForeground, fontSize: 12, textTransform: 'capitalize' },
  actionRow: { flexDirection: 'row', marginTop: 24, gap: 12 },
  cancelButton: { flex: 1, backgroundColor: '#2A2A2A', padding: 14, borderRadius: 12, alignItems: 'center' },
  cancelText: { color: '#FFF' },
  createButton: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  createText: { color: '#FFF', fontWeight: 'bold' },
});