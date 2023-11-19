// @ts-nocheck

import * as THREE from "three";

export type WallMeshType = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshPhongMaterial
> & {
  update: () => void;
  cleanup: () => void;
};

export class WallMesh extends THREE.Mesh {
  private texture: THREE.Texture;

  constructor(surface: any, texturePath: string) {
    if (!surface) return;
    const vectorPoints = surface.points.map(
      (point: any) => new THREE.Vector2(point.x / 100, point.y / 100)
    );

    const vectorCuts = surface?.cuts?.map((cut: any) => {
      const angledCutPoints = cut.points.map(
        (point: any) => new THREE.Vector2(point.x / 100, point.y / 100)
      );

      const { x, y } = cut.settings.position;

      angledCutPoints.forEach((point: any) => {
        point.x += x / 100;
        point.y += y / 100;
      });

      const shape = new THREE.Shape(angledCutPoints);

      return shape;
    });

    if (!vectorPoints.length) return;

    const shapeVector = new THREE.Shape(vectorPoints);

    // NOT REMOVE
    shapeVector.holes = vectorCuts;

    const geometry = new THREE.ShapeGeometry(shapeVector);

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      side: 2,
    });

    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    material.map = texture;

    super(geometry, material);

    this.name = "WALL";

    this.userData = {
      surface: surface,
    };

    this.rotation.set(
      surface.settings.rotation3d.x,
      surface.settings.rotation3d.y,
      surface.settings.rotation3d.z
    );

    const { x, y, z } = surface.settings.position3d;

    this.position.set(x, y, z);
  }
}
