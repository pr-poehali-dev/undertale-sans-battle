import React from "react";

interface SansEnemyProps {
  phase: string;
  showDamage: boolean;
}

const SansEnemy: React.FC<SansEnemyProps> = ({ phase, showDamage }) => {
  const sansSprite = `
    data:image/svg+xml,${encodeURIComponent(`
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <!-- Sans body (blue hoodie) -->
      <rect x="32" y="64" width="64" height="48" fill="#4169E1"/>
      <rect x="24" y="72" width="80" height="32" fill="#4169E1"/>
      
      <!-- Sans head (white skull) -->
      <rect x="40" y="16" width="48" height="48" fill="white"/>
      <rect x="36" y="20" width="56" height="40" fill="white"/>
      
      <!-- Eye sockets -->
      <rect x="44" y="28" width="8" height="16" fill="black"/>
      <rect x="76" y="28" width="8" height="16" fill="black"/>
      
      <!-- Mouth -->
      <rect x="44" y="48" width="40" height="4" fill="black"/>
      
      <!-- Arms -->
      <rect x="16" y="72" width="16" height="24" fill="#4169E1"/>
      <rect x="96" y="72" width="16" height="24" fill="#4169E1"/>
      
      <!-- Legs -->
      <rect x="40" y="112" width="16" height="16" fill="black"/>
      <rect x="72" y="112" width="16" height="16" fill="black"/>
      
      <!-- Shoes -->
      <rect x="36" y="124" width="24" height="4" fill="brown"/>
      <rect x="68" y="124" width="24" height="4" fill="brown"/>
    </svg>
    `)}
  `;

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
      {/* Sans Sprite */}
      <div className="relative flex justify-center">
        <div
          className="w-32 h-32 bg-contain bg-no-repeat bg-center select-none"
          style={{
            backgroundImage: `url("${sansSprite}")`,
            imageRendering: "pixelated",
            filter: phase === "dodge" ? "drop-shadow(0 0 8px #00BFFF)" : "none",
          }}
        />

        {/* Glowing blue eye effect during dodge phase */}
        {phase === "dodge" && (
          <div
            className="absolute top-7 left-11 w-2 h-4 bg-cyan-400 animate-pulse"
            style={{ imageRendering: "pixelated" }}
          />
        )}

        {/* Damage Number */}
        {showDamage && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-3xl font-bold animate-bounce font-mono">
            160
          </div>
        )}
      </div>

      {/* Dialog Box */}
      <div className="mt-8 bg-black border-4 border-white p-6 max-w-md mx-auto">
        <div className="text-white text-lg font-mono leading-relaxed">
          {phase === "intro" && "* это прекрасный день на улице."}
          {phase === "menu" && "* Sans смотрит на тебя лениво."}
          {phase === "attack" && "* Sans легко уклоняется!"}
          {phase === "dodge" && "* Sans использует свою магию костей!"}
          {phase === "gameover" &&
            "* heh. that's what you get for being a bad person."}
        </div>
      </div>
    </div>
  );
};

export default SansEnemy;
