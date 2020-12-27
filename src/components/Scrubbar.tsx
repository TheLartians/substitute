import React, {
  RefObject,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Cue } from "subtitle";
import { useTheme } from "../hooks/theme";
import { Box } from "../theme/components/box";

const ScrubPosition = ({
  positionRef,
  setPosition,
  max,
}: {
  positionRef: RefObject<number>;
  max: number;
  setPosition: (v: number) => void;
}) => {
  const { palette, elementSizes } = useTheme();
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((positionRef.current ?? 0) / max);
    }, 1000 / 60);
    return () => clearInterval(id);
  });

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

export const Scrubbar = ({
  cues,
  position,
  setPosition,
}: {
  cues: Cue[];
  position: RefObject<number>;
  setPosition: (v: number) => void;
}) => {
  const { colors, elementSizes } = useTheme();
  const maxT = cues[cues.length - 1]?.end ?? 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
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
          const x = (event.clientX - rect.left) / canvas.width;
          setPosition(x*maxT);
        }
      };
      canvas.addEventListener("mousemove", mouseListener);
      return () => canvas.removeEventListener("mousemove", mouseListener);
    }
  }, [draw, setPosition, maxT]);

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
      <ScrubPosition
        positionRef={position}
        setPosition={setPosition}
        max={maxT}
      />
    </Box>
  );
};
