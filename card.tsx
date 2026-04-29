import React from “react”;
import { motion } from “framer-motion”;

export type Dir = “up” | “down” | “left” | “right”;

export type CardVM = {
id: string;
title: string;
imageUrl?: string;
phrase?: string;
meaning?: string;
isGo?: boolean;
goSpread?: { dx: number; dy: number; clarifier?: boolean }[];
};

type CardProps = {
card: CardVM;
cardBack: string;
faceDown: boolean;
size: number;
zIndex: number;
onReveal?: () => void;
onAddDir?: (dir: Dir) => void;
onClarifier?: () => void;
onNodal?: () => void;
onClick?: () => void;
isClarifier?: boolean;
};

const BR = 16;

export default function Card({
card,
cardBack,
faceDown,
size,
zIndex,
onReveal,
onAddDir,
onClarifier,
onNodal,
onClick,
isClarifier = false,
}: CardProps) {
return (
<motion.div
style={{
width: size,
height: size,
position: “relative”,
zIndex,
borderRadius: BR,
perspective: “1000px”,
cursor: isClarifier ? “pointer” : “default”,
boxShadow: card.isGo ? undefined : “none”,
}}
animate={
card.isGo
? {
boxShadow: [
“0 0 8px 2px rgba(0,150,255,0.3)”,
“0 0 18px 6px rgba(0,150,255,0.7)”,
“0 0 8px 2px rgba(0,150,255,0.3)”,
],
}
: {}
}
transition={card.isGo ? { duration: 3, repeat: Infinity } : {}}
whileHover={{
scale: 1.05,
zIndex: 999,
boxShadow: “0 8px 20px rgba(0,0,0,0.5)”,
}}
onClick={isClarifier ? onClarifier : onClick}
>
{/* Card inner — flip container */}
<div
style={{
width: “100%”,
height: “100%”,
position: “relative”,
transformStyle: “preserve-3d”,
transition: “transform 0.6s”,
transform: faceDown ? “rotateY(0deg)” : “rotateY(180deg)”,
}}
>
{/* BACK */}
<div
onClick={faceDown ? onReveal : undefined}
style={{
position: “absolute”,
inset: 0,
backfaceVisibility: “hidden”,
WebkitBackfaceVisibility: “hidden”,
borderRadius: BR,
overflow: “hidden”,
transform: “rotateY(0deg)”,
cursor: faceDown ? “pointer” : “default”,
}}
>
<img
src={cardBack}
alt=“Card back”
style={{ width: “100%”, height: “100%”, objectFit: “cover”, display: “block” }}
/>
</div>

```
    {/* FRONT */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius: BR,
        overflow: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* ✦ Clarifier button */}
      {!isClarifier && (
        <button
          onClick={(e) => { e.stopPropagation(); onClarifier?.(); }}
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "rgba(255,255,255,0.85)",
            borderRadius: "50%",
            width: 28,
            height: 28,
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            lineHeight: "28px",
            textAlign: "center",
            padding: 0,
            zIndex: 1000,
          }}
        >
          ✦
        </button>
      )}

      {/* Directional paddles — visible on hover via parent */}
      {!isClarifier && (
        <>
          {(["up", "down", "left", "right"] as Dir[]).map((dir) => {
            const isVertical = dir === "up" || dir === "down";
            return (
              <button
                key={dir}
                onClick={(e) => { e.stopPropagation(); onAddDir?.(dir); }}
                style={{
                  position: "absolute",
                  ...(dir === "up"    && { top: 2,    left: "50%", transform: "translateX(-50%)", width: "40%", height: 12 }),
                  ...(dir === "down"  && { bottom: 2, left: "50%", transform: "translateX(-50%)", width: "40%", height: 12 }),
                  ...(dir === "left"  && { top: "50%", left: 2,   transform: "translateY(-50%)", width: 12, height: "40%" }),
                  ...(dir === "right" && { top: "50%", right: 2,  transform: "translateY(-50%)", width: 12, height: "40%" }),
                  background: "rgba(255,255,255,0.25)",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              />
            );
          })}

          {/* Nodal — invisible center hit area */}
          <button
            onClick={(e) => { e.stopPropagation(); onNodal?.(); }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "60%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 999,
            }}
          />
        </>
      )}
    </div>
  </div>
</motion.div>
```

);
}
