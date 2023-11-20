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

interface TimeType extends EventEmitterType {
  start: number;
  current: number;
  elapsed: number;
  delta: number;
  tick: () => void;
}

interface ResourcesType extends EventEmitter {
  sources: Array<Source>;
  loaders: Loader;
  items: Object;
  toLoad: number;
  loaded: number = 0;
}

interface Loader {
  gltfLoader?: any;
  textureLoader?: THREE.TextureLoader;
  cubeTextureLoader?: THREE.CubeTextureLoader;
}

interface TextureItems {
  [key: string]: THREE.Texture;
}

interface Source {
  name: string;
  type: string;
  path: string | string[];
}

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
  trigger: (_name: string, _args?: any) => EventEmitterType | Object | null;
}
