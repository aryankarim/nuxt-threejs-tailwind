import type GUI from "lil-gui";

/**
 *
 * Experience
 *
 */

interface ExperienceType {
  _canvas?: HTMLCanvasElement;
  debug: DebugType;
  sizes: SizesType;
  time: TimeType;
  scene;
  resources;
  camera;
  renderer;
  world;
}

/**
 *
 * UTILS
 *
 */

interface DebugType {
  active?: boolean;
  ui?: GUI;
}

interface SizesType extends EventEmitterType {
  width: number;
  height: number;
  pixelRatio: number;
}

interface TimeType extends EventEmitterType {}

/**
 *
 * Event Emitter
 *
 */

interface NewName {
  original?: string;
  value?: string;
  namespace?: string;
}

interface CallBacks {
  base?: Object<any>;
  [key: string]: Object<any>;
}

interface EventEmitterType {
  callbacks: CallBacks;
  on(names: string, callback: () => void): EventEmitterType | boolean;
  off(names: string): EventEmitterType | boolean;
}
