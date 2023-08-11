import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const textureLoader = new THREE.TextureLoader();
textureLoader.setPath("assets/textures/");

export const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/meshes/");
