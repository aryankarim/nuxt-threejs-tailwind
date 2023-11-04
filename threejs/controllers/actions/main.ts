import { orbitControls } from "../listeners/orbitControl";
import { checkForResize } from "../listeners/window";

export const actions = () => {
  checkForResize();
  orbitControls.update();
};
