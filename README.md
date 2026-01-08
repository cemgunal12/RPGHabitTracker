# ⚔️ LifeQuest: Gamified Habit Tracker RPG

> **Turn your daily habits into an epic adventure. Level up your character, defeat bosses, and master your life.**

## 📖 Overview

**LifeQuest** is a mobile application built with **React Native** that combines productivity with RPG elements. Users track their daily habits, which act as "Quests." Completing these quests rewards the user with **XP** and **Gold**, allowing them to level up, buy equipment, and defeat powerful bosses.

The app features a **Cyberpunk/Dark UI** aesthetic, comprehensive inventory management, and a robust stat system.

---

## 🚀 Key Features

### 🎮 Gamification
* **Habits as Quests:** Daily and weekly tasks that grant rewards upon completion.
* **Leveling System:** Gain XP to level up and unlock new challenges.
* **Streak System:** Visual streak tracking with a calendar view to keep motivation high.
* **Boss Battles:** Your daily productivity directly deals damage to Bosses. Defeating them grants Badge rewards.

### 🛍️ Economy & Shop
* **Gold System:** Earn currency by completing habits.
* **Item Shop:** Purchase Weapons, Armor, Accessories, and **Companions (Pets)**.
* **Dynamic Filtering:** Filter shop items by category (Weapon, Armor, Pets, etc.).

### 🎒 Inventory & Gear
* **Equipment System:** Equip items to specific slots (Weapon, Shield, Helm, Armor, Legs, Ring, Pet).
* **Stat Boosts:** Items boost specific stats (STR, VIT, HP, XP Gain).
* **Inventory Management:** View detailed item stats, equip/unequip gear, and **sell unwanted items** for gold.

### 📊 Dashboard & Profile
* **Hero Section:** Visual representation of your character, level, and current streak.
* **Visual Stats:** Radar charts (Pentagon) to visualize character attributes (Mind, Vitality, Knowledge, Wealth, Creativity).
* **Leaderboard:** Compete with other "adventurers" (Mock data implementation).

---

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
* **State Management:** React Context API (`GameContext`)
* **Storage:** Async Storage (Local persistence)
* **UI/Styling:**
    * `StyleSheet` (Custom Native Styling)
    * `expo-linear-gradient` (For immersive UI backgrounds)
    * `react-native-svg` (For charts and calendar visuals)
    * `@expo-google-fonts` (Orbitron font for Cyberpunk feel)
* **Icons:** `@expo/vector-icons` (MaterialCommunityIcons)
