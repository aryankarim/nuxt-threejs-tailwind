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
}
