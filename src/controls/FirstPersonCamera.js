import * as THREE from "three";
import { clamp } from "three/src/math/MathUtils";
import { InputController } from "./InputController";

export class FirstPersonCamera {
  constructor(camera) {
    this.camera = camera;
    this.input = new InputController();
    this.rotation = 0;
    this.translation = new THREE.Vector3();
    this.speed = 0.5;
  }

  update(timeElapsed) {
    this.updateRotation(timeElapsed);
    this.updateCamera(timeElapsed);
    this.input.update();
  }

  updateCamera() {
    this.camera.rotation.y += this.rotation;
  }

  updateRotation(timeElapsed) {
    const xh = this.input.current.mouseXDelta / window.innerWidth;
    const yh = this.input.current.mouseYDelta / window.innerHeight;

    this.rotation = -xh * this.speed;
  }
}
