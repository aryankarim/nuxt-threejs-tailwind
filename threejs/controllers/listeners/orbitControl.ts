// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, renderer } from "../../environment/renderer";

export const orbitControls = new OrbitControls(camera.camera, renderer.domElement);
