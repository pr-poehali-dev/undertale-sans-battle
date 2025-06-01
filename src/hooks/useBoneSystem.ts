import { useState, useEffect } from "react";
import { GAME_CONSTANTS } from "@/utils/gameConstants";

interface Bone {
  x: number;
  y: number;
  direction: string;
  id: number;
}

export const useBoneSystem = (
  isActive: boolean,
  playerPosition: { x: number; y: number },
  onCollision: () => void,
) => {
  const [bones, setBones] = useState<Bone[]>([]);

  const updateBones = () => {
    setBones((prev) =>
      prev
        .map((bone) => ({
          ...bone,
          x:
            bone.direction === "left"
              ? bone.x - GAME_CONSTANTS.BONE_SPEED
              : bone.x + GAME_CONSTANTS.BONE_SPEED,
          y:
            bone.direction === "up"
              ? bone.y - GAME_CONSTANTS.BONE_SPEED
              : bone.y + GAME_CONSTANTS.BONE_SPEED,
        }))
        .filter(
          (bone) =>
            bone.x > -50 &&
            bone.x < GAME_CONSTANTS.CANVAS.WIDTH + 50 &&
            bone.y > -50 &&
            bone.y < GAME_CONSTANTS.CANVAS.HEIGHT + 50,
        ),
    );
  };

  const checkCollisions = () => {
    bones.forEach((bone) => {
      const distance = Math.sqrt(
        Math.pow(bone.x - playerPosition.x, 2) +
          Math.pow(bone.y - playerPosition.y, 2),
      );

      if (distance < GAME_CONSTANTS.COLLISION_DISTANCE) {
        onCollision();
        setBones((prev) => prev.filter((b) => b.id !== bone.id));
      }
    });
  };

  const spawnBones = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        setBones((prev) => [
          ...prev,
          {
            x: Math.random() * GAME_CONSTANTS.CANVAS.WIDTH,
            y: -20,
            direction: "down",
            id: Date.now() + i,
          },
        ]);
      }, i * GAME_CONSTANTS.TIMING.BONE_SPAWN_INTERVAL);
    }
  };

  const clearBones = () => setBones([]);

  useEffect(() => {
    if (!isActive) return;

    const gameLoop = setInterval(() => {
      updateBones();
      checkCollisions();
    }, GAME_CONSTANTS.FRAME_RATE);

    return () => clearInterval(gameLoop);
  }, [isActive, bones, playerPosition]);

  return {
    bones,
    spawnBones,
    clearBones,
  };
};
