// @ts-nocheck

import { Main, PerspectiveCameraAuto, PointerEventExt } from "@three.ez/main";
import { GUI } from "dat.gui";
import * as THREE from "three";
import { GridHelper, Vector3 } from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { windowCut } from "../lib/data";
import { getdropRoof } from "../lib/roofs/dropRoof";
import { getGateSurface } from "../lib/gates";

import { cmToM, mToCm } from "./helpers";

import { WallMesh, WallMeshType } from "./WallMesh";
import { WallMeshBack } from "./WallMeshBack";

import { DROP_ROTATION } from "../lib/roofs/dropRoof";

import { RoofMesh } from "./RoofMesh";

import { CAMERA, COLORS, NAMES } from "./constants";
import { GateMesh } from "./GateMesh";
import importObj from "./Object";

type PointerEvent =
  | PointerEventExt<
      THREE.Object3D<THREE.Object3DEventMap>,
      THREE.Object3D<THREE.Object3DEventMap>
    >
  | undefined;

const wallHeight = 2;

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
      rendererParameters: {
        antialias: true,
        canvas: this.domNode,
      },
      showStats: process.env.NODE_ENV === "development",
    });

    this.scene = new THREE.Scene();
    this.scene.activeSmartRendering();
    this.scene.fog = new THREE.FogExp2(0x505050, 0.01);

    this.initHelpers();

    this.initFloor();

    this.initLights();

    this.renderer = main.renderer;
    this.renderer.localClippingEnabled = true;

    this.initCamera();

    this.scene.add(this.surfaces);

    this.scene.continuousRaycasting = true;
    this.scene.continuousRaycastingDropTarget = true;

    main.createView({
      scene: this.scene,
      camera: this.camera,
    });

    this.initGui();

    this.scene.on(
      ["pointerdown", "pointerup"],
      this.disableMapControlsWhenDragging.bind(this)
    );
  }

  animate() {
    this.cameraControls.update();
  }
  initGui() {
    if (process.env.NODE_ENV !== "development") return;

    this.gui = new GUI();

    if (!this.gui) return;

    const helpersFolder = this.gui.addFolder("Helpers");

    helpersFolder.add(this.axesHelper, "visible").name("Axes Helper");
    helpersFolder.add(this.gridHelper, "visible").name("Grid Helper");

    // const data = {
    //   color: this.lights.directionalLight.color.getHex(),
    // };

    // lightFolder.addColor(data, "color").onChange(() => {
    //   this.lights.directionalLight.color.setHex(
    //     Number(data.color.toString().replace("#", "0x"))
    //   );
    // });
    // lightFolder.add(
    //   this.lights.directionalLight,
    //   "intensity",
    //   0,
    //   Math.PI * 2,
    //   0.01
    // );
    // lightFolder.add(this.helpers.directionalLightHelper, "visible");
    // lightFolder.add(this.helpers.directionalLightHelper2, "visible");
  }

  initHelpers() {
    this.axesHelper = new THREE.AxesHelper(5000);
    this.axesHelper.visible = false;
    this.scene.add(this.axesHelper);

    this.gridHelper = new THREE.GridHelper(10, 10, 0x5555ff, 0xf3f3f3);
    this.gridHelper.visible = false;
    this.scene.add(this.gridHelper);
  }

  initFloor() {
    const floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    const texture = new THREE.TextureLoader().load(
      "/assets/textures/grass.jpg"
    );
    texture.repeat.set(4, 4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.rotation = Math.PI * 0.5;
    floorMaterial.map = texture;

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(2, -0.04, -2);
    floor.rotation.x = -Math.PI / 2; // Rotate the floor to make it horizontal
    this.scene.add(floor);
  }

  async addWindow({ x, y }) {
    this.removeObjectByName("WINDOW");
    importObj("/assets/objects/window/window")
      .then((loadedObject: any) => {
        loadedObject.name = "WINDOW";
        const windowSize = 1;
        const windowWidth = 0.5;

        loadedObject.position.set(
          0,
          y / 100 + windowSize / 2 + -0.05,
          -x / 100 + windowWidth / 2 + 0.02
        );
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

  renderWalls(dimension, height, texturePath) {
    this.removeObjectByName("WALL");

    this.dimension = dimension.settings;

    const { width, length } = dimension.settings;

    const wallHeight = mToCm(height);

    const frontWidth = mToCm(width);
    const sideWidth = mToCm(length);

    const additionalWallHeight = mToCm(0.5);

    const walls = ["front", "left", "back", "right"].map((pos) => {
      const isFront = pos === "front";
      const isLeft = pos === "left";
      const isBack = pos === "back";
      const isRight = pos === "right";

      if (isLeft) {
        this.addWindow({ x: sideWidth / 2, y: 55 });
      }

      return {
        type: "WALL",
        position: pos,
        points: [
          {
            x: 0,
            y: 0,
          },
          {
            x: isFront || isBack ? frontWidth : sideWidth,
            y: 0,
          },
          {
            x: isFront || isBack ? frontWidth : sideWidth,
            y: wallHeight + additionalWallHeight,
          },
          {
            x: 0,
            y: wallHeight + additionalWallHeight,
          },
        ],
        cuts: isLeft
          ? [
              {
                ...windowCut,
                settings: {
                  position: {
                    x: sideWidth / 2,
                    y: 50,
                    // x: 150,
                    // y: 55,
                  },
                },
              },
            ]
          : [],
        settings: {
          position3d: {
            x: isBack || isRight ? width : 0,
            y: 0,
            z: isBack || isLeft ? -length : 0,
          },
          rotation3d: {
            x: 0,
            y: isBack
              ? Math.PI
              : isLeft
              ? Math.PI * -0.5
              : isRight
              ? Math.PI * 0.5
              : 0,
            z: 0,
          },
        },
      };
    });

    walls.forEach((wall) => {
      const planes = this.getClippingPlanesFromRoof();

      const mesh = new WallMesh(wall, texturePath);
      mesh.material.clippingPlanes = planes;
      mesh.material.clipIntersection = true;

      const meshBack = new WallMeshBack(wall, false);
      meshBack.material.clippingPlanes = planes;
      meshBack.material.clipIntersection = true;

      this.scene.add(mesh);
      this.scene.add(meshBack);
    });
  }

  renderRoof(roof: any, dimension, wallHeight: number) {
    this.removeObjectByName("ROOF");

    let roofSurfaces = () => [];

    switch (roof.name) {
      case "dropBack":
      case "dropLeft":
      case "dropRight":
        roofSurfaces = getdropRoof;
        break;
    }
    roofSurfaces({
      name: roof.name,
      wallHeight,
      dimension: dimension.settings,
    }).forEach((surface) => {
      const mesh = new RoofMesh(surface);

      this.roofMesh = mesh;

      this.scene.add(mesh);
    });
  }

  renderGate(gate, dimension) {
    this.removeObjectByName("GATE");
    const mesh = new GateMesh(
      getGateSurface({ width: gate.width.value, height: gate.height.value }),
      gate
    );
    mesh.position.x = mesh.position.x + dimension.settings.width / 2;
    this.scene.add(mesh);
  }

  getClippingPlanesFromRoof() {
    const { rotation } = this.roofMesh;

    const rotatedToLeft = rotation.y < 0;
    const rotatedToRight = rotation.y > 0;

    const shouldAccountLowestPoint = rotatedToLeft || rotatedToRight;

    const box = new THREE.Box3().setFromObject(this.roofMesh);

    const normalX = rotatedToLeft
      ? DROP_ROTATION
      : rotatedToRight
      ? -DROP_ROTATION
      : 0;

    const normalY = shouldAccountLowestPoint ? 0 : DROP_ROTATION;

    const normal = new THREE.Vector3(normalX, -1, normalY);

    const correctionYAxisFactor = rotatedToLeft ? 0.03 : -0.05;
    const yPos =
      (rotatedToLeft ? box.min.y : box.max.y) + correctionYAxisFactor;
    const plane = new THREE.Plane(normal, yPos);
    const planes = [plane];

    // const helpers = new THREE.Group();
    // planes.forEach((plane) => {
    //   helpers.add(new THREE.PlaneHelper(plane, 1, 0xff0000));
    // });

    // this.scene.add(helpers);

    return planes;
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
    const light = new THREE.DirectionalLight(0xffffff, 10);

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

    this.cameraControls.autoRotate = true;
    this.cameraControls.autoRotateSpeed = 0.6;

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

  centerCamera() {
    const { width, length } = this.dimension;

    if (this.cameraControls) {
      this.camera.angle;
      this.camera?.position.set(width / 2, 10, 10);
      this.cameraControls.target = new THREE.Vector3(width / 2, 0, -length / 2);
    }
  }
}

export default RoofCombiner;
