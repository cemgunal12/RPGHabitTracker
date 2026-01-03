export const DIFFICULTY_CONFIG = {
  easy: { xp: 10, gold: 5, damage: 50 },
  medium: { xp: 25, gold: 15, damage: 100 },
  hard: { xp: 50, gold: 30, damage: 200 },
};

export const LEVEL_UP_FORMULA = (level) => level * 100 * 1.5;