import React from "react";

interface PlayerHeartProps {
  position: { x: number; y: number };
  visible: boolean;
}

const PlayerHeart: React.FC<PlayerHeartProps> = ({ position, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        imageRendering: "pixelated",
      }}
    >
      {/* Pixel perfect heart shape */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="6" y="2" width="4" height="12" fill="#FF0000" />
        <rect x="4" y="4" width="2" height="8" fill="#FF0000" />
        <rect x="10" y="4" width="2" height="8" fill="#FF0000" />
        <rect x="2" y="6" width="2" height="4" fill="#FF0000" />
        <rect x="12" y="6" width="2" height="4" fill="#FF0000" />
        <rect x="8" y="14" width="0" height="0" fill="#FF0000" />

        {/* Heart glow effect */}
        <rect x="6" y="2" width="4" height="12" fill="#FF4444" opacity="0.6" />
      </svg>
    </div>
  );
};

export default PlayerHeart;
