import * as THREE from "three";

export class Lens {
  camera: THREE.PerspectiveCamera;
  speed = 0.05;
  direction = "s";
  fov = 75;
  aspect = 2;
  near = 0.005;
  far = 100;
  position = { x: 0, y: 0, z: 10 };
  size = { width: window.innerWidth, height: window.innerHeight };

  constructor() {
    const camera = new THREE.PerspectiveCamera(
      this.fov,
      this.size.width / this.size.height,
      this.near,
      this.far
    );
    camera.position.set(this.position.x, this.position.y, this.position.z);

    this.camera = camera;
  }
}
