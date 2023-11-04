import { scene, lens, renderer } from "./environment/renderer";
import "./environment/paint";
import { actions } from "./controllers/actions/main";
import "./controllers/tuners";

const render = function () {
  actions();
  renderer.render(scene, lens.camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);
