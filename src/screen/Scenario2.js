import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { textureLoader } from "../components/loaders";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

const Scenario2 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = setupScene(canvasRef);
    return () => {
      // Clean up resources
      cleanup();
    };
  }, []);

  const setupScene = (canvasRef) => {
    let scene, camera, renderer, controls;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa3a3a3);

    scene.background = textureLoader.load("universe.jpg");

    // Clear previous canvas
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(renderer.domElement);
    camera.position.set(0, 20, -30);
    camera.lookAt(scene.position);

    controls = new PointerLockControls(camera, renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(2, 3, 4);
    scene.add(light);

    // const axisHelper = new THREE.AxesHelper(30, 30);
    // scene.add(axisHelper);

    // const gridHelper = new THREE.GridHelper(30, 30);
    // scene.add(gridHelper);

    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    const sphereGeo = new THREE.SphereGeometry(2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.81, 0),
    });

    const groundBody = new CANNON.Body({
      shape: new CANNON.Plane(),
      type: CANNON.Body.STATIC,
    });
    world.addBody(groundBody);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    const boxBody = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    });
    world.addBody(boxBody);

    const sphereBody = new CANNON.Body({
      mass: 10,
      shape: new CANNON.Sphere(2),
      position: new CANNON.Vec3(1, 10, 0),
    });
    world.addBody(sphereBody);

    const timeStep = 1 / 60;

    window.addEventListener("resize", handleWindowResize);
    animate();

    function animate() {
      world.step(timeStep);
      groundMesh.position.copy(groundBody.position);
      groundMesh.quaternion.copy(groundBody.quaternion);

      boxMesh.position.copy(boxBody.position);
      boxMesh.quaternion.copy(boxBody.quaternion);

      sphereMesh.position.copy(sphereBody.position);
      sphereMesh.quaternion.copy(sphereBody.quaternion);

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return () => {
      renderer.dispose();
    };
  };

  return <div ref={canvasRef}></div>;
};

export default Scenario2;
