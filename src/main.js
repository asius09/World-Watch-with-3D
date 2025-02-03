import { EarthScene } from "./utils/earthScene.js";
import { gsap } from "gsap";
import { Features } from "./utils/features.js";
//Initialize the Earth Scene
const earthScene = new EarthScene("#canvas");
earthScene.init();
const DOMFeatures = new Features();
DOMFeatures.init();

function onloadAnimation() {
  const search = document.querySelector("nav");
  gsap.from(search, {
    opacity: 0,
    y: -20,
    scale: 0.8,
    duration: 1,
  });
}
window.addEventListener("DOMContentLoaded", onloadAnimation);
