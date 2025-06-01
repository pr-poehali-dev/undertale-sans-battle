import React from "react";

interface PlayerHeartProps {
  position: { x: number; y: number };
  visible: boolean;
}

const PlayerHeart: React.FC<PlayerHeartProps> = ({ position, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute w-4 h-4 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        clipPath:
          "polygon(50% 0%, 20% 20%, 20% 80%, 50% 100%, 80% 80%, 80% 20%)",
        filter: "drop-shadow(0 0 4px #ff0000)",
        imageRendering: "pixelated",
      }}
    />
  );
};

export default PlayerHeart;
