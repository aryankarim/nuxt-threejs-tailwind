import type {
  EnvironmentType,
  FloorType,
  FoxType,
  ResourcesType,
  SceneType,
} from "~/types/types";
import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  experience = new Experience();
  scene: SceneType;
  resources: ResourcesType;
  floor: FloorType | undefined;
  fox: FoxType | undefined;
  environment: EnvironmentType | undefined;

  constructor() {
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox?.update();
  }
}
