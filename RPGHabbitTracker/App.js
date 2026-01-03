import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useFonts, Orbitron_400Regular, Orbitron_500Medium, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// --- CONTEXT ---
import { GameProvider, useGame } from './src/context/GameContext';
import { COLORS } from './src/constants/theme';

// --- SCREENS ---
// Check file paths according to their actual locations in the project (keep as is if auth folder doesn't exist)
import Login from './src/screens/auth/LoginScreen';
import SignUp from './src/screens/auth/SignUpScreen';
import Dashboard from './src/screens/DashboardScreen';
import Habits from './src/screens/HabitsScreen';
import Profile from './src/screens/ProfileScreen';
import { QuestCompleteModal } from './src/components/rpg/QuestCompleteModal';

// --- NAVIGATION BUTTON COMPONENT ---
const TabButton = ({ title, icon, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.tabButton}>
    <MaterialCommunityIcons
      name={icon}
      size={24}
      color={isActive ? COLORS.secondary : COLORS.mutedForeground}
    />
    <Text style={[styles.tabText, { color: isActive ? COLORS.secondary : COLORS.mutedForeground }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const MainLayout = () => {
  const { gameState, gainXp, earnGold, setUsername } = useGame();

  // Default landing page is Dashboard
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [authMode, setAuthMode] = useState('Login');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ questName: '', xp: 0, gold: 0, stat: null });
  const [levelUpData, setLevelUpData] = useState({ isLevelUp: false, newLevel: 1 });

  // Temporary Quest Data
  const [habits, setHabits] = useState([
    { id: '1', name: 'Read Book (30m)', stat: 'knowledge', difficulty: 'easy', completed: false, streak: 3, type: 'daily' },
    { id: '2', name: 'Workout', stat: 'vitality', difficulty: 'hard', completed: false, streak: 5, type: 'daily' },
    { id: '3', name: 'Weekly Review', stat: 'wealth', difficulty: 'medium', completed: false, streak: 0, type: 'weekly' },
  ]);

  // Quest Completion Function
  const handleCompleteHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit && !habit.completed) {
      setHabits(habits.map(h => h.id === id ? { ...h, completed: true, streak: h.streak + 1 } : h));

      let xp = 10, gold = 5;
      if (habit.difficulty === 'medium') { xp = 25; gold = 15; }
      if (habit.difficulty === 'hard') { xp = 50; gold = 30; }
      if (habit.type === 'weekly') { xp *= 2; gold *= 2; }

      const oldLevel = gameState.level;
      gainXp(xp);
      earnGold(gold);

      setModalData({ questName: habit.name, xp, gold, stat: { name: habit.stat, amount: 1 } });

      const predictedLevel = (gameState.currentXP + xp) >= gameState.maxXP ? gameState.level + 1 : gameState.level;
      setLevelUpData({ isLevelUp: predictedLevel > oldLevel, newLevel: predictedLevel });

      setShowModal(true);
    }
  };

  const handleAddHabit = (newHabit) => {
    setHabits([...habits, { ...newHabit, id: Date.now().toString(), completed: false, streak: 0 }]);
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  // Login Check
  if (!gameState.username || gameState.username === 'Adventurer') {
    return authMode === 'Login' ? (
      <Login onLogin={(u) => setUsername(u)} onNavigateToSignUp={() => setAuthMode('SignUp')} />
    ) : (
      <SignUp onSignUp={(u) => setUsername(u)} onNavigateToLogin={() => setAuthMode('Login')} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* --- MAIN CONTENT AREA --- */}
      <View style={styles.content}>
        {activeTab === 'Dashboard' && <Dashboard habits={habits} />}
        {activeTab === 'Quests' && (
          <Habits
            habits={habits}
            onAddHabit={handleAddHabit}
            onCompleteHabit={handleCompleteHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        )}
        {activeTab === 'Profile' && <Profile />}
      </View>

      {/* --- BOTTOM MENU (TAB BAR) --- */}
      <View style={styles.tabBar}>

        {/* 1. LEFT: PROFILE */}
        <TabButton
          title="Profile"
          icon="account"
          isActive={activeTab === 'Profile'}
          onPress={() => setActiveTab('Profile')}
        />

        {/* 2. CENTER: QUESTS (SWORD) */}
        <View style={{ top: -20 }}>
          <TouchableOpacity onPress={() => setActiveTab('Quests')} style={styles.centerButton}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.centerGradient}>
              <MaterialCommunityIcons name="sword" size={32} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 3. RIGHT: HOME (DASHBOARD) */}
        <TabButton
          title="Home"
          icon="view-dashboard"
          isActive={activeTab === 'Dashboard'}
          onPress={() => setActiveTab('Dashboard')}
        />

      </View>

      {/* MODAL */}
      <QuestCompleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        questName={modalData.questName}
        xpGained={modalData.xp}
        goldGained={modalData.gold}
        statGained={modalData.stat}
        isLevelUp={levelUpData.isLevelUp}
        newLevel={levelUpData.newLevel}
      />
    </SafeAreaView>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({ Orbitron_400Regular, Orbitron_500Medium, Orbitron_700Bold });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  loading: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', height: 80, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: 'rgba(138,43,226,0.2)', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20 },
  tabButton: { alignItems: 'center', padding: 10 },
  tabText: { fontSize: 10, marginTop: 4, fontFamily: 'Orbitron_500Medium' },
  centerButton: { width: 64, height: 64, borderRadius: 32, elevation: 10 },
  centerGradient: { flex: 1, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#121212' }
});