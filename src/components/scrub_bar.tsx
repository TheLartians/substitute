import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import { Cue } from "subtitle";
import { useTheme } from "../hooks/theme";
import { useTimer } from "../hooks/timer";
import { Box } from "../theme/components/box";

const ScrubPosition = ({ max }: { max: number }) => {
  const { palette, elementSizes } = useTheme();
  const timer = useTimer();
  const [pos, setPos] = useState(0);

  useEffect(() => {
    return timer.observe((t) => setPos(t / max));
  }, [timer, max]);

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

export const ScrubBar = memo(({ cues }: { cues: Cue[] }) => {
  const { colors, elementSizes } = useTheme();
  const maxT = cues[cues.length - 1]?.end ?? 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timer = useTimer();

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
          timer.set(x * maxT);
        }
      };
      const touchListener = (event: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.touches[0].clientX - rect.left) / canvas.offsetWidth;
        timer.set(Math.min(Math.max(x, 0), 1) * maxT);
      };
      const resizeListener = () => draw(canvas);

      window.addEventListener("resize", resizeListener);
      canvas.addEventListener("mousemove", mouseListener);
      canvas.addEventListener("mousedown", mouseListener);
      canvas.addEventListener("touchmove", touchListener);
      canvas.addEventListener("touchstart", touchListener);
      return () => {
        window.removeEventListener("resize", resizeListener);
        canvas.removeEventListener("mousemove", mouseListener);
        canvas.removeEventListener("mousedown", mouseListener);
        canvas.removeEventListener("touchstart", touchListener);
        canvas.removeEventListener("touchmove", touchListener);
      };
    }
  }, [draw, timer, maxT]);

  return (
    <Box
      borderRadius="m"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        cursor: "pointer",
      }}
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
