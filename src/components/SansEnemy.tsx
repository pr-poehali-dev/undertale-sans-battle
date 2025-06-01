import React from "react";

interface SansEnemyProps {
  phase: string;
  showDamage: boolean;
}

const SansEnemy: React.FC<SansEnemyProps> = ({ phase, showDamage }) => {
  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
      {/* Sans Sprite */}
      <div className="relative">
        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center text-6xl select-none">
          💀
        </div>

        {/* Damage Number */}
        {showDamage && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl font-bold animate-fade-in">
            160
          </div>
        )}

        {/* Sans Eyes */}
        <div className="absolute top-6 left-6 w-3 h-6 bg-black rounded-full" />
        <div className="absolute top-6 right-6 w-3 h-6 bg-black rounded-full" />

        {/* Glowing Eye Effect */}
        {phase === "dodge" && (
          <div className="absolute top-6 left-6 w-3 h-6 bg-blue-400 rounded-full animate-pulse" />
        )}
      </div>

      {/* Dialog Box */}
      <div className="mt-4 bg-black border-2 border-white p-4 max-w-md">
        <div className="text-white text-sm font-mono">
          {phase === "intro" && "* это прекрасный день на улице."}
          {phase === "menu" && "* Sans смотрит на тебя."}
          {phase === "attack" && "* Sans уклоняется!"}
          {phase === "dodge" && "* Уклоняйся от костей!"}
        </div>
      </div>
    </div>
  );
};

export default SansEnemy;
