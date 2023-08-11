export class InputController {
  constructor() {
    this.init();
  }

  init() {
    this.current = {
      leftButton: false,
      rightButton: false,
      mouseX: 0,
      mouseY: 0,
      mouseXDelta: 0,
      mouseYDelta: 0,
    };

    this.previous = null;
    this.key = [];
    this.previousKey = [];

    document.addEventListener("mousedown", (e) => this.mouseDown(e), false);
    document.addEventListener("mouseup", (e) => this.mouseUp(e), false);
    document.addEventListener("mousemove", (e) => this.mouseMove(e), false);
    document.addEventListener("keydown", (e) => this.onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this.onKeyUp(e), false);
  }

  mouseDown(e) {
    console.log("delta X:", this.current.mouseXDelta);
    switch (e.button) {
      case 0:
        this.current.leftButton = true;
        break;
      case 2:
        this.current.rightButton = true;
        break;
    }
  }
  mouseUp(e) {
    switch (e.button) {
      case 0:
        this.current.leftButton = false;
        break;
      case 2:
        this.current.rightButton = false;
        break;
    }
  }
  mouseMove(e) {
    this.current.mouseX = e.pageX - window.innerWidth / 2;
    this.current.mouseY = e.pageY - window.innerHeight / 2;

    if (this.previous === null) {
      this.previous = { ...this.current };
    }

    this.current.mouseXDelta = e.movementX;
    this.current.mouseYDelta = e.movementY;
  }
  onKeyDown(e) {
    this.key[e.keyCode] = true;
  }
  onKeyUp(e) {
    this.key[e.keyCode] = false;
  }

  update() {
    this.previous = { ...this.current };
  }
}
