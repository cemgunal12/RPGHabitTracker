import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const GameContext = createContext();

// --- SABİT VERİLER ---
const BOSSES = [
  {
    id: 'boss-1',
    name: 'Shadow Dragon',
    maxHealth: 5000,
    damage: 20,
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
    imageUrl: 'https://images.stockcake.com/public/b/1/2/b12f66ce-4c78-4b7b-9d98-5f6efadbb7c6_large/fiery-phoenix-emerge-stockcake.jpg',
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
    gold: 500,
    stats: { mind: 10, vitality: 10, knowledge: 10, wealth: 10, creativity: 10 },
    inventory: [], 
    badges: [],
    habits: [], // <--- YENİ EKLENDİ: Alışkanlıkları burada tutacağız
    equippedItems: {}, 
    weaponDamage: 10, 
};

const INITIAL_BOSS_STATE = {
    index: 0,
    currentHealth: BOSSES[0].maxHealth
};

// Tarih formatlayıcı (Calendar ile uyumlu olması için)
const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [bossState, setBossState] = useState(INITIAL_BOSS_STATE);
    const [loading, setLoading] = useState(true);

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

    const currentBossData = BOSSES[bossState.index] || BOSSES[BOSSES.length - 1];
    
    const activeBoss = {
        ...currentBossData,
        health: bossState.currentHealth,
        bossNumber: bossState.index + 1,
        totalBosses: BOSSES.length
    };

    // --- TEMEL OYUN FONKSİYONLARI ---

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

    // --- MARKET SİSTEMİ ---

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

            return { 
                ...prev, 
                gold: prev.gold - item.price, 
                inventory: [...prev.inventory, item], 
                stats: statsToUpdate,
            };
        });
        return { success: true, message: `Purchased ${item.name}!` };
    };

    const sellItem = (item) => {
        setGameState(prev => {
            const sellPrice = Math.floor(item.price * 0.5);
            const index = prev.inventory.findIndex(i => i.id === item.id);
            const newInventory = [...prev.inventory];
            if (index > -1) newInventory.splice(index, 1);

            const newEquippedItems = { ...prev.equippedItems };
            Object.keys(newEquippedItems).forEach(slot => {
                if (newEquippedItems[slot].id === item.id) delete newEquippedItems[slot];
            });

            return { ...prev, gold: prev.gold + sellPrice, inventory: newInventory, equippedItems: newEquippedItems };
        });
        return { success: true, message: "Item sold!" };
    };

    const equipItem = (item) => {
        const slot = item.slotType || 'weapon';
        setGameState(prev => {
            const newEquippedItems = { ...prev.equippedItems, [slot]: item };
            let newWeaponDamage = prev.weaponDamage;
            if (slot === 'weapon' && item.statBonus?.stat === 'damage') {
                newWeaponDamage = 10 + item.statBonus.amount;
            }
            return { ...prev, equippedItems: newEquippedItems, weaponDamage: newWeaponDamage };
        });
    };

    const unequipItem = (slot) => {
        setGameState(prev => {
            const newEquippedItems = { ...prev.equippedItems };
            delete newEquippedItems[slot];
            let newWeaponDamage = prev.weaponDamage;
            if (slot === 'weapon') newWeaponDamage = 10;
            return { ...prev, equippedItems: newEquippedItems, weaponDamage: newWeaponDamage };
        });
    };

    // --- BOSS SAVAŞ SİSTEMİ ---

    const damageBoss = (amount) => {
        setBossState(prev => {
            let newHealth = prev.currentHealth - amount;

            if (newHealth <= 0) {
                const defeatedBoss = BOSSES[prev.index];
                
                setGameState(gs => ({
                    ...gs,
                    badges: [...gs.badges, defeatedBoss.badge]
                }));

                Alert.alert("VICTORY! 🏆", `You defeated ${defeatedBoss.name} and earned the ${defeatedBoss.badge.name} badge!`);

                const nextIndex = prev.index + 1;
                
                if (nextIndex >= BOSSES.length) {
                    Alert.alert("GAME CLEARED", "You are the ultimate legend! All bosses defeated.");
                    return { index: prev.index, currentHealth: defeatedBoss.maxHealth };
                }

                return {
                    index: nextIndex,
                    currentHealth: BOSSES[nextIndex].maxHealth
                };
            }

            return { ...prev, currentHealth: newHealth };
        });
    };

    const triggerDayEnd = () => {
        setGameState(prev => {
            let newHealth = prev.health - activeBoss.damage;
            let playerDied = false;

            if (newHealth <= 0) {
                playerDied = true;
                newHealth = prev.maxHealth;
                Alert.alert("YOU DIED ☠️", `${activeBoss.name} defeated you! Boss health has been reset.`);
            } else {
                Alert.alert("Day Ended", `${activeBoss.name} attacked! You took ${activeBoss.damage} damage.`);
            }

            if (playerDied) {
                setBossState(bs => ({ ...bs, currentHealth: BOSSES[bs.index].maxHealth }));
            }

            return { ...prev, health: newHealth };
        });
    };

    // --- HABIT (ALIŞKANLIK) SİSTEMİ [YENİ EKLENDİ] ---

    const addHabit = (habit) => {
        setGameState(prev => ({
            ...prev,
            habits: [...prev.habits, { ...habit, id: Date.now().toString(), completionDates: [] }]
        }));
    };

    const deleteHabit = (habitId) => {
        setGameState(prev => ({
            ...prev,
            habits: prev.habits.filter(h => h.id !== habitId)
        }));
    };

    // Görevi Yapma / Geri Alma Fonksiyonu
    const toggleHabit = (habitId) => {
        const today = getTodayString(); // "2026-01-13"

        setGameState(prev => {
            const habitIndex = prev.habits.findIndex(h => h.id === habitId);
            if (habitIndex === -1) return prev;

            const habit = prev.habits[habitIndex];
            const isCompletedToday = habit.completionDates.includes(today);

            let newCompletionDates;
            if (isCompletedToday) {
                // UNCHECK (Geri Al)
                newCompletionDates = habit.completionDates.filter(d => d !== today);
                // Not: XP/Gold geri almıyoruz (istenirse eklenebilir), ama Boss canını geri eklemiyoruz.
            } else {
                // CHECK (Tamamla)
                newCompletionDates = [...habit.completionDates, today];
                
                // ÖDÜLLERİ VER
                // 1. XP Kazan
                gainXp(10); 
                // 2. Altın Kazan
                earnGold(5);
                // 3. Boss'a Vur (Eldeki silah hasarı kadar)
                damageBoss(prev.weaponDamage);
            }

            // State'i güncelle
            const updatedHabits = [...prev.habits];
            updatedHabits[habitIndex] = { ...habit, completionDates: newCompletionDates };

            return { ...prev, habits: updatedHabits };
        });
    };

    return (
        <GameContext.Provider value={{
            gameState,
            boss: activeBoss,
            loading,
            // Temel Fonksiyonlar
            gainXp,
            earnGold,
            increaseStat,
            setUsername: (name) => setGameState(prev => ({ ...prev, username: name })),
            // Market & Eşya
            buyItem,
            equipItem,
            sellItem,
            unequipItem,
            // Boss
            triggerDayEnd,
            damageBoss,
            // Alışkanlıklar (Calendar ve Home Screen için gerekli)
            addHabit,
            deleteHabit,
            toggleHabit, 
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);