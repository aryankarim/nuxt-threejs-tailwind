import * as THREE from "three";
import Experience from "../Experience";
import type {
  DebugFolder,
  DebugType,
  ExperienceType,
  FoxType,
  GltfType,
  ResourcesType,
  SceneType,
  TextureItem,
  TimeType,
} from "~/types/types";

export default class Fox implements FoxType {
  experience: ExperienceType;
  scene: SceneType;
  resources: ResourcesType;
  time: TimeType;
  debug: DebugType;
  debugFolder!: DebugFolder;
  resource: TextureItem<GltfType>;
  model!: THREE.Object3D;
  animation: {
    mixer: THREE.AnimationMixer | undefined;
    actions: { [key: string]: THREE.AnimationAction };
    play: (name: string) => void;
  } = { mixer: undefined, actions: {}, play: Function };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

    // Resource
    this.resource = this.resources.gltfTextures.foxModel;

    this.setModel();
    this.setAnimation();
    this.setListeners();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Actions
    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Play the action
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1, false);

      this.animation.actions.current = newAction;
    };

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.playIdle();
        },
        playWalking: () => {
          this.playWalking();
        },
        playRunning: () => {
          this.playRunning();
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  setListeners() {
    document.onkeydown = (e: KeyboardEvent) => {
      e = e || window.event;
      if (e.key == "ArrowUp") this.playRunning();
      if (e.key == "ArrowDown") this.playIdle();
    };
  }

  update() {
    this.animation.mixer?.update(this.time.delta * 0.001);
  }

  playIdle() {
    this.animation.play("idle");
  }

  playWalking() {
    this.animation.play("walking");
  }

  playRunning() {
    this.animation.play("running");
  }
}
