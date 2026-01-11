import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Plus, Check, Zap, Sparkles } from 'lucide-react-native';
import { COLORS, FONTS } from '../constants/theme';
import HabitCard from '../components/quest/HabitCard';
import AddHabitModal from '../components/quest/AddHabitModal';

export default function Habits({ habits, onCompleteHabit, onAddHabit, onDeleteHabit }) {
    const [showAddForm, setShowAddForm] = useState(false);

    const dailyHabits = habits.filter(h => h.type === 'daily');
    const weeklyHabits = habits.filter(h => h.type === 'weekly');
    const completedToday = habits.filter(h => h.completed).length;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {/* HEADER */}
                <LinearGradient colors={['rgba(138,43,226,0.2)', 'transparent']} style={styles.headerGradient}>
                    <View style={styles.headerContent}>
                        <View style={styles.titleRow}>
                            <View style={styles.iconBox}>
                                <Target size={24} color="#FFF" />
                            </View>
                            <View>
                                <Text style={styles.pageTitle}>Quest Log</Text>
                                <Text style={styles.pageSubtitle}>Complete quests to level up</Text>
                            </View>
                        </View>

                        {/* Progress Card */}
                        <View style={styles.progressCard}>
                            <View style={styles.progressLeft}>
                                <View style={styles.checkCircle}>
                                    <Check size={20} color="#FFF" />
                                </View>
                                <View>
                                    <Text style={styles.progressLabel}>Today's Progress</Text>
                                    <Text style={styles.progressValue}>{completedToday} / {habits.length} Completed</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setShowAddForm(true)}>
                                <LinearGradient colors={['#8A2BE2', '#00F0FF']} style={styles.addButton}>
                                    <Plus size={24} color="#FFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                {/* DAILY QUESTS */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Zap size={20} color="#00F0FF" />
                        <Text style={styles.sectionTitle}>Daily Quests</Text>
                        <Text style={styles.sectionCount}>
                            {dailyHabits.filter(h => h.completed).length}/{dailyHabits.length}
                        </Text>
                    </View>

                    {dailyHabits.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Target size={40} color={COLORS.mutedForeground} />
                            <Text style={styles.emptyText}>No daily quests</Text>
                            <Text style={styles.emptySub}>Add your first quest!</Text>
                        </View>
                    ) : (
                        dailyHabits.map(habit => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onComplete={onCompleteHabit}
                                onDelete={onDeleteHabit}
                            />
                        ))
                    )}
                </View>

                {/* WEEKLY QUESTS */}
                {weeklyHabits.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Sparkles size={20} color="#FFD700" />
                            <Text style={styles.sectionTitle}>Weekly Quests</Text>
                            <Text style={styles.sectionCount}>
                                {weeklyHabits.filter(h => h.completed).length}/{weeklyHabits.length}
                            </Text>
                        </View>
                        {weeklyHabits.map(habit => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onComplete={onCompleteHabit}
                                onDelete={onDeleteHabit}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* MODAL */}
            <AddHabitModal
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
                onAdd={onAddHabit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    headerGradient: { paddingTop: 60, paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerContent: { paddingHorizontal: 20 },
    titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
    iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(138,43,226,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#8A2BE2' },
    pageTitle: { color: '#FFF', fontSize: 24, fontFamily: FONTS.bold },
    pageSubtitle: { color: COLORS.mutedForeground, fontSize: 14 },
    progressCard: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(138,43,226,0.4)' },
    progressLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkCircle: { backgroundColor: '#00FF88', borderRadius: 10, padding: 6 },
    progressLabel: { color: COLORS.mutedForeground, fontSize: 12 },
    progressValue: { color: '#FFF', fontSize: 14, fontFamily: FONTS.bold },
    addButton: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    section: { paddingHorizontal: 20, marginTop: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
    sectionTitle: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold, flex: 1 },
    sectionCount: { color: COLORS.mutedForeground, fontSize: 12 },
    emptyState: { backgroundColor: '#1E1E1E', padding: 30, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    emptyText: { color: COLORS.mutedForeground, marginTop: 10, fontSize: 16 },
    emptySub: { color: '#666', fontSize: 12 },
});