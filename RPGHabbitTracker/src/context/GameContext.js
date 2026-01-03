import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Context Oluşturma
const GameContext = createContext();

// Başlangıç Değerleri (Kullanıcı ilk kez açtığında bu değerlerle başlar)
const INITIAL_STATE = {
  username: 'Adventurer',
  level: 1,
  currentXP: 0,
  maxXP: 100, // Level 1 için gereken XP
  health: 100,
  maxHealth: 100,
  gold: 0,
  // Habits.tsx ve Profile.tsx ile uyumlu stat isimleri
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

  // --- PERSISTENCE (KAYIT SİSTEMİ) ---
  
  // Uygulama açılınca veriyi yükle
  useEffect(() => {
    loadGame();
  }, []);

  // State her değiştiğinde otomatik kaydet (Debounce eklenebilir ama şimdilik basit tutalım)
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

  // --- GAME LOGIC (OYUN MANTIĞI) ---

  // 1. XP Kazanma ve Level Atlama
  const gainXp = (amount) => {
    setGameState((prev) => {
      let newXP = prev.currentXP + amount;
      let newLevel = prev.level;
      let newMaxXP = prev.maxXP;
      let leveledUp = false;

      // Level atlama döngüsü (Eğer çok fazla XP gelirse birden fazla level atlayabilir)
      while (newXP >= newMaxXP) {
        newXP -= newMaxXP;
        newLevel++;
        newMaxXP = Math.floor(newMaxXP * 1.2); // Her levelde zorluk %20 artar
        leveledUp = true;
      }

      // Level atladıysa canı fulleriz
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

  // 2. Altın Kazanma / Harcama
  const earnGold = (amount) => {
    setGameState(prev => ({ ...prev, gold: prev.gold + amount }));
  };

  const spendGold = (amount) => {
    if (gameState.gold >= amount) {
      setGameState(prev => ({ ...prev, gold: prev.gold - amount }));
      return true; // Satın alma başarılı
    }
    return false; // Yetersiz bakiye
  };

  // 3. Hasar Alma (Görev yapılmazsa veya Boss vurursa)
  const takeDamage = (amount) => {
    setGameState(prev => {
      let newHealth = prev.health - amount;
      
      // Karakter öldü mü? (Basit ceza sistemi)
      if (newHealth <= 0) {
        newHealth = 50; // Canı yarısına getir
        // Ceza: XP veya Altın kaybedebilir (Şimdilik sadece can yeniliyoruz)
        alert("Bayıldın! Canın yenilendi ama dikkat et.");
      }

      return { ...prev, health: newHealth };
    });
  };

  // 4. Stat Artırma (Örn: Spor yapınca Vitality artar)
  const increaseStat = (statName, amount = 1) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: (prev.stats[statName] || 0) + amount
      }
    }));
  };

  // 5. Kullanıcı Adı Ayarlama
  const setUsername = (name) => {
    setGameState(prev => ({ ...prev, username: name }));
  };

  // Dışarıya açtığımız fonksiyonlar ve veriler
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

// Hook olarak kullanımı kolaylaştır
export const useGame = () => useContext(GameContext);