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
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-96">
      {/* HP Bar */}
      <div className="bg-black border-2 border-white p-4 mb-4">
        <div className="flex items-center gap-4 text-white font-mono">
          <span>Frisk</span>
          <span>LV 19</span>
          <div className="flex items-center gap-2">
            <span>HP</span>
            <div className="w-24 h-6 bg-red-900 border border-white relative">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${(gameState.playerHP / 92) * 100}%` }}
              />
            </div>
            <span>{gameState.playerHP} / 92</span>
          </div>
        </div>
      </div>

      {/* Battle Menu */}
      {gameState.phase === "menu" && gameState.isPlayerTurn && (
        <div className="bg-black border-2 border-white p-4">
          <div className="grid grid-cols-2 gap-4 text-white font-mono">
            <button
              className="border border-white p-2 hover:bg-white hover:text-black transition-colors"
              onClick={onAttack}
            >
              ⚔️ FIGHT
            </button>
            <button
              className="border border-white p-2 hover:bg-white hover:text-black transition-colors"
              disabled
            >
              🎒 ACT
            </button>
            <button
              className="border border-white p-2 hover:bg-white hover:text-black transition-colors"
              disabled
            >
              📦 ITEM
            </button>
            <button
              className="border border-white p-2 hover:bg-white hover:text-black transition-colors"
              onClick={onMercy}
            >
              💛 MERCY
            </button>
          </div>
        </div>
      )}

      {/* Battle Box */}
      {gameState.phase === "dodge" && (
        <div className="mx-auto w-80 h-36 border-4 border-white bg-black relative">
          <div className="absolute -top-6 left-0 text-white text-sm font-mono">
            * Используй стрелки для управления
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleUI;
