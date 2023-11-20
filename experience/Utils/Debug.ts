import GUI from "lil-gui";
import type { DebugType } from "~/types/types";

export default class Debug implements DebugType {
  active?: boolean | undefined;
  ui?: GUI;

  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new GUI();
    }
  }
}
