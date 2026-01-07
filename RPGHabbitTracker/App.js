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
// Dashboard kaldırıldı, özellikleri Profile'a taşındı.
import Habits from './src/screens/HabitsScreen'; // QUESTS
import Profile from './src/screens/ProfileScreen'; // PROFILE (Dashboard birleşik)
import Boss from './src/screens/BossScreen';
import Shop from './src/screens/ShopScreen'; 
import Inventory from './src/screens/InventoryScreen'; // INVENTORY
import Leaderboard from './src/screens/LeaderboardScreen'; // RANKS

// --- MODALS ---
import { QuestCompleteModal } from './src/components/rpg/QuestCompleteModal';
import CalendarModal from './src/components/rpg/CalendarModal';

// =====================================================================
// --- TOP BAR COMPONENT ---
// =====================================================================
const TopBar = ({ username, level, streak, onProfilePress, onStreakPress }) => (
  <View style={styles.topBarWrapper}>
    <LinearGradient
      colors={['#1A1A1A', '#121212']}
      style={styles.topBarContainer}
    >
      {/* Sol Taraf - Profil */}
      <TouchableOpacity 
        onPress={onProfilePress} 
        style={styles.profileButton}
        activeOpacity={0.7}
      >
        <View style={styles.avatarWrapper}>
          <LinearGradient 
            colors={[COLORS.primary, COLORS.secondary]} 
            style={styles.avatarGradient}
          >
            <Image 
              source={{ uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${username}` }} 
              style={styles.avatar} 
            />
          </LinearGradient>
          
          <View style={styles.levelBadge}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.levelGradientBg}
            >
              <Text style={styles.levelBadgeText}>{level}</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username} numberOfLines={1}>{username}</Text>
          <View style={styles.titleBadge}>
            <MaterialCommunityIcons name="crown" size={10} color="#FFD700" />
            <Text style={styles.titleText}>Adventurer</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Sağ Taraf - Streak */}
      <TouchableOpacity 
        onPress={onStreakPress}
        style={styles.streakButton}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['rgba(255, 23, 68, 0.2)', 'rgba(255, 23, 68, 0.05)']}
          style={styles.streakGradient}
        >
          <View style={styles.streakIconBox}>
            <MaterialCommunityIcons name="fire" size={20} color="#FF1744" />
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakValue}>{streak}</Text>
            <Text style={styles.streakLabel}>DAY STREAK</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>

    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.bottomBorder}
    />
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
  const { gameState, gainXp, earnGold, increaseStat, buyItem, setUsername, damageBoss } = useGame();

  // Varsayılan ekran artık 'Quests'
  const [activeTab, setActiveTab] = useState('Quests');
  const [authMode, setAuthMode] = useState('Login');
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ questName: '', xp: 0, gold: 0, stat: null });
  const [levelUpData, setLevelUpData] = useState({ isLevelUp: false, newLevel: 1 });
  const [showCalendar, setShowCalendar] = useState(false);

  // Habits
  const [habits, setHabits] = useState([
    { id: '1', name: 'Read Book (30m)', stat: 'knowledge', difficulty: 'easy', completed: false, streak: 3, type: 'daily' },
    { id: '2', name: 'Workout', stat: 'vitality', difficulty: 'hard', completed: false, streak: 5, type: 'daily' },
    { id: '3', name: 'Weekly Review', stat: 'wealth', difficulty: 'medium', completed: false, streak: 0, type: 'weekly' },
  ]);

  const calculateMaxStreak = () => {
    if (!habits || habits.length === 0) return 0;
    const max = Math.max(...habits.map(h => h.streak || 0));
    return max > 0 ? max : 0;
  };
  const currentStreak = calculateMaxStreak();

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

      // BOSS DAMAGE LOGIC
      let habitDamage = 50;
      if (habit.difficulty === 'medium') habitDamage = 100;
      if (habit.difficulty === 'hard') habitDamage = 200;
      const characterBonus = gameState.level * 10;
      const weaponBonus = 10;
      damageBoss(habitDamage + characterBonus + weaponBonus);

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

      {/* TOP BAR */}
      <TopBar 
        username={gameState.username} 
        level={gameState.level} 
        streak={currentStreak}
        onProfilePress={() => setActiveTab('Profile')} // TopBar'a basınca Profile'a git
        onStreakPress={() => setShowCalendar(true)}
      />

      {/* ANA İÇERİK ALANI */}
      <View style={styles.content}>
        
        {activeTab === 'Quests' && (
          <Habits
            habits={habits}
            onAddHabit={handleAddHabit}
            onCompleteHabit={handleCompleteHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        )}

        {activeTab === 'Inventory' && <Inventory />}
        
        {activeTab === 'Boss' && <Boss />}
        
        {activeTab === 'Shop' && (
          <Shop gold={gameState.gold} onPurchase={handlePurchase} />
        )}

        {activeTab === 'Leaderboard' && <Leaderboard />}

        {activeTab === 'Profile' && (
          <Profile 
            onLogout={handleLogout} 
            onNavigateBoss={() => setActiveTab('Boss')} // Profile'dan Boss'a gitmek isterse
          />
        )}

      </View>

      {/* YENİ ALT MENÜ (NAVBAR) */}
      <View style={styles.tabBar}>
        
        {/* 1. QUEST (Görevler) */}
        <TabButton 
            title="Quest" 
            icon="scroll" // veya format-list-checks
            isActive={activeTab === 'Quests'} 
            onPress={() => setActiveTab('Quests')} 
        />
        
        {/* 2. INVENTORY (Envanter) */}
        <TabButton 
            title="Inventory" 
            icon="bag-personal" 
            isActive={activeTab === 'Inventory'} 
            onPress={() => setActiveTab('Inventory')} 
        />

        {/* 3. BOSS BATTLE (ORTA - KILIÇ) */}
        <View style={{ top: -20 }}>
          <TouchableOpacity onPress={() => setActiveTab('Boss')} style={styles.centerButton}>
            <LinearGradient colors={['#FF3F3F', '#FF1744']} style={styles.centerGradient}>
              <MaterialCommunityIcons name="sword-cross" size={32} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 4. SHOP (Mağaza) */}
        <TabButton 
            title="Shop" 
            icon="store" 
            isActive={activeTab === 'Shop'} 
            onPress={() => setActiveTab('Shop')} 
        />

        {/* 5. RANKS (Sıralama) */}
        <TabButton 
            title="Ranks" 
            icon="podium-gold" 
            isActive={activeTab === 'Leaderboard'} 
            onPress={() => setActiveTab('Leaderboard')} 
        />

      </View>

      {/* MODALS */}
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

      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        currentStreak={currentStreak}
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
  topBarWrapper: { backgroundColor: '#1A1A1A', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  topBarContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, paddingTop: 20 },
  bottomBorder: { height: 2, width: '100%' },
  profileButton: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatarWrapper: { position: 'relative' },
  avatarGradient: { width: 52, height: 52, borderRadius: 26, padding: 2, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: '100%', height: '100%', borderRadius: 26, backgroundColor: '#2A2A2A' },
  levelBadge: { position: 'absolute', bottom: -4, right: -4, borderRadius: 10, borderWidth: 2, borderColor: '#121212', overflow: 'hidden' },
  levelGradientBg: { paddingHorizontal: 6, paddingVertical: 2 },
  levelBadgeText: { color: '#121212', fontSize: 10, fontFamily: 'Orbitron_700Bold' },
  userInfo: { flex: 1 },
  username: { color: '#FFF', fontSize: 16, fontFamily: 'Orbitron_700Bold', marginBottom: 2 },
  titleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  titleText: { color: '#A0A0A0', fontSize: 10, fontFamily: 'Orbitron_400Regular' },
  streakButton: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 23, 68, 0.4)' },
  streakGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  streakIconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255, 23, 68, 0.2)', alignItems: 'center', justifyContent: 'center' },
  streakInfo: { alignItems: 'flex-start' },
  streakValue: { color: '#FF1744', fontSize: 16, fontFamily: 'Orbitron_700Bold', lineHeight: 18 },
  streakLabel: { color: '#FF6B6B', fontSize: 8, fontFamily: 'Orbitron_400Regular', letterSpacing: 0.5 },

  // TAB BAR STYLES
  tabBar: { flexDirection: 'row', height: 80, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: 'rgba(138,43,226,0.2)', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20 },
  tabButton: { alignItems: 'center', padding: 5, flex: 1 },
  tabText: { fontSize: 9, marginTop: 4, fontFamily: 'Orbitron_500Medium' },
  centerButton: { width: 64, height: 64, borderRadius: 32, elevation: 10, shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 10 },
  centerGradient: { flex: 1, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#121212' }
});