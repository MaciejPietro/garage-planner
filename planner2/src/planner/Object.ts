import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default function importObj(basePath = "") {
  return new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();

    mtlLoader.load(basePath + ".mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        basePath + ".obj",
        (obj) => {
          console.log("xd", obj);

          // Set the scale of the loaded object
          obj.scale.set(0.005, 0.005, 0.005);

          resolve(obj);
        },
        undefined,
        reject
      );
    });
  });
}
