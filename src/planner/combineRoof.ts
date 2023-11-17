// @ts-nocheck

import { Main, PerspectiveCameraAuto, PointerEventExt } from "@three.ez/main";
import { GUI } from "dat.gui";
import * as THREE from "three";
import { GridHelper, Vector3 } from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";

import { cmToM } from "./helpers";

import { WallMesh, WallMeshType } from "./WallMesh";
import { RoofMesh, RoofMeshType } from "./RoofMesh";

import { CAMERA, COLORS, NAMES } from "./constants";
import { GateMesh } from "./GateMesh";
import importObj from "./Object";

type PointerEvent =
  | PointerEventExt<
      THREE.Object3D<THREE.Object3DEventMap>,
      THREE.Object3D<THREE.Object3DEventMap>
    >
  | undefined;

class RoofCombiner {
  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  lights: Record<string, THREE.AmbientLight | THREE.DirectionalLight>;
  helpers: Record<string, THREE.DirectionalLightHelper>;
  cameraControls: MapControls;
  surfaces: THREE.Group;
  focusedWallMesh: WallMeshType | null;
  domNode: HTMLElement | null;
  gui: GUI | null;

  offerSurfaces: any[];
  onSurfaceUpdate: (surface: any | null) => void;
  onYPosUpdate: (value: number) => void;

  constructor() {
    this.surfaces = new THREE.Group();

    this.lights = {};
    this.helpers = {};

    this.offerSurfaces = [];
    this.onSurfaceUpdate = () => undefined;
    this.onYPosUpdate = () => undefined;
  }

  init(
    domId: string,
    offerSurfaces: any[],
    handleSurfaceUpdate?: (surface: any | null) => void
  ) {
    this.offerSurfaces = offerSurfaces || [];
    this.onSurfaceUpdate = handleSurfaceUpdate || (() => undefined);

    this.domNode = document.getElementById(domId);

    if (!this.domNode) return;

    const main = new Main({
      animate: this.animate.bind(this),
      fullscreen: false,
      backgroundColor: new THREE.Color(COLORS.roof3d_background),
      rendererParameters: { antialias: true, canvas: this.domNode },
      showStats: process.env.NODE_ENV === "development",
    });

    this.scene = new THREE.Scene();
    this.scene.activeSmartRendering();
    this.scene.fog = new THREE.FogExp2(0x505050, 0.01);

    this.initHelpers();

    this.initLights();

    this.renderer = main.renderer;

    this.initCamera();

    this.drawSurfaces(this.offerSurfaces);
    this.scene.add(this.surfaces);

    this.scene.continuousRaycasting = true;
    this.scene.continuousRaycastingDropTarget = true;

    main.createView({
      scene: this.scene,
      camera: this.camera,
    });

    this.centerCamera();

    this.initGui();

    this.scene.on(
      ["pointerdown", "pointerup"],
      this.disableMapControlsWhenDragging.bind(this)
    );

    this.importObjects();
  }

  animate() {
    this.cameraControls.update();
  }
  initGui() {
    if (process.env.NODE_ENV !== "development") return;

    this.gui = new GUI();

    if (!this.gui) return;

    const lightFolder = this.gui.addFolder("Light");

    const data = {
      color: this.lights.directionalLight.color.getHex(),
    };

    lightFolder.addColor(data, "color").onChange(() => {
      this.lights.directionalLight.color.setHex(
        Number(data.color.toString().replace("#", "0x"))
      );
    });
    lightFolder.add(
      this.lights.directionalLight,
      "intensity",
      0,
      Math.PI * 2,
      0.01
    );
    lightFolder.add(this.helpers.directionalLightHelper, "visible");
    lightFolder.add(this.helpers.directionalLightHelper2, "visible");
  }

  initHelpers() {
    const axesHelper = new THREE.AxesHelper(5000);

    axesHelper.interceptByRaycaster = false;

    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(100, 100, 0x5555ff, 0xf3f3f3);

    gridHelper.interceptByRaycaster = false;

    this.scene.add(gridHelper);
  }

  async importObjects() {
    importObj("src/planner/objects/window/window")
      .then((loadedObject: any) => {
        loadedObject.position.set(0.02, 1, -1.4);
        loadedObject.rotation.y = Math.PI * 0.5;

        this.scene.add(loadedObject);
      })
      .catch((error) => {
        throw error;
      });
  }

  disableMapControlsWhenDragging(e: PointerEvent) {
    this.cameraControls.enabled =
      e?.type === "pointerdown" && e.target?.name === NAMES.SURFACE
        ? false
        : true;
  }

  drawSurfaces(surfaces: any) {
    if (!surfaces?.length) return;
    surfaces.forEach((osurface: any) => {
      let mesh;
      if (osurface.type === "wall") {
        mesh = new WallMesh(osurface, this.onSurfaceUpdate);
      } else if (osurface.type === "roof") {
        mesh = new RoofMesh(osurface, this.onSurfaceUpdate);
      } else if (osurface.type === "gate") {
        mesh = new GateMesh(osurface, this.onSurfaceUpdate);
      }

      if (mesh) {
        this.surfaces.add(mesh);

        mesh.on("focusin", () => {
          this.setSelectedSurface(osurface.type);
        });
      }
    });
  }

  renderRoof(roof: any) {
    this.removeObjectByName("ROOF");
    this.drawSurfaces(roof);
  }

  removeObjectByName(name: string) {
    this.scene.traverse((object: any) => {
      if (object.name === name) {
        // this.scene.remove(object);
        // object.geometry.dispose();
        // object.material.dispose();
        // object = undefined;
        // TODO do it better
        object.visible = false;
      }
    });
  }

  initLights() {
    this.lights.ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(this.lights.ambientLight);

    // DirectionalLight
    const light = new THREE.DirectionalLight(0xffffff, 6);

    this.lights.directionalLight = light;

    light.position.set(-50, 50, 50);

    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 6000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);

    const helper = new THREE.DirectionalLightHelper(
      light,
      5,
      new THREE.Color("red")
    );

    helper.visible = false;
    this.helpers.directionalLightHelper = helper;
    this.scene.add(helper);

    // DirectionalLight2

    const light2 = new THREE.DirectionalLight(0xffffff, 6);

    light2.position.set(50, 50, -50);

    light2.castShadow = true;
    light2.shadow.camera.near = 1000;
    light2.shadow.camera.far = 6000;
    light2.shadow.mapSize.width = 1024;
    light2.shadow.mapSize.height = 1024;
    this.scene.add(light2);

    const helper2 = new THREE.DirectionalLightHelper(
      light2,
      5,
      new THREE.Color("red")
    );

    helper2.visible = false;
    this.helpers.directionalLightHelper2 = helper2;
    this.scene.add(helper2);

    // SpotLight
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    this.scene.add(spotLight);
  }

  initCamera() {
    this.camera = new PerspectiveCameraAuto(50, 0.001, 1000);
    this.cameraControls = new MapControls(
      this.camera,
      this.renderer.domElement
    );

    this.cameraControls.enableDamping = true;
    this.cameraControls.dampingFactor = 0.05;
    this.cameraControls.screenSpacePanning = false;
    this.cameraControls.minDistance = 1;
    this.cameraControls.maxDistance = 100;
    this.cameraControls.maxPolarAngle = Math.PI / 2;

    this.cameraControls.update();
  }

  cleanup() {
    this.cameraControls?.dispose();
    this.gui?.destroy();

    const surfaces = this.surfaces.children as Array<WallMeshType>;

    surfaces.forEach((mesh) => mesh.cleanup());

    this.surfaces = new THREE.Group();

    this.focusedWallMesh = null;
  }

  setSelectedSurface(type: string) {
    console.log("click on", type);
  }

  getRoofBoundings() {
    if (!this.surfaces.children.length) {
      const defaultVector = new Vector3(0, 0, 0);

      return {
        min: defaultVector,
        max: defaultVector,
        center: defaultVector,
        size: defaultVector,
      };
    }
    const box = new THREE.Box3().setFromObject(this.surfaces);

    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    return { ...box, size, center };
  }

  centerCamera() {
    const { center, size, max } = this.getRoofBoundings();

    if (this.cameraControls) {
      const cameraPositionY =
        Math.max(size.x, size.z) +
        max.y +
        CAMERA.CENTERING_OFFSET_Y +
        this.surfaces.position.y;

      this.camera?.position.set(center.x, cameraPositionY, center.z);

      this.cameraControls.target = center;
    }
  }
}

export default RoofCombiner;
