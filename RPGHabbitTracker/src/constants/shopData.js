import React from 'react';
// 1. Gerekli İkonları Import Ediyoruz
import {
  Sword, Shield, Crown, Gem, Zap, Sparkles,
  Cat, Dog, Ghost, Shirt, Footprints, Circle, Package
} from 'lucide-react-native';

export const SHOP_ITEMS = [
  // Weapons
  {
    id: 'weapon-1',
    name: 'Iron Blade',
    description: 'A sturdy iron sword',
    price: 250,
    category: 'weapon',
    icon: 'sword',
    rarity: 'rare',
    statBonus: { stat: 'damage', amount: 5 },
    slotType: 'weapon',
  },
  {
    id: 'weapon-2',
    name: 'Dragon Slayer',
    description: 'Legendary blade of heroes',
    price: 800,
    category: 'weapon',
    icon: 'sword',
    rarity: 'epic',
    statBonus: { stat: 'damage', amount: 15 },
    slotType: 'weapon',
  },
  {
    id: 'weapon-3',
    name: 'Celestial Sword',
    description: 'Forged in starlight',
    price: 1500,
    category: 'weapon',
    icon: 'sword',
    rarity: 'legendary',
    statBonus: { stat: 'damage', amount: 30 },
    slotType: 'weapon',
  },
  // Shields
  {
    id: 'shield-1',
    name: 'Wooden Shield',
    description: 'Basic protection',
    price: 200,
    category: 'armor',
    icon: 'shield',
    rarity: 'rare',
    statBonus: { stat: 'defense', amount: 3 },
    slotType: 'shield',
  },
  {
    id: 'shield-2',
    name: 'Steel Bulwark',
    description: 'Strong defensive shield',
    price: 600,
    category: 'armor',
    icon: 'shield',
    rarity: 'epic',
    statBonus: { stat: 'defense', amount: 10 },
    slotType: 'shield',
  },
  // Helmets
  {
    id: 'helmet-1',
    name: 'Iron Helmet',
    description: 'Protects your head',
    price: 180,
    category: 'armor',
    icon: 'crown',
    rarity: 'rare',
    statBonus: { stat: 'defense', amount: 2 },
    slotType: 'helmet',
  },
  // Chest Armor
  {
    id: 'chest-1',
    name: 'Leather Vest',
    description: 'Light protection',
    price: 300,
    category: 'armor',
    icon: 'shirt',
    rarity: 'rare',
    statBonus: { stat: 'defense', amount: 5 },
    slotType: 'chest',
  },
  {
    id: 'chest-3',
    name: 'Dragon Scale',
    description: 'Ultimate protection',
    price: 1400,
    category: 'armor',
    icon: 'shirt',
    rarity: 'legendary',
    statBonus: { stat: 'defense', amount: 25 },
    slotType: 'chest',
  },
  // Boots
  {
    id: 'boots-2',
    name: 'Swift Boots',
    description: 'Enhanced movement',
    price: 450,
    category: 'armor',
    icon: 'boots',
    rarity: 'epic',
    statBonus: { stat: 'health', amount: 30 },
    slotType: 'boots',
  },
  // Rings
  {
    id: 'ring-3',
    name: 'Gold Ring',
    description: 'Major XP boost',
    price: 1300,
    category: 'accessory',
    icon: 'circle',
    rarity: 'legendary',
    statBonus: { stat: 'xp', amount: 25 },
    slotType: 'ring',
  },
  // Companions
  {
    id: 'companion-1',
    name: 'Brave Cat',
    description: 'A loyal feline companion',
    price: 400,
    category: 'companion',
    icon: 'cat',
    rarity: 'rare',
    statBonus: { stat: 'damage', amount: 3 },
    slotType: 'companion',
  },
  {
    id: 'companion-2',
    name: 'Alpha Wolf',
    description: 'A strong wolf companion',
    price: 400,
    category: 'companion',
    icon: 'wolf',
    rarity: 'epic',
    statBonus: { stat: 'damage', amount: 3 },
    slotType: 'companion',
  },
  {
    id: 'companion-3',
    name: 'Ancient Dragon',
    description: 'Legendary beast companion',
    price: 1500,
    category: 'companion',
    icon: 'dragon',
    rarity: 'legendary',
    statBonus: { stat: 'damage', amount: 20 },
    slotType: 'companion',
  },
  // Consumables
  {
    id: 'consumable-1',
    name: 'XP Potion',
    description: 'Grants 200 bonus XP',
    price: 150,
    category: 'consumable',
    icon: 'zap',
    rarity: 'rare',
    statBonus: { stat: 'xp', amount: 200 },
  },
];

// Helper Functions
export const getIcon = (iconName, color = '#FFF', size = 32) => {
  // Gelen isme göre doğru ikonu döndür
  switch (iconName) {
    // Silahlar & Zırhlar
    case 'sword': return <Sword size={size} color={color} />;
    case 'shield': return <Shield size={size} color={color} />;
    case 'crown': return <Crown size={size} color={color} />;
    case 'shirt': return <Shirt size={size} color={color} />;

    // BURASI DÜZELTİLDİ:
    case 'boots': return <Footprints size={size} color={color} />; // 'boots' gelince Footprints

    // Aksesuarlar
    case 'circle': return <Circle size={size} color={color} />;
    case 'gem': return <Gem size={size} color={color} />;

    // Yoldaşlar (Companions)
    case 'cat': return <Cat size={size} color={color} />;

    // BURASI DÜZELTİLDİ:
    case 'wolf': return <Skull size={size} color={color} />;
    case 'dragon': return <Ghost size={size} color={color} />; // 'dragon' gelince Ghost

    // Tüketilebilirler
    case 'zap': return <Zap size={size} color={color} />;
    case 'sparkles': return <Sparkles size={size} color={color} />;

    // Hiçbiri değilse varsayılan
    default: return <Package size={size} color={color} />;
  }
};

export const getRarityColors = (rarity) => {
  switch (rarity) {
    case 'legendary': return ['#FFD700', '#FFA500'];
    case 'epic': return ['#8A2BE2', '#9370DB'];
    case 'rare': return ['#00F0FF', '#0099CC'];
    default: return ['#808080', '#606060'];
  }
};

export const getBorderColor = (rarity) => {
  switch (rarity) {
    case 'legendary': return '#FFD700';
    case 'epic': return '#8A2BE2';
    case 'rare': return '#00F0FF';
    default: return '#606060';
  }
};