import type GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 *
 * Experience
 *
 */

type SceneType = THREE.Scene;
type TextureType = THREE.Texture;
type GltfType = GLTF;
type CubeTextureType = THREE.CubeTexture;
type TextureItem<T> = T;
type CanvasType = HTMLCanvasElement;
type DebugFolder = GUI;

interface ExperienceType {
  canvas?: CanvasType;
  debug: DebugType;
  sizes: SizesType;
  time: TimeType;
  scene: SceneType;
  resources: ResourcesType;
  camera: CameraType;
  renderer: RendererType;
  world: WorldType;
  resize: () => void;
  update: () => void;
  destroy: () => void;
}

interface CameraType {
  experience?: ExperienceType;
  sizes?: SizesType;
  scene?: SceneType;
  canvas?: CanvasType;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;
  resize: () => void;
  update: () => void;
}

interface RendererType {
  experience: ExperienceType;
  canvas?: CanvasType;
  sizes: SizesType;
  scene: SceneType;
  camera: CameraType;
  instance: THREE.WebGLRender;
  resize: () => void;
  update: () => void;
}

/**
 *
 * WORLD
 *
 */

interface WorldType {
  experience: ExperienceType;
  scene: SceneType;
  resources: ResourcesType;
  floor: FloorType | undefined;
  fox: FoxType | undefined;
  environment: EnvironmentType | undefined;
  update: () => void;
}

interface FloorType {
  experience: ExperienceType;
  scene: SceneType;
  resources: ResourcesType;
  geometry: THREE.CircleGeometry;
  textures: Textures;
  material: THREE.Material;
  mesh: THREE.Mesh;
}

interface FoxType {
  experience: ExperienceType;
  scene: SceneType;
  resources: ResourcesType;
  time: TimeType;
  debug: DebugType;
  debugFolder?: GUI;
  resource: GltfType;
  model: THREE.Object3D;
  setModel: () => void;
  update: () => void;
}

interface EnvironmentType {
  experience: ExperienceType;
  scene: SceneType;
  resources: ResourcesType;
  debug: DebugType;
  debugFolder: any;
  sunLight: THREE.DirectionalLight;
  environmentMap: EnvironmentMapType;
}

interface EnvironmentMapType {
  intensity: number;
  texture: TextureType | null;
  updateMaterials?: () => void;
}

/**
 *
 * UTILS
 *
 */

interface DebugType {
  active: boolean;
  ui: GUI;
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

interface ResourcesType extends EventEmitterType {
  sources: Array<Source>;
  loaders: Loader;
  toLoad: number;
  loaded: number = 0;
  textures: { [key: string]: TextureType };
  cubeTextures: { [key: string]: CubeTextureType };
  gltfTextures: { [key: string]: GltfType };
}

interface Loader {
  gltfLoader?: GLTFLoader;
  textureLoader?: THREE.TextureLoader;
  cubeTextureLoader?: THREE.CubeTextureLoader;
}

interface TextureItems<T> {
  [key: string]: TextureItem<T>;
}

interface Source {
  name: string;
  type: string;
  path: string | string[];
}

interface Textures {
  color?: THREE.Texture;
  normal?: THREE.Texture;
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
