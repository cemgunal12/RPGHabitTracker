// constants/shopData.js
import React from 'react';
import { Sword, Shield, Crown, Gem, Zap, Sparkles } from 'lucide-react-native';

export const SHOP_ITEMS = [
  { id: 'item-1', name: 'Dragon Blade', description: 'Increases Mind stat permanently', price: 500, category: 'weapon', icon: 'sword', rarity: 'legendary' },
  { id: 'item-2', name: 'Mystic Shield', description: 'Increases Vitality stat permanently', price: 450, category: 'armor', icon: 'shield', rarity: 'epic' },
  { id: 'item-3', name: 'Crown of Wisdom', description: 'Increases Knowledge stat permanently', price: 600, category: 'accessory', icon: 'crown', rarity: 'legendary' },
  { id: 'item-4', name: 'Fortune Gem', description: 'Increases Wealth stat permanently', price: 400, category: 'accessory', icon: 'gem', rarity: 'rare' },
  { id: 'item-5', name: 'XP Boost Potion', description: 'Grants 200 bonus XP instantly', price: 150, category: 'consumable', icon: 'zap', rarity: 'common' },
  { id: 'item-6', name: 'Creativity Crystal', description: 'Increases Creativity stat permanently', price: 500, category: 'accessory', icon: 'sparkles', rarity: 'epic' },
  { id: 'item-7', name: 'Iron Sword', description: 'Increases Mind stat permanently', price: 200, category: 'weapon', icon: 'sword', rarity: 'common' },
  { id: 'item-8', name: 'Steel Armor', description: 'Increases Vitality stat permanently', price: 250, category: 'armor', icon: 'shield', rarity: 'rare' },
];

// Helper Functions
export const getIcon = (iconName, color = '#FFF', size = 32) => {
  switch (iconName) {
    case 'sword': return <Sword size={size} color={color} />;
    case 'shield': return <Shield size={size} color={color} />;
    case 'crown': return <Crown size={size} color={color} />;
    case 'gem': return <Gem size={size} color={color} />;
    case 'zap': return <Zap size={size} color={color} />;
    case 'sparkles': return <Sparkles size={size} color={color} />;
    default: return <Sword size={size} color={color} />;
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