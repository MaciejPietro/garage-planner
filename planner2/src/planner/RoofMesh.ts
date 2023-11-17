import * as THREE from "three";
import { Vector3 } from "three";

import { COLORS } from "./constants";

import { applyAngle, degToRad } from "./helpers";

function getVector2(point: any, angle: number | null) {
  // TODO replace any if applyAngle will be places in ts file
  const angledPoint = applyAngle(angle, point) as any;

  return new THREE.Vector2(angledPoint.x / 100, angledPoint.y / 100);
}

export type RoofMeshType = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshPhongMaterial
> & {
  update: () => void;
  cleanup: () => void;
};

export class RoofMesh extends THREE.Mesh {
  private texture: THREE.Texture;

  onSurfaceUpdate: (surface: any | undefined) => void;

  constructor(
    surface: any,
    onSurfaceUpdate: (surface: any | undefined) => void
  ) {
    if (!surface) return;
    const angle = 0.01;

    const vectorPoints = surface.points.map((point: any) =>
      getVector2(point, angle)
    );

    const vectorCuts = surface?.cuts?.map((cut: any) => {
      const angledCutPoints = cut.points.map((point: any) =>
        getVector2(point, angle)
      );

      return new THREE.Shape(angledCutPoints);
    });

    if (!vectorPoints.length) return;

    const shapeVector = new THREE.Shape(vectorPoints);

    shapeVector.holes = vectorCuts;

    const geometry = new THREE.ShapeGeometry(shapeVector);

    geometry.rotateX(degToRad(90 + (angle || 1)));

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      side: THREE.DoubleSide,
    });

    const texture = new THREE.TextureLoader().load(
      "src/planner/textures/painted.jpg"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI * 0.5;
    material.map = texture;

    super(geometry, material);

    this.onSurfaceUpdate = onSurfaceUpdate;

    this.name = "ROOF";

    this.userData = {
      surface: surface,
    };
    this.draggable = true;
    this.focusable = true;

    this.rotation.set(
      surface.settings.rotation3d.x,
      surface.settings.rotation3d.y,
      surface.settings.rotation3d.z
    );

    const { x, y, z } = surface.settings.position3d;

    this.position.set(x, y, z);

    this.setCursor();

    this.on("drag", (e) => {
      e?.preventDefault();
      if (e) {
        const newX = e.ctrlKey ? this.position.x : e.position.x;
        const newZ = e.ctrlKey ? this.position.z : e.position.z;
        const newY = Math.max(0, e.ctrlKey ? e.position.y : this.position.y);

        this.position.set(newX, newY, newZ);
      }
    });

    this.on("dragend", this.update);

    this.on("focusin", () => {
      this.setColor("roof3d_surface_mesh_focused");
    });

    this.on("focusout", () => {
      this.setColor("roof3d_surface_mesh_idle");
    });

    this.on("pointerenter", () => {
      if (!this.focused) this.setColor("roof3d_surface_mesh_hover");
    });

    this.on("pointerleave", () => {
      if (!this.focused) this.setColor("roof3d_surface_mesh_idle");
    });

    this.on("dragend", this.update);

    window.addEventListener("keydown", this.determineCursor.bind(this));
    window.addEventListener("keyup", this.determineCursor.bind(this));
  }

  determineCursor(e: KeyboardEvent) {
    if (e.type === "keydown")
      this.setCursor(e?.ctrlKey ? "ns-resize" : "all-scroll");
    if (e.type === "keyup") this.setCursor();
  }

  setCursor(cursor = "all-scroll") {
    this.cursor = cursor;
  }

  setColor(color: keyof typeof COLORS) {
    // const material = this.material as THREE.MeshPhongMaterial;
    // material.color.set(COLORS[color]);
  }

  update() {
    // const { x, y, z } = this.rotation;
    // const newSurface = new Surface({
    //   ...this.userData.surface,
    //   settings: {
    //     ...this.userData.surface.settings,
    //     is3dPositioned: true,
    //     position3d: { ...this.position },
    //     rotation3d: { x, y, z },
    //   },
    // });
    // store.dispatch(updateSurface(newSurface, false, false, false, false) as any);
    // this.onSurfaceUpdate(newSurface);
  }

  cleanup() {
    window.addEventListener("keydown", this.determineCursor.bind(this));
    window.addEventListener("keyup", this.determineCursor.bind(this));
  }
}
