import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Medal, Star } from 'lucide-react-native';
import { useGame } from '../context/GameContext';
import LeaderboardHeader from '../components/leaderboard/LeaderboardHeader';
import YourRankCard from '../components/rpg/hero/YourRankCard';
import Podium from '../components/leaderboard/Podium';
import RankListItem from '../components/rpg/hero/RankListItem';
import { FONTS } from '../constants/theme';

export default function LeaderboardScreen() {
  const { gameState } = useGame();

  const leaderboardData = [
    { rank: 1, username: 'DragonSlayer99', level: 45, xp: 125430, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=DragonSlayer99` },
    { rank: 2, username: 'QuestMaster', level: 42, xp: 118920, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=QuestMaster` },
    { rank: 3, username: 'HabitHero', level: 39, xp: 109340, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=HabitHero` },
    { rank: 4, username: 'EpicWarrior', level: 36, xp: 98750, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=EpicWarrior` },
    { rank: 5, username: 'TaskNinja', level: 34, xp: 92100, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=TaskNinja` },
    { rank: 6, username: 'GoalGetter', level: 31, xp: 85200, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=GoalGetter` },
    { rank: 7, username: 'StreakKing', level: 28, xp: 78400, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=StreakKing` },
    { rank: 8, username: 'DailyChamp', level: 25, xp: 71800, avatar: `https://api.dicebear.com/7.x/adventurer/png?seed=DailyChamp` },
  ];

  const currentUserRank = 15;

  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <LeaderboardHeader />

        <YourRankCard
          username={gameState.username}
          level={gameState.level}
          xp={gameState.currentXP}
          rank={currentUserRank}
        />

        <Podium topThree={topThree} />

        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Medal size={20} color="#60A5FA" />
            <Text style={styles.listTitle}>League Table</Text>
          </View>

          {restOfList.map((user) => (
            <RankListItem key={user.rank} user={user} />
          ))}
        </View>

        {/* Footer Info */}
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <Star size={14} color="#C084FC" />
            <Text style={styles.footerTitle}>Weekly Reset</Text>
          </View>
          <Text style={styles.footerText}>Compete for top ranks and exclusive rewards</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  listSection: { paddingHorizontal: 20, marginTop: 24 },
  listHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  listTitle: { color: '#FFF', fontSize: 18, fontFamily: FONTS.bold },
  footer: { marginHorizontal: 20, marginTop: 24, padding: 16, backgroundColor: 'rgba(88, 28, 135, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(88, 28, 135, 0.2)' },
  footerTitle: { color: '#D8B4FE', fontSize: 14, fontFamily: FONTS.bold },
  footerText: { color: '#9CA3AF', fontSize: 12, textAlign: 'center', marginTop: 4 },
});