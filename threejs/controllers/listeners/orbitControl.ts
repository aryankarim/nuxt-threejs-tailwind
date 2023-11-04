// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { lens, renderer } from "../../environment/renderer";

export const orbitControls = new OrbitControls(
  lens.camera,
  renderer.domElement
);
