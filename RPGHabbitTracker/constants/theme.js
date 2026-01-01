// src/constants/theme.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// theme.css dosyanızdaki renklerin JS karşılığı
export const COLORS = {
  // Temel Renkler
  background: "#121212",      // css: --background
  foreground: "#ffffff",      // css: --foreground
  
  // Kart ve Arayüz Elemanları
  card: "#1E1E1E",            // css: --card
  cardBorder: "rgba(138, 43, 226, 0.2)", // css: --border
  
  // Ana Temalar (Cyberpunk Palette)
  primary: "#8A2BE2",         // css: --primary (Mor)
  secondary: "#00F0FF",       // css: --secondary (Neon Mavi)
  accent: "#8A2BE2",          // css: --accent
  
  // Durum Renkleri
  destructive: "#FF1744",     // css: --destructive (Kırmızı)
  success: "#00FF88",         // css: --chart-5 (Yeşilimsi)
  warning: "#FFD700",         // css: --chart-4 (Altın Sarısı)
  muted: "#2A2A2A",           // css: --muted
  mutedForeground: "#A0A0A0", // css: --muted-foreground

  // UI Bileşenleri
  inputBackground: "#2A2A2A", // css: --input-background
  ring: "#8A2BE2",            // css: --ring
};

// fonts.css dosyanızdaki ayarların karşılığı
// Not: Bu isimler expo-font yüklemesiyle eşleşmeli
export const FONTS = {
  regular: "Orbitron_400Regular",
  medium: "Orbitron_500Medium",
  bold: "Orbitron_700Bold",
  extraBold: "Orbitron_800ExtraBold",
  black: "Orbitron_900Black",
};

// tailwind.css ve index.css içindeki genel boyutlandırmalar
export const SIZES = {
  // Global boyutlar
  base: 16,             // css: --font-size
  radius: 16,           // css: --radius (1rem = ~16px)
  padding: 20,
  
  // Ekran Boyutları
  width,
  height,

  // Font Boyutları (Tailwind typography karşılıkları)
  h1: 32, // text-2xl
  h2: 24, // text-xl
  h3: 20, // text-lg
  h4: 16, // text-base
  body: 14,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;