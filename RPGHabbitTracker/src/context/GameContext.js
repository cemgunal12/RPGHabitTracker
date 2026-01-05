import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Context Oluşturma
const GameContext = createContext();

// Başlangıç Değerleri
const INITIAL_STATE = {
    username: 'Adventurer',
    level: 1,
    currentXP: 0,
    maxXP: 100,
    health: 100,
    maxHealth: 100,
    gold: 100, // Başlangıç için biraz altın verelim ki marketi test et
    // Statlar (Habit ve Shop ile uyumlu)
    stats: {
        mind: 10,
        vitality: 10,
        knowledge: 10,
        wealth: 10,
        creativity: 10,
    },
    inventory: [], // Satın alınan eşyalar buraya gelecek
    badges: [],
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    // --- KAYIT SİSTEMİ (PERSISTENCE) ---

    useEffect(() => {
        loadGame();
    }, []);

    useEffect(() => {
        if (!loading) {
            saveGame();
        }
    }, [gameState]);

    const loadGame = async () => {
        try {
            const savedState = await AsyncStorage.getItem('@rpg_game_state');
            if (savedState) {
                setGameState(JSON.parse(savedState));
            }
        } catch (e) {
            console.error("Veri yüklenemedi:", e);
        } finally {
            setLoading(false);
        }
    };

    const saveGame = async () => {
        try {
            await AsyncStorage.setItem('@rpg_game_state', JSON.stringify(gameState));
        } catch (e) {
            console.error("Veri kaydedilemedi:", e);
        }
    };

    // --- OYUN MANTIĞI ---

    // 1. XP Kazanma ve Level Atlama
    const gainXp = (amount) => {
        setGameState((prev) => {
            let newXP = prev.currentXP + amount;
            let newLevel = prev.level;
            let newMaxXP = prev.maxXP;
            let leveledUp = false;

            while (newXP >= newMaxXP) {
                newXP -= newMaxXP;
                newLevel++;
                newMaxXP = Math.floor(newMaxXP * 1.2);
                leveledUp = true;
            }

            // Level atlayınca canı yenile
            const newHealth = leveledUp ? prev.maxHealth : prev.health;

            return {
                ...prev,
                level: newLevel,
                currentXP: newXP,
                maxXP: newMaxXP,
                health: newHealth,
            };
        });
    };

    // 2. Altın İşlemleri
    const earnGold = (amount) => {
        setGameState(prev => ({ ...prev, gold: prev.gold + amount }));
    };

    // 3. Stat Artırma (Görev yapınca veya eşya alınca)
    const increaseStat = (statName, amount = 1) => {
        // Stat ismini küçük harfe çevir (örn: 'Mind' -> 'mind') hata önlemek için
        const key = statName.toLowerCase();
        
        setGameState(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                [key]: (prev.stats[key] || 0) + amount
            }
        }));
    };

    // 4. MARKET SİSTEMİ (YENİ) - Eşya Satın Alma
    const buyItem = (item) => {
        // Yeterli altın var mı?
        if (gameState.gold < item.price) {
            return { success: false, message: "Not enough gold!" };
        }

        // Eşya zaten var mı? (Opsiyonel: Eğer aynı kılıçtan 2 tane alınamasın istiyorsan)
        const alreadyOwned = gameState.inventory.find(i => i.id === item.id);
        if (alreadyOwned) {
            return { success: false, message: "You already own this item!" };
        }

        // Satın Alma Mantığı
        setGameState(prev => {
            // 1. Altını düş
            const newGold = prev.gold - item.price;
            
            // 2. Envantere ekle
            const newInventory = [...prev.inventory, item];

            // 3. Eşyanın Stat Bonusunu Uygula (Otomatik)
            // Eşya açıklamasından veya kategorisinden hangi statı artıracağını bulalım
            // NOT: İleride item objesine 'statBonus: "mind"' gibi bir alan eklemek daha temiz olur.
            // Şimdilik description'dan tahmin yürütelim veya manuel mapping yapalım.
            const statsToUpdate = { ...prev.stats };
            
            // Basit kelime eşleşmesi ile stat artırma (ShopData ile uyumlu)
            if (item.description.includes("Mind")) statsToUpdate.mind += 5;
            else if (item.description.includes("Vitality")) statsToUpdate.vitality += 5;
            else if (item.description.includes("Knowledge")) statsToUpdate.knowledge += 5;
            else if (item.description.includes("Wealth")) statsToUpdate.wealth += 5;
            else if (item.description.includes("Creativity")) statsToUpdate.creativity += 5;
            else {
                 // Eğer tanınmayan bir stat ise varsayılan olarak Mind artır veya hiçbir şey yapma
                 // statsToUpdate.mind += 1; 
            }

            return {
                ...prev,
                gold: newGold,
                inventory: newInventory,
                stats: statsToUpdate
            };
        });

        return { success: true, message: `Purchased ${item.name}!` };
    };

    // 5. Hasar Alma
    const takeDamage = (amount) => {
        setGameState(prev => {
            let newHealth = prev.health - amount;
            if (newHealth <= 0) {
                newHealth = 50; 
                alert("You fainted! Respawning with 50% health.");
            }
            return { ...prev, health: newHealth };
        });
    };

    const setUsername = (name) => {
        setGameState(prev => ({ ...prev, username: name }));
    };

    return (
        <GameContext.Provider value={{
            gameState,
            loading,
            gainXp,
            earnGold,
            increaseStat,
            buyItem, // Yeni fonksiyon
            takeDamage,
            setUsername
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);