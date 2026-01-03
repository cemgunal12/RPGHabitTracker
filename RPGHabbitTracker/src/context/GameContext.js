import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Context Creation
const GameContext = createContext();

// Initial Values (User starts with these values on first launch)
const INITIAL_STATE = {
    username: 'Adventurer',
    level: 1,
    currentXP: 0,
    maxXP: 100, // Required XP for Level 1
    health: 100,
    maxHealth: 100,
    gold: 0,
    // Stat names compatible with Habits.tsx and Profile.tsx
    stats: {
        mind: 10,
        vitality: 10,
        knowledge: 10,
        wealth: 10,
        creativity: 10,
    },
    inventory: [],
    badges: [],
};

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    // --- PERSISTENCE (SAVE SYSTEM) ---

    // Load data when app opens
    useEffect(() => {
        loadGame();
    }, []);

    // Auto-save whenever state changes (Debounce could be added but keeping it simple for now)
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
            console.error("Failed to load data:", e);
        } finally {
            setLoading(false);
        }
    };

    const saveGame = async () => {
        try {
            await AsyncStorage.setItem('@rpg_game_state', JSON.stringify(gameState));
        } catch (e) {
            console.error("Failed to save data:", e);
        }
    };

    // --- GAME LOGIC ---

    // 1. Gain XP and Level Up
    const gainXp = (amount) => {
        setGameState((prev) => {
            let newXP = prev.currentXP + amount;
            let newLevel = prev.level;
            let newMaxXP = prev.maxXP;
            let leveledUp = false;

            // Level up loop (If too much XP comes, can level up multiple times)
            while (newXP >= newMaxXP) {
                newXP -= newMaxXP;
                newLevel++;
                newMaxXP = Math.floor(newMaxXP * 1.2); // Difficulty increases by 20% each level
                leveledUp = true;
            }

            // If leveled up, restore health to full
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

    // 2. Earn Gold / Spend Gold
    const earnGold = (amount) => {
        setGameState(prev => ({ ...prev, gold: prev.gold + amount }));
    };

    const spendGold = (amount) => {
        if (gameState.gold >= amount) {
            setGameState(prev => ({ ...prev, gold: prev.gold - amount }));
            return true; // Purchase successful
        }
        return false; // Insufficient balance
    };

    // 3. Take Damage (If quest not done or Boss hits)
    const takeDamage = (amount) => {
        setGameState(prev => {
            let newHealth = prev.health - amount;

            // Did the character die? (Simple penalty system)
            if (newHealth <= 0) {
                newHealth = 50; // Bring health to half
                // Penalty: Could lose XP or Gold (For now just renewing health)
                alert("You fainted! Your health has been restored but be careful.");
            }

            return { ...prev, health: newHealth };
        });
    };

    // 4. Increase Stat (Ex: Vitality increases when exercising)
    const increaseStat = (statName, amount = 1) => {
        setGameState(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                [statName]: (prev.stats[statName] || 0) + amount
            }
        }));
    };

    // 5. Set Username
    const setUsername = (name) => {
        setGameState(prev => ({ ...prev, username: name }));
    };

    // Functions and data we expose
    return (
        <GameContext.Provider value={{
            gameState,
            loading,
            gainXp,
            earnGold,
            spendGold,
            takeDamage,
            increaseStat,
            setUsername
        }}>
            {children}
        </GameContext.Provider>
    );
};

// Simplify usage as a Hook
export const useGame = () => useContext(GameContext);