import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Platform
} from 'react-native';
import { useFonts, Orbitron_400Regular, Orbitron_500Medium, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// --- CONTEXT ---
import { GameProvider, useGame } from './src/context/GameContext';
import { COLORS } from './src/constants/theme';

// --- EKRANLAR ---
import Login from './src/screens/auth/LoginScreen';
import SignUp from './src/screens/auth/SignUpScreen';
import Dashboard from './src/screens/TempScreen'; // Home
import Habits from './src/screens/HabitsScreen'; // Quests
import Profile from './src/screens/ProfileScreen';
import Boss from './src/screens/BossScreen';
import Shop from './src/screens/ShopScreen'; 
import Leaderboard from './src/screens/LeaderboardScreen'; // <--- YENİ EKLENDİ (Gerçek dosya yolu)

import { QuestCompleteModal } from './src/components/rpg/QuestCompleteModal';

// =====================================================================
// --- ENTEGRE TOP BAR COMPONENT ---
// =====================================================================
const TopBar = ({ username, level, streak, onProfilePress }) => (
  <View style={styles.topBarContainer}>
    <LinearGradient
      colors={['#1E1E1E', '#121212']}
      style={styles.topBarGradient}
    >
      <View style={styles.topBarContent}>
        
        {/* SOL: Profil */}
        <TouchableOpacity onPress={onProfilePress} style={styles.profileSection}>
          <View style={styles.avatarContainer}>
             <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.avatarBorder}>
                <Image 
                  source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }} 
                  style={styles.avatarImage} 
                />
             </LinearGradient>
             <View style={styles.levelBadge}>
                <Text style={styles.levelTextBadge}>{level}</Text>
             </View>
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.usernameText} numberOfLines={1}>{username}</Text>
            <Text style={styles.subtitleText}>Adventurer</Text>
          </View>
        </TouchableOpacity>

        {/* SAĞ: Streak */}
        <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={20} color="#FF3F3F" />
            <Text style={styles.streakTextVal}>{streak}</Text>
        </View>

      </View>
      <View style={styles.divider} />
    </LinearGradient>
  </View>
);

// --- TAB BUTTON ---
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
  const { gameState, gainXp, earnGold, increaseStat, buyItem, setUsername } = useGame();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [authMode, setAuthMode] = useState('Login');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ questName: '', xp: 0, gold: 0, stat: null });
  const [levelUpData, setLevelUpData] = useState({ isLevelUp: false, newLevel: 1 });

  // Dummy Habits
  const [habits, setHabits] = useState([
    { id: '1', name: 'Read Book (30m)', stat: 'knowledge', difficulty: 'easy', completed: false, streak: 3, type: 'daily' },
    { id: '2', name: 'Workout', stat: 'vitality', difficulty: 'hard', completed: false, streak: 5, type: 'daily' },
    { id: '3', name: 'Weekly Review', stat: 'wealth', difficulty: 'medium', completed: false, streak: 0, type: 'weekly' },
  ]);

  // --- ACTIONS ---
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: () => setUsername(null) }
    ]);
  };

  const handleCompleteHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit && !habit.completed) {
      setHabits(habits.map(h => h.id === id ? { ...h, completed: true, streak: h.streak + 1 } : h));
      
      let xp = 10, gold = 5;
      if (habit.difficulty === 'medium') { xp = 25; gold = 15; }
      if (habit.difficulty === 'hard') { xp = 50; gold = 30; }
      if (habit.type === 'weekly') { xp *= 2; gold *= 2; }

      const oldLevel = gameState.level;
      if (habit.stat) increaseStat(habit.stat, 1);
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

  const handlePurchase = (item) => {
    const result = buyItem(item);
    if (result.success) {
      Alert.alert("Success!", result.message);
    } else {
      Alert.alert("Failed", result.message);
    }
  };

  // --- AUTH CHECK ---
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

      {/* --- TOP BAR --- */}
      <TopBar 
        username={gameState.username} 
        level={gameState.level} 
        streak={3} 
        onProfilePress={() => setActiveTab('Profile')}
      />

      {/* --- ANA İÇERİK --- */}
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
        
        {activeTab === 'Boss' && <Boss />}
        
        {activeTab === 'Shop' && (
          <Shop gold={gameState.gold} onPurchase={handlePurchase} />
        )}

        {/* ARTIK GERÇEK LEADERBOARD EKRANI ÇALIŞACAK */}
        {activeTab === 'Leaderboard' && <Leaderboard />}

        {activeTab === 'Profile' && (
          <Profile onLogout={handleLogout} />
        )}
      </View>

      {/* --- ALT MENÜ --- */}
      <View style={styles.tabBar}>
        <TabButton title="Home" icon="view-dashboard" isActive={activeTab === 'Dashboard'} onPress={() => setActiveTab('Dashboard')} />
        <TabButton title="Quests" icon="format-list-checks" isActive={activeTab === 'Quests'} onPress={() => setActiveTab('Quests')} />
        
        <View style={{ top: -20 }}>
          <TouchableOpacity onPress={() => setActiveTab('Boss')} style={styles.centerButton}>
            <LinearGradient colors={['#FF3F3F', '#FF1744']} style={styles.centerGradient}>
              <MaterialCommunityIcons name="sword" size={32} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TabButton title="Shop" icon="store" isActive={activeTab === 'Shop'} onPress={() => setActiveTab('Shop')} />
        <TabButton title="Ranks" icon="podium-gold" isActive={activeTab === 'Leaderboard'} onPress={() => setActiveTab('Leaderboard')} />
      </View>

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
  container: { flex: 1, backgroundColor: '#121212', paddingTop: Platform.OS === 'android' ? 25 : 0 },
  loading: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1 },
  
  // TOP BAR STYLES
  topBarContainer: { zIndex: 100 },
  topBarGradient: { paddingTop: 5, paddingBottom: 5 },
  topBarContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  profileSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarContainer: { position: 'relative' },
  avatarBorder: { width: 48, height: 48, borderRadius: 24, padding: 2, justifyContent: 'center', alignItems: 'center' },
  avatarImage: { width: '100%', height: '100%', borderRadius: 24, backgroundColor: '#333' },
  levelBadge: { position: 'absolute', bottom: -2, right: -2, backgroundColor: COLORS.primary, minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#121212', paddingHorizontal: 2 },
  levelTextBadge: { color: '#FFF', fontSize: 9, fontFamily: 'Orbitron_700Bold' },
  nameContainer: { justifyContent: 'center' },
  usernameText: { color: '#FFF', fontSize: 16, fontFamily: 'Orbitron_700Bold', maxWidth: 140 },
  subtitleText: { color: COLORS.mutedForeground, fontSize: 10, fontFamily: 'Orbitron_400Regular' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: 'rgba(255, 63, 63, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 63, 63, 0.3)' },
  streakTextVal: { color: '#FF3F3F', fontSize: 14, fontFamily: 'Orbitron_700Bold' },
  divider: { height: 1, backgroundColor: 'rgba(138,43,226,0.2)', marginTop: 5 },

  // TAB BAR STYLES
  tabBar: { flexDirection: 'row', height: 80, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: 'rgba(138,43,226,0.2)', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20 },
  tabButton: { alignItems: 'center', padding: 5, flex: 1 },
  tabText: { fontSize: 9, marginTop: 4, fontFamily: 'Orbitron_500Medium' },
  centerButton: { width: 64, height: 64, borderRadius: 32, elevation: 10, shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 10 },
  centerGradient: { flex: 1, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#121212' }
});