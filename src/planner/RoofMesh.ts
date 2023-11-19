// @ts-nocheck

import * as THREE from "three";

export class RoofMesh extends THREE.Mesh {
  constructor(surface: any) {
    if (!surface) return;

    const box = new THREE.Box3();
    const vectorPoints = surface.points.map(
      (point: any) => new THREE.Vector3(point.x / 100, point.y / 100, 0)
    );
    box.setFromPoints(vectorPoints);

    const geometry = new THREE.BoxGeometry(
      box.max.x - box.min.x,
      box.max.y - box.min.y,
      0.05
    );

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      side: THREE.DoubleSide,
    });

    const texture = new THREE.TextureLoader().load(
      "/assets/textures/painted.jpg"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI * 0.5;
    texture.repeat.set(4, 4);
    material.map = texture;

    super(geometry, material);

    this.name = "ROOF";

    // Adjust position to set pivot to left bottom
    this.position.x -= (box.max.x - box.min.x) / 2;
    this.position.y -= (box.max.y - box.min.y) / 2;

    this.rotation.set(
      surface.settings.rotation3d.x,
      surface.settings.rotation3d.y,
      surface.settings.rotation3d.z
    );

    const { x, y, z } = surface.settings.position3d;

    this.position.set(x, y, z);
  }
}
