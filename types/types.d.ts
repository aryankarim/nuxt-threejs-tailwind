import type GUI from "lil-gui";

interface ExperienceType {
  _canvas?: HTMLCanvasElement;
  debug?: DebugType;
  sizes;
  time;
  scene;
  resources;
  camera;
  renderer;
  world;
}

interface DebugType {
  active?: boolean;
  ui?: GUI;
}

interface SizesType {}

interface CallBacks {
  base?: Object;
}

interface NewName {
  original?: string;
  value: string;
  namespace?: string;
}

interface EventEmitterType {
  callbacks: CallBacks;
}
