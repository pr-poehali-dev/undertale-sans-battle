import React, { useRef, useState } from "react";
import PlayerHeart from "./PlayerHeart";
import SansEnemy from "./SansEnemy";
import BattleUI from "./BattleUI";
import AttackPattern from "./AttackPattern";
import { useGameState } from "@/hooks/useGameState";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { usePlayerMovement } from "@/hooks/usePlayerMovement";
import { useBoneSystem } from "@/hooks/useBoneSystem";
import { GAME_CONSTANTS } from "@/utils/gameConstants";

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showDamage, setShowDamage] = useState(false);

  // Game state management
  const { gameState, takeDamage, dealDamageToSans, endTurn } = useGameState();

  // Input and movement
  const keys = useKeyboardControls();
  const playerPosition = usePlayerMovement(keys, gameState.phase === "dodge");

  // Bone system
  const { bones, spawnBones, clearBones } = useBoneSystem(
    gameState.phase === "dodge",
    playerPosition,
    () => takeDamage(GAME_CONSTANTS.BONE_DAMAGE),
  );

  const handleAttack = () => {
    setShowDamage(true);
    dealDamageToSans(GAME_CONSTANTS.ATTACK_DAMAGE);

    // Start Sans attack
    setTimeout(() => {
      startSansAttack();
    }, GAME_CONSTANTS.TIMING.ATTACK_DELAY);

    setTimeout(
      () => setShowDamage(false),
      GAME_CONSTANTS.TIMING.DAMAGE_DISPLAY,
    );
  };

  const startSansAttack = () => {
    const pattern =
      GAME_CONSTANTS.ATTACK_PATTERNS[
        Math.floor(Math.random() * GAME_CONSTANTS.ATTACK_PATTERNS.length)
      ];

    if (pattern === "bones") {
      spawnBones();
    }

    // End turn after duration
    setTimeout(() => {
      endTurn();
      clearBones();
    }, GAME_CONSTANTS.TIMING.TURN_DURATION);
  };

  const handleMercy = () => {
    alert("* Sans не пощадит тебя...");
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={GAME_CONSTANTS.CANVAS.WIDTH}
        height={GAME_CONSTANTS.CANVAS.HEIGHT}
        className="border-2 border-white"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Game UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <PlayerHeart
          position={playerPosition}
          visible={gameState.phase === "dodge"}
        />

        <SansEnemy phase={gameState.phase} showDamage={showDamage} />

        <BattleUI
          gameState={gameState}
          onAttack={handleAttack}
          onMercy={handleMercy}
        />

        <AttackPattern bones={bones} pattern={gameState.attackPattern} />
      </div>

      {/* Game Over Screen */}
      {gameState.phase === "gameover" && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">☠️</div>
            <div className="text-2xl mb-2">YOU DIED</div>
            <div className="text-lg">Stay determined...</div>
            <button
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
