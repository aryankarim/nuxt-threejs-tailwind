import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type {
  Loader,
  ResourcesType,
  Source,
  TextureItems,
} from "~/types/types.js";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter implements ResourcesType {
  sources: Array<Source>;
  loaders: Loader = {};
  items: TextureItems = {};
  toLoad: number;
  loaded: number = 0;

  constructor(sources: Array<Source>) {
    super();

    this.sources = sources;
    this.toLoad = this.sources.length;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader?.load(source.path, (file: THREE.Texture) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader?.load(
          source.path as string,
          (file: THREE.Texture) => {
            this.sourceLoaded(source, file);
          }
        );
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader?.load(
          source.path as string[],
          (file: THREE.Texture) => {
            this.sourceLoaded(source, file);
          }
        );
      }
    }
  }

  sourceLoaded(source: Source, file: THREE.Texture) {
    this.items[source.name as keyof TextureItems] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
