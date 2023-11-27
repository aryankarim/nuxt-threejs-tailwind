import * as THREE from "three";
import type TYPE from "~/types/types";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  experience: TYPE.ExperienceType;
  canvas?: TYPE.CanvasType;
  sizes: TYPE.SizesType;
  scene: TYPE.SceneType;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;

    this.canvas = this.experience.canvas;

    //  set instance
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes?.width / this.sizes?.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
    // set controls

    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes?.width / this.sizes?.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
