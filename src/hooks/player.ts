import { createContext, useContext } from "react";
import { requestAnimationInterval } from "./animationInterval";

type Observer = (t: number) => void;

class Player {
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

  public pause() {
    this.stopCallback?.();
    this.stopCallback = undefined;
    this.running = false;
    this.t0 = this.t;
  }

  public set(t: number, v = this.v) {
    this.t = t;
    this.v = v;
    if (this.running) {
      this.pause();
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

const PlayerContext = createContext(new Player());

export const PlayerProvider = PlayerContext.Provider;
export const usePlayer = () => useContext(PlayerContext);
