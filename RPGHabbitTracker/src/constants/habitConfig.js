import { Brain, Heart, BookOpen, Coins, Sparkles } from 'lucide-react-native';

// İkon Eşleştirmeleri
export const STAT_ICONS = {
  mind: Brain,
  vitality: Heart,
  knowledge: BookOpen,
  wealth: Coins,
  creativity: Sparkles,
};

// Stat Renkleri
export const STAT_COLORS = {
  mind: ['#8A2BE2', '#9370DB'],
  vitality: ['#FF1744', '#C4001D'],
  knowledge: ['#00F0FF', '#0099CC'],
  wealth: ['#FFD700', '#FFA500'],
  creativity: ['#FF1744', '#FF69B4'],
};

// Zorluk Seviyesi Ayarları
export const DIFFICULTY_CONFIG = {
  easy: { 
    label: 'Easy', 
    gradient: ['#00FF88', '#00CC6A'],
    borderColor: '#00FF88',
    xp: '+10 XP',
    gold: '+5g'
  },
  medium: { 
    label: 'Medium', 
    gradient: ['#FFD700', '#FFA500'],
    borderColor: '#FFD700',
    xp: '+25 XP',
    gold: '+15g'
  },
  hard: { 
    label: 'Hard', 
    gradient: ['#FF1744', '#C4001D'],
    borderColor: '#FF1744',
    xp: '+50 XP',
    gold: '+30g'
  },
};