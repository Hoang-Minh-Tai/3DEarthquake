import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gltfLoader } from "../components/loaders";
import { createRoom } from "../components/room";

const Scenario1 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = setupScene(canvasRef);
    return () => {
      // Clean up resources
      cleanup();
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

const setupScene = (canvasRef) => {
  let scene, camera, renderer, controls, clock, world, ball, ballBody;

  const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa3a3a3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-30, 50, 0);
    directionalLight.target.position.set(10, 0, 0);
    scene.add(directionalLight);

    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    const debugRenderer = new CANNON.DebugRenderer(scene, world);

    // Add the debug renderer to the scene
    scene.add(debugRenderer);

    // Clear previous canvas
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.movementSpeed = 8;
    controls.lookSpeed = 0.08;

    camera.position.set(2.6, 1.3, 0);
    camera.lookAt(0, 0, 0);

    //renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const axisHelper = new THREE.AxesHelper(30, 30);
    scene.add(axisHelper);

    const room = createRoom();
    scene.add(room);

    const table = gltfLoader.load("kitchen_table.glb", (gltf) => {
      scene.add(gltf.scene);
    });

    //add objects
    const ballRadius = 0.2;
    const ballGeometry = new THREE.SphereGeometry(ballRadius);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0.7, 1.5, -0.3);
    scene.add(ball);

    // Specify the radius of the ball
    const ballShape = new CANNON.Sphere(ballRadius);
    ballBody = new CANNON.Body({ mass: 10 }); // Set the mass to enable dynamic behavior
    ballBody.addShape(ballShape);
    ballBody.position.set(0.7, 1.5, -0.3);
    world.addBody(ballBody);

    // const size = box.getSize(new THREE.Vector3());
    // const center = box.getCenter(new THREE.Vector3());

    const tableBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      position: new CANNON.Vec3(1, -0.37, 0),
    });
    tableBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    world.addBody(tableBody);

    const tableMaterial = new CANNON.Material();

    const tableBallContactMaterial = new CANNON.ContactMaterial(
      tableMaterial,
      ballMaterial,
      {
        friction: 0, // Adjust friction properties as desired
        restitution: 1, // Adjust restitution (bounciness) properties as desired
      }
    );

    world.addContactMaterial(tableBallContactMaterial);

    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);

    clock = new THREE.Clock();

    // Keyboard event listener
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    renderer.setAnimationLoop(animate);
  };

  const handleKeyDown = (event) => {};

  const animate = () => {
    // Update the physics simulation
    world.step(1 / 60); // Specify the time step

    // Update the positions and orientations of the Three.js objects based on the physics simulation
    ball.position.copy(ballBody.position);
    ball.quaternion.copy(ballBody.quaternion);
    controls.update();
    renderer.render(scene, camera);
  };

  init();

  return () => {
    renderer.dispose();
  };
};

export default Scenario1;
