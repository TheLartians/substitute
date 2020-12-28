import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import { Cue } from "subtitle";
import { useTheme } from "../hooks/theme";
import { usePlayer } from "../hooks/player";
import { Box } from "../theme/components/box";

const ScrubPosition = ({ max }: { max: number }) => {
  const { palette, elementSizes } = useTheme();
  const player = usePlayer();
  const [pos, setPos] = useState(0);

  useEffect(() => {
    return player.observe((t) => setPos(t / max));
  }, [player, max]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos * 100}%`,
        top: 0,
        height: "100%",
        width: elementSizes.scrubCursor,
        backgroundColor: palette.red,
      }}
    />
  );
};

export const Scrubbar = memo(({ cues }: { cues: Cue[] }) => {
  const { colors, elementSizes } = useTheme();
  const maxT = cues[cues.length - 1]?.end ?? 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = usePlayer();

  const draw = useCallback(
    (canvas: HTMLCanvasElement) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = canvas.width / maxT;
        ctx.fillStyle = colors.foreground;
        for (const c of cues) {
          ctx.fillRect(
            c.start * scale,
            0,
            (c.end - c.start) * scale,
            canvas.height
          );
        }
      }
    },
    [cues, colors, maxT]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      draw(canvas);
      const mouseListener = (event: MouseEvent) => {
        if (event.buttons === 1) {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left) / canvas.offsetWidth;
          player.set(x * maxT);
        }
      };
      canvas.addEventListener("mousemove", mouseListener);
      canvas.addEventListener("mousedown", mouseListener);
      return () => {
        canvas.removeEventListener("mousemove", mouseListener);
        canvas.removeEventListener("mousedown", mouseListener);
      };
    }
  }, [draw, player, maxT]);

  return (
    <Box
      borderRadius="m"
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      <canvas
        height={elementSizes.scrubbar}
        style={{ display: "block" }}
        ref={canvasRef}
      />
      <ScrubPosition max={maxT} />
    </Box>
  );
});
