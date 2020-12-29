import { createContext, useContext } from "react";
import { requestAnimationInterval } from "./animation_interval";

type Observer = (t: number) => void;

export class Timer {
  public t: number;
  public running = false;

  private stopCallback?: () => void;
  private observers = new Set<Observer>();

  constructor(public t0 = 0, public v = 1) {
    this.t = t0;
  }

  broadcast() {
    const t = this.t;
    this.observers.forEach((observer) => observer(t));
  }

  public start() {
    if (!this.running) {
      this.running = true;
      const tStart = Date.now();
      this.stopCallback = requestAnimationInterval(() => {
        this.t = (Date.now() - tStart) * this.v + this.t0;
        this.broadcast();
      });
    }
  }

  public pause(broadcast = true) {
    this.stopCallback?.();
    this.stopCallback = undefined;
    this.running = false;
    this.t0 = this.t;
    if (broadcast) {
      this.broadcast();
    }
  }

  public set(t: number, v = this.v) {
    this.t = t;
    this.v = v;
    if (this.running) {
      this.pause(false);
      this.start();
    } else {
      this.t0 = t;
      this.broadcast();
    }
  }

  public observe(observer: Observer) {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }
}

const TimerContext = createContext(new Timer());

export const TimerProvider = TimerContext.Provider;
export const useTimer = () => useContext(TimerContext);
