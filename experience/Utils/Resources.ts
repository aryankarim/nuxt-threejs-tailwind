import * as THREE from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import type {
  CubeTextureType,
  GltfType,
  Loader,
  ResourcesType,
  Source,
  TextureItem,
  TextureItems,
  TextureType,
} from "~/types/types.js";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter implements ResourcesType {
  sources: Array<Source>;
  loaders: Loader = {};
  toLoad: number;
  loaded: number = 0;
  textures: { [key: string]: TextureItem<TextureType> } = {};
  cubeTextures: { [key: string]: TextureItem<CubeTextureType> } = {};
  gltfTextures: { [key: string]: TextureItem<GltfType> } = {};

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
        this.loaders.gltfLoader?.load(source.path as string, (file: GLTF) => {
          this.sourceLoaded(source.name, file, "gltfTextures");
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader?.load(
          source.path as string,
          (file: THREE.Texture) => {
            this.sourceLoaded(source.name, file, "textures");
          }
        );
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader?.load(
          source.path as string[],
          (file: THREE.Texture) => {
            this.sourceLoaded(source.name, file, "cubeTextures");
          }
        );
      }
    }
  }

  sourceLoaded(
    label: keyof TextureItems<any>,
    file: TextureItem<any>,
    location: keyof ResourcesType
  ) {
    switch (location) {
      case "textures":
        this.textures[label as keyof TextureItems<TextureType>] = file;
        break;
      case "gltfTextures":
        this.gltfTextures[label as keyof TextureItems<GltfType>] = file;
        break;
      case "cubeTextures":
        this.cubeTextures[label as keyof TextureItems<CubeTextureType>] = file;
        break;
    }

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
