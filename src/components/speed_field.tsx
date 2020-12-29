import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Monospace } from "../theme/components/text";
import { useTimer } from "../hooks/timer";
import { Input } from "../theme/components/input";
import { useTheme } from "../hooks/theme";

export const SpeedField = ({ speed }: { speed: number }) => {
  const timer = useTimer();
  const [editable, setEditable] = useState(false);
  const [speedStr, setSpeedStr] = useState("");
  const [prevSpeed, setPrevSpeed] = useState(speed);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prevSpeed !== speed) {
      setPrevSpeed(speed);
      setEditable(false);
    }
  }, [prevSpeed, speed]);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.width = `${input.scrollWidth}px`;
      const eventListener = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          const v = Number.parseFloat(speedStr);
          if (isFinite(v)) {
            timer.set(timer.t, v);
          }
          setEditable(false);
        }
      };
      input.addEventListener("keyup", eventListener);
      return () => input.removeEventListener("keyup", eventListener);
    }
  }, [speedStr, timer]);

  if (editable) {
    return (
      <Input
        ref={inputRef}
        style={{ fontFamily: "monospace", width: 3 * theme.fontSizes.m }}
        onChange={(event: FormEvent<HTMLInputElement>) => {
          setSpeedStr(event.currentTarget.value);
        }}
        value={speedStr}
      />
    );
  } else {
    return (
      <Monospace
        onClick={() => {
          setEditable(true);
          setSpeedStr(speed.toPrecision(4));
        }}
      >
        {speed.toPrecision(4)}
      </Monospace>
    );
  }
};
