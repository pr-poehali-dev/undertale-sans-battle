import React from "react";

interface AttackPatternProps {
  bones: Array<{ x: number; y: number; direction: string; id: number }>;
  pattern: string | null;
}

const AttackPattern: React.FC<AttackPatternProps> = ({ bones, pattern }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Render Bones */}
      {bones.map((bone) => (
        <div
          key={bone.id}
          className="absolute w-4 h-8 bg-white border border-gray-300"
          style={{
            left: bone.x - 2,
            top: bone.y - 4,
            imageRendering: "pixelated",
            boxShadow: "0 0 4px rgba(255,255,255,0.5)",
          }}
        />
      ))}

      {/* Gaster Blaster Effect */}
      {pattern === "laser" && (
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full animate-pulse">
          💀
        </div>
      )}
    </div>
  );
};

export default AttackPattern;
