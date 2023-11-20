import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  start: number = Date.now();
  current: number;
  elapsed: number = 0;
  delta: number = 16;

  constructor() {
    super();

    // Setup
    this.current = this.start;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
