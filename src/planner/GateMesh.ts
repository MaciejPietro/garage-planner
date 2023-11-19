// @ts-nocheck

import * as THREE from "three";
import { Vector3 } from "three";

import { COLORS } from "./constants";

import { applyAngle, degToRad } from "./helpers";

export type GateMeshType = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshPhongMaterial
> & {
  update: () => void;
  cleanup: () => void;
};

export class GateMesh extends THREE.Mesh {
  private texture: THREE.Texture;

  constructor(surface: any, settings: any) {
    if (!surface) return;
    const angle = 0.01;

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

    // geometry.rotateX(degToRad(90 + (angle || 1)));

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      side: THREE.DoubleSide,
    });

    const texture = new THREE.TextureLoader().load(settings.type.path);
    // texture.repeat.set(0.6, 0.6);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.rotation = Math.PI * 0.5;
    material.map = texture;

    super(geometry, material);

    this.name = "GATE";

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
