import { useState } from "react";

export interface GameState {
  phase: "intro" | "menu" | "attack" | "dodge" | "gameover";
  playerHP: number;
  sansHP: number;
  turn: number;
  isPlayerTurn: boolean;
  attackPattern: string | null;
}

const INITIAL_GAME_STATE: GameState = {
  phase: "intro",
  playerHP: 92,
  sansHP: 100000,
  turn: 1,
  isPlayerTurn: true,
  attackPattern: null,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const takeDamage = (damage: number) => {
    setGameState((prev) => {
      const newHP = Math.max(0, prev.playerHP - damage);
      return {
        ...prev,
        playerHP: newHP,
        phase: newHP <= 0 ? "gameover" : prev.phase,
      };
    });
  };

  const dealDamageToSans = (damage: number) => {
    setGameState((prev) => ({
      ...prev,
      sansHP: prev.sansHP - damage,
      phase: "dodge",
      isPlayerTurn: false,
      attackPattern: "bones",
    }));
  };

  const endTurn = () => {
    setGameState((prev) => ({
      ...prev,
      phase: "menu",
      isPlayerTurn: true,
      turn: prev.turn + 1,
      attackPattern: null,
    }));
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
  };

  return {
    gameState,
    setGameState,
    takeDamage,
    dealDamageToSans,
    endTurn,
    resetGame,
  };
};
