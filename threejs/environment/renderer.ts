import * as THREE from "three";
import { Camera } from "./camera";

THREE.ColorManagement.enabled = false;

const textureLoader = new THREE.TextureLoader();

const camera = new Camera();

let scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight("#ffffff", 2);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.1);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

export const bgColor = { backgroundColor: "#010101" };

renderer.setClearColor(bgColor.backgroundColor);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

export { camera, scene, renderer, textureLoader };
