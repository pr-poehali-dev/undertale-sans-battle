import React, { useEffect, useRef, useState, useCallback } from "react";
import PlayerHeart from "./PlayerHeart";
import SansEnemy from "./SansEnemy";
import BattleUI from "./BattleUI";
import AttackPattern from "./AttackPattern";

interface GameState {
  phase: "intro" | "menu" | "attack" | "dodge" | "gameover";
  playerHP: number;
  sansHP: number;
  turn: number;
  isPlayerTurn: boolean;
  attackPattern: string | null;
}

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    phase: "intro",
    playerHP: 92,
    sansHP: 100000,
    turn: 1,
    isPlayerTurn: true,
    attackPattern: null,
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 320, y: 400 });
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [bones, setBones] = useState<
    Array<{ x: number; y: number; direction: string; id: number }>
  >([]);
  const [showDamage, setShowDamage] = useState(false);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameState.phase === "dodge") {
        updateBones();
        checkCollisions();
      }
    }, 16); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.phase, bones, playerPosition]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key);
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Player movement
  useEffect(() => {
    const movePlayer = () => {
      if (gameState.phase !== "dodge") return;

      setPlayerPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 3;

        if (keys.has("ArrowLeft") || keys.has("a")) newX -= speed;
        if (keys.has("ArrowRight") || keys.has("d")) newX += speed;
        if (keys.has("ArrowUp") || keys.has("w")) newY -= speed;
        if (keys.has("ArrowDown") || keys.has("s")) newY += speed;

        // Boundary checks (battle box: 160x140 centered at 320x400)
        newX = Math.max(240, Math.min(400, newX));
        newY = Math.max(330, Math.min(470, newY));

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(movePlayer, 16);
    return () => clearInterval(interval);
  }, [keys, gameState.phase]);

  const updateBones = () => {
    setBones((prev) =>
      prev
        .map((bone) => ({
          ...bone,
          x: bone.direction === "left" ? bone.x - 4 : bone.x + 4,
          y: bone.direction === "up" ? bone.y - 4 : bone.y + 4,
        }))
        .filter(
          (bone) =>
            bone.x > -50 && bone.x < 690 && bone.y > -50 && bone.y < 550,
        ),
    );
  };

  const checkCollisions = () => {
    bones.forEach((bone) => {
      const distance = Math.sqrt(
        Math.pow(bone.x - playerPosition.x, 2) +
          Math.pow(bone.y - playerPosition.y, 2),
      );

      if (distance < 15) {
        takeDamage(1);
        setBones((prev) => prev.filter((b) => b.id !== bone.id));
      }
    });
  };

  const takeDamage = (damage: number) => {
    setGameState((prev) => ({
      ...prev,
      playerHP: Math.max(0, prev.playerHP - damage),
    }));

    if (gameState.playerHP - damage <= 0) {
      setGameState((prev) => ({ ...prev, phase: "gameover" }));
    }
  };

  const handleAttack = () => {
    setShowDamage(true);
    setGameState((prev) => ({
      ...prev,
      sansHP: prev.sansHP - 160,
      phase: "dodge",
      isPlayerTurn: false,
      attackPattern: "bones",
    }));

    // Start Sans attack
    setTimeout(() => {
      startSansAttack();
    }, 1000);

    setTimeout(() => setShowDamage(false), 1000);
  };

  const startSansAttack = () => {
    const patterns = ["bones", "laser", "gravity"];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];

    if (pattern === "bones") {
      // Generate bone attack
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          setBones((prev) => [
            ...prev,
            {
              x: Math.random() * 640,
              y: -20,
              direction: "down",
              id: Date.now() + i,
            },
          ]);
        }, i * 200);
      }
    }

    // End turn after 3 seconds
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        phase: "menu",
        isPlayerTurn: true,
        turn: prev.turn + 1,
        attackPattern: null,
      }));
      setBones([]);
    }, 3000);
  };

  const handleMercy = () => {
    alert("* Sans не пощадит тебя...");
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
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
