import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const GameContext = createContext();

// --- SABİT VERİLER ---

// 4 Bosslu Liste
const BOSSES = [
  {
    id: 'boss-1',
    name: 'Shadow Dragon',
    maxHealth: 5000,
    damage: 20, // Oyuncuya vurduğu hasar
    imageUrl: 'https://images.unsplash.com/photo-1718202384239-8de0147482c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    badge: { name: 'Dragon Slayer', description: 'Defeated the Shadow Dragon', icon: '🐉' },
  },
  {
    id: 'boss-2',
    name: 'Dark Knight',
    maxHealth: 7500,
    damage: 35,
    imageUrl: 'https://images.unsplash.com/photo-1627732922021-e73df99d192e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    badge: { name: 'Knight Vanquisher', description: 'Defeated the Dark Knight', icon: '⚔️' },
  },
  {
    id: 'boss-3',
    name: 'Demon Lord',
    maxHealth: 10000,
    damage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1761325684397-b91138faca5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    badge: { name: 'Demon Slayer', description: 'Defeated the Demon Lord', icon: '👹' },
  },
  {
    id: 'boss-4',
    name: 'Phoenix Overlord',
    maxHealth: 12500,
    damage: 75,
    imageUrl: 'https://images.unsplash.com/photo-1508817172652-4be4be2795cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    badge: { name: 'Flame Master', description: 'Defeated the Phoenix Overlord', icon: '🔥' },
  },
];

const INITIAL_STATE = {
    username: 'Adventurer',
    level: 1,
    currentXP: 0,
    maxXP: 100,
    health: 100,
    maxHealth: 100,
    gold: 100,
    stats: { mind: 10, vitality: 10, knowledge: 10, wealth: 10, creativity: 10 },
    inventory: [],
    badges: [], // Kazanılan rozetler buraya gelecek
};

// Boss'un dinamik durumu (Sadece canını ve kaçıncı boss olduğunu tutuyoruz)
const INITIAL_BOSS_STATE = {
    index: 0, // 0 = İlk boss
    currentHealth: BOSSES[0].maxHealth
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [bossState, setBossState] = useState(INITIAL_BOSS_STATE);
    const [loading, setLoading] = useState(true);

    // --- YÜKLEME & KAYDETME ---
    useEffect(() => { loadGame(); }, []);
    
    useEffect(() => { 
        if (!loading) { saveGame(); } 
    }, [gameState, bossState]);

    const loadGame = async () => {
        try {
            const savedState = await AsyncStorage.getItem('@rpg_game_state');
            const savedBoss = await AsyncStorage.getItem('@rpg_boss_state');
            
            if (savedState) setGameState(JSON.parse(savedState));
            if (savedBoss) setBossState(JSON.parse(savedBoss));
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const saveGame = async () => {
        try {
            await AsyncStorage.setItem('@rpg_game_state', JSON.stringify(gameState));
            await AsyncStorage.setItem('@rpg_boss_state', JSON.stringify(bossState));
        } catch (e) { console.error(e); }
    };

    // --- AKTİF BOSS VERİSİNİ OLUŞTURMA ---
    // Sabit verilerle değişken verileri (can) birleştiriyoruz
    const currentBossData = BOSSES[bossState.index] || BOSSES[BOSSES.length - 1]; // Hata önlemek için
    
    const activeBoss = {
        ...currentBossData,
        health: bossState.currentHealth,
        bossNumber: bossState.index + 1,
        totalBosses: BOSSES.length
    };

    // --- OYUN FONKSİYONLARI ---

    const gainXp = (amount) => {
        setGameState((prev) => {
            let newXP = prev.currentXP + amount;
            let newLevel = prev.level;
            let newMaxXP = prev.maxXP;
            let leveledUp = false;
            while (newXP >= newMaxXP) {
                newXP -= newMaxXP; newLevel++; newMaxXP = Math.floor(newMaxXP * 1.2); leveledUp = true;
            }
            return { ...prev, level: newLevel, currentXP: newXP, maxXP: newMaxXP, health: leveledUp ? prev.maxHealth : prev.health };
        });
    };

    const earnGold = (amount) => setGameState(prev => ({ ...prev, gold: prev.gold + amount }));
    
    const increaseStat = (statName, amount = 1) => {
        const key = statName.toLowerCase();
        setGameState(prev => ({ ...prev, stats: { ...prev.stats, [key]: (prev.stats[key] || 0) + amount } }));
    };

    const buyItem = (item) => {
        if (gameState.gold < item.price) return { success: false, message: "Not enough gold!" };
        if (gameState.inventory.find(i => i.id === item.id)) return { success: false, message: "Owned!" };
        
        setGameState(prev => {
            const statsToUpdate = { ...prev.stats };
            if (item.description.includes("Mind")) statsToUpdate.mind += 5;
            else if (item.description.includes("Vitality")) statsToUpdate.vitality += 5;
            else if (item.description.includes("Knowledge")) statsToUpdate.knowledge += 5;
            else if (item.description.includes("Wealth")) statsToUpdate.wealth += 5;
            else if (item.description.includes("Creativity")) statsToUpdate.creativity += 5;

            return { ...prev, gold: prev.gold - item.price, inventory: [...prev.inventory, item], stats: statsToUpdate };
        });
        return { success: true, message: `Purchased ${item.name}!` };
    };

    // --- BOSS MANTIĞI ---

    // 1. Boss'a Hasar Verme
    const damageBoss = (amount) => {
        setBossState(prev => {
            let newHealth = prev.currentHealth - amount;

            // BOSS ÖLDÜ MÜ?
            if (newHealth <= 0) {
                const defeatedBoss = BOSSES[prev.index];
                
                // Ödül: Badge Ekle
                setGameState(gs => ({
                    ...gs,
                    badges: [...gs.badges, defeatedBoss.badge]
                }));

                Alert.alert("VICTORY! 🏆", `You defeated ${defeatedBoss.name} and earned the ${defeatedBoss.badge.name} badge!`);

                // Sonraki Boss'a Geç
                const nextIndex = prev.index + 1;
                
                // Eğer oyun bittiyse (tüm bosslar öldü)
                if (nextIndex >= BOSSES.length) {
                    Alert.alert("GAME CLEARED", "You are the ultimate legend! All bosses defeated.");
                    // İstersen burada oyunu sıfırlayabilir veya sonsuz moda alabilirsin.
                    // Şimdilik son boss'ta kalsın ama canı fullensin:
                    return { index: prev.index, currentHealth: defeatedBoss.maxHealth };
                }

                // Yeni Boss Yükle
                return {
                    index: nextIndex,
                    currentHealth: BOSSES[nextIndex].maxHealth
                };
            }

            return { ...prev, currentHealth: newHealth };
        });
    };

    // 2. Gün Sonu (Boss Saldırısı)
    const triggerDayEnd = () => {
        setGameState(prev => {
            let newHealth = prev.health - activeBoss.damage;
            let playerDied = false;

            // Karakter Öldü mü?
            if (newHealth <= 0) {
                playerDied = true;
                newHealth = prev.maxHealth; // Karakter canlanır
                Alert.alert("YOU DIED ☠️", `${activeBoss.name} defeated you! Boss health has been reset.`);
            } else {
                Alert.alert("Day Ended", `${activeBoss.name} attacked! You took ${activeBoss.damage} damage.`);
            }

            // Eğer karakter öldüyse, AKTİF BOSS'un canını fulle
            if (playerDied) {
                setBossState(bs => ({
                    ...bs,
                    currentHealth: BOSSES[bs.index].maxHealth
                }));
            }

            return { ...prev, health: newHealth };
        });
    };

    return (
        <GameContext.Provider value={{
            gameState,
            boss: activeBoss, // Birleştirilmiş boss verisi
            loading,
            gainXp,
            earnGold,
            increaseStat,
            buyItem,
            triggerDayEnd,
            damageBoss,
            setUsername: (name) => setGameState(prev => ({ ...prev, username: name }))
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);