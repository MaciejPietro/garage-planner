// @ts-nocheck

import * as THREE from "three";
import { Vector3 } from "three";

import { COLORS } from "./constants";

import { applyAngle, degToRad } from "./helpers";

function getVector2(point: any, angle: number | null) {
  // TODO replace any if applyAngle will be places in ts file
  const angledPoint = applyAngle(angle, point) as any;

  return new THREE.Vector2(angledPoint.x / 100, angledPoint.y / 100);
}

export type WallMeshBackType = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshPhongMaterial
> & {
  update: () => void;
  cleanup: () => void;
};

export class WallMeshBack extends THREE.Mesh {
  private texture: THREE.Texture;

  onSurfaceUpdate: (surface: any | undefined) => void;

  constructor(surface: any, rotate) {
    if (!surface) return;
    const angle = 0.01;

    const vectorPoints = surface.points.map((point: any) =>
      getVector2(point, angle)
    );

    const vectorCuts = surface?.cuts?.map((cut: any) => {
      const angledCutPoints = cut.points.map((point: any) =>
        getVector2(point, angle)
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

    shapeVector.holes = vectorCuts;

    const geometry = new THREE.ShapeGeometry(shapeVector);

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      side: 2,
    });

    const texture = new THREE.TextureLoader().load(
      "/assets/textures/wall-in.jpg"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI * 0.5;
    material.map = texture;

    super(geometry, material);

    this.name = "WALL";

    this.focusable = true;

    this.rotation.set(
      surface.settings.rotation3d.x,
      surface.settings.rotation3d.y,
      surface.settings.rotation3d.z
    );

    const { x, y, z } = surface.settings.position3d;

    this.position.set(x, y, z);

    this.translateZ(-0.03);
  }

  addTextureToMaterial(material: any) {
    this.texture = new THREE.TextureLoader().load("./textures/wall.jpg");
    material.map = this.texture;
  }
}
