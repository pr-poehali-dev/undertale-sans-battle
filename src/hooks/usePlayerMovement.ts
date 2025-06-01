import { useState, useEffect } from "react";
import { GAME_CONSTANTS } from "@/utils/gameConstants";

interface Position {
  x: number;
  y: number;
}

export const usePlayerMovement = (keys: Set<string>, isActive: boolean) => {
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: 320,
    y: 400,
  });

  useEffect(() => {
    const movePlayer = () => {
      if (!isActive) return;

      setPlayerPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys.has("ArrowLeft") || keys.has("a"))
          newX -= GAME_CONSTANTS.PLAYER_SPEED;
        if (keys.has("ArrowRight") || keys.has("d"))
          newX += GAME_CONSTANTS.PLAYER_SPEED;
        if (keys.has("ArrowUp") || keys.has("w"))
          newY -= GAME_CONSTANTS.PLAYER_SPEED;
        if (keys.has("ArrowDown") || keys.has("s"))
          newY += GAME_CONSTANTS.PLAYER_SPEED;

        // Boundary checks
        newX = Math.max(
          GAME_CONSTANTS.BATTLE_BOX.MIN_X,
          Math.min(GAME_CONSTANTS.BATTLE_BOX.MAX_X, newX),
        );
        newY = Math.max(
          GAME_CONSTANTS.BATTLE_BOX.MIN_Y,
          Math.min(GAME_CONSTANTS.BATTLE_BOX.MAX_Y, newY),
        );

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(movePlayer, 16);
    return () => clearInterval(interval);
  }, [keys, isActive]);

  return playerPosition;
};
