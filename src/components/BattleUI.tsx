import React from "react";

interface BattleUIProps {
  gameState: {
    phase: string;
    playerHP: number;
    turn: number;
    isPlayerTurn: boolean;
  };
  onAttack: () => void;
  onMercy: () => void;
}

const BattleUI: React.FC<BattleUIProps> = ({
  gameState,
  onAttack,
  onMercy,
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      {/* Player Stats Bar */}
      <div className="bg-black text-white font-mono text-lg px-8 py-4 border-t-2 border-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-white">CHARA</span>
            <span className="text-white">LV 19</span>
            <div className="flex items-center gap-2">
              <span className="text-white">HP</span>
              <div className="w-32 h-6 bg-black border-2 border-white relative">
                {/* Yellow HP bar background */}
                <div className="absolute inset-0 bg-yellow-400 h-full" />
                {/* Red HP bar (current health) */}
                <div
                  className="absolute inset-0 bg-red-500 h-full transition-all duration-300"
                  style={{ width: `${(gameState.playerHP / 92) * 100}%` }}
                />
              </div>
              <span className="text-white ml-2">{gameState.playerHP} / 92</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white">KR</span>
            <span className="text-white">19</span>
            <span className="text-yellow-400">⚡</span>
            <span className="text-white">92</span>
          </div>
        </div>
      </div>

      {/* Battle Menu */}
      {gameState.phase === "menu" && gameState.isPlayerTurn && (
        <div className="bg-black border-t-2 border-white p-8">
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            <button
              className="bg-black border-4 border-orange-400 text-orange-400 text-xl font-bold py-4 px-6 hover:bg-orange-400 hover:text-black transition-colors font-mono"
              onClick={onAttack}
            >
              ⚔ FIGHT
            </button>
            <button
              className="bg-black border-4 border-orange-400 text-orange-400 text-xl font-bold py-4 px-6 hover:bg-orange-400 hover:text-black transition-colors font-mono opacity-50"
              disabled
            >
              )) ACT
            </button>
            <button
              className="bg-black border-4 border-orange-400 text-orange-400 text-xl font-bold py-4 px-6 hover:bg-orange-400 hover:text-black transition-colors font-mono opacity-50"
              disabled
            >
              🎒 ITEM
            </button>
            <button
              className="bg-black border-4 border-orange-400 text-orange-400 text-xl font-bold py-4 px-6 hover:bg-orange-400 hover:text-black transition-colors font-mono"
              onClick={onMercy}
            >
              ✕ MERCY
            </button>
          </div>
        </div>
      )}

      {/* Battle Box for Dodge Phase */}
      {gameState.phase === "dodge" && (
        <div className="flex justify-center items-center h-96 bg-black">
          <div className="relative">
            {/* Battle box border */}
            <div className="w-80 h-40 border-4 border-white bg-black relative">
              {/* Instructions */}
              <div className="absolute -top-8 left-0 text-white text-sm font-mono">
                * Используй стрелки или WASD для управления
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleUI;
