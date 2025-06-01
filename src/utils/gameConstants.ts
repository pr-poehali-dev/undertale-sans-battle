export const GAME_CONSTANTS = {
  PLAYER_SPEED: 3,
  BONE_SPEED: 4,
  COLLISION_DISTANCE: 15,
  FRAME_RATE: 16, // 60 FPS
  ATTACK_DAMAGE: 160,
  BONE_DAMAGE: 1,

  BATTLE_BOX: {
    MIN_X: 240,
    MAX_X: 400,
    MIN_Y: 330,
    MAX_Y: 470,
  },

  CANVAS: {
    WIDTH: 640,
    HEIGHT: 480,
  },

  ATTACK_PATTERNS: ["bones", "laser", "gravity"] as const,

  TIMING: {
    ATTACK_DELAY: 1000,
    DAMAGE_DISPLAY: 1000,
    TURN_DURATION: 3000,
    BONE_SPAWN_INTERVAL: 200,
  },
};

export type AttackPattern = (typeof GAME_CONSTANTS.ATTACK_PATTERNS)[number];
