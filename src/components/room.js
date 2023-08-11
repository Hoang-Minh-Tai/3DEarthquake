import * as THREE from "three";
import { gltfLoader, textureLoader } from "./loaders";

export const createRoom = () => {
  const room = new THREE.Group();

  console.log(gltfLoader.path); // this show "src/assets/meshes"
  // Textures
  const wallTexture = textureLoader.load("wall_texture.jpg");
  const wallGeo = gltfLoader.load(
    "wall.glb",
    (gltf) => {
      const model = gltf.scene;
      room.add(model);
      // const mesh = model.getObjectByName("wall");
      // if (mesh) {
      //   // const material = new THREE.MeshBasicMaterial({ map: wallTexture });
      //   // mesh.material = material;
      //   mesh.side = THREE.DoubleSide;
      // }
    },
    undefined,
    (err) => {
      console.log(err);
    }
  );

  // Materials

  return room;
};




const array = [1,3,2,1,5];
array.sort();