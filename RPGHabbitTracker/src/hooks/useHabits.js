// src/hooks/useHabits.js
import { useState } from 'react';

export const useHabits = () => {
  // Başlangıç verisi (Dummy Data)
  const initialHabits = [
    { id: '1', name: 'Kitap Oku (30 dk)', stat: 'knowledge', difficulty: 'easy', completed: false, streak: 3, type: 'daily' },
    { id: '2', name: 'Spor Yap', stat: 'vitality', difficulty: 'hard', completed: false, streak: 5, type: 'daily' },
    { id: '3', name: 'Haftalık Rapor', stat: 'wealth', difficulty: 'medium', completed: false, streak: 0, type: 'weekly' },
  ];

  const [habits, setHabits] = useState(initialHabits);

  // Görev Ekleme Mantığı
  const addHabit = (newHabit) => {
    const habitWithId = { 
      ...newHabit, 
      id: Date.now().toString(), 
      completed: false, 
      streak: 0 
    };
    setHabits((prev) => [...prev, habitWithId]);
  };

  // Görev Tamamlama Mantığı
  const completeHabit = (id) => {
    setHabits((prev) => 
      prev.map(h => 
        h.id === id 
          ? { ...h, completed: true, streak: h.streak + 1 } 
          : h
      )
    );
  };

  // Görev Silme Mantığı
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter(h => h.id !== id));
  };

  // İstatistikleri Hesaplama Mantığı (Bonus)
  const getProgress = () => {
    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;
    return { total, completed };
  };

  // Dışarıya sadece gerekli verileri ve fonksiyonları açıyoruz
  return {
    habits,
    addHabit,
    completeHabit,
    deleteHabit,
    getProgress
  };
};