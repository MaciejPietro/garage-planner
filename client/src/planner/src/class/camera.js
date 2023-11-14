import { Layer, Group } from './export';
import { IDBroker, NameGenerator } from '../utils/export';
import { Map, fromJS } from 'immutable';

import {
  MODE_IDLE,
  MODE_DRAWING_CAMERA,
  MODE_DRAGGING_CAMERA,
  MODE_ROTATING_CAMERA,
  MODE_RESIZING_CAMERA,
} from '../constants';

import { calculatePointFromLineWithAngleAndPoint } from '../utils/geometry';

class Camera {
  static create(state, layerID, type, x, y, rotation) {
    let cameraID = IDBroker.acquireID();
    console.log('camera-create');
    let camera = state.catalog.factoryElement(type, {
      id: cameraID,
      name: NameGenerator.generateName(
        'cameras',
        state.catalog.getIn(['elements', type, 'info', 'title'])
      ),
      type,
      x,
      y,
      rotation,
    });

    state = state.setIn(['scene', 'layers', layerID, 'cameras', cameraID], camera);

    return { updatedState: state, camera };
  }

  static select(state, layerID, cameraID) {
    state = Layer.select(state, layerID).updatedState;
    state = Layer.selectElement(state, layerID, 'cameras', cameraID).updatedState;

    return { updatedState: state };
  }

  static remove(state, layerID, cameraID) {
    state = this.unselect(state, layerID, cameraID).updatedState;
    state = Layer.removeElement(state, layerID, 'cameras', cameraID).updatedState;

    state
      .getIn(['scene', 'groups'])
      .forEach(
        (group) =>
          (state = Group.removeElement(
            state,
            group.id,
            layerID,
            'cameras',
            cameraID
          ).updatedState)
      );

    return { updatedState: state };
  }

  static unselect(state, layerID, cameraID) {
    state = Layer.unselect(state, layerID, 'cameras', cameraID).updatedState;

    return { updatedState: state };
  }

  static selectToolDrawingCamera(state, sceneComponentType) {
    state = state.merge({
      mode: MODE_DRAWING_CAMERA,
      drawingSupport: new Map({
        type: sceneComponentType,
      }),
    });

    return { updatedState: state };
  }

  static updateDrawingCamera(state, layerID, x, y) {
    console.log(state, layerID, x, y);
    if (state.hasIn(['drawingSupport', 'currentID'])) {
      state = state.updateIn(
        [
          'scene',
          'layers',
          layerID,
          'cameras',
          state.getIn(['drawingSupport', 'currentID']),
        ],
        (camera) => camera.merge({ x, y })
      );
    } else {
      let { updatedState: stateI, camera } = this.create(
        state,
        layerID,
        state.getIn(['drawingSupport', 'type']),
        x,
        y,
        0
      );
      state = Camera.select(stateI, layerID, camera.id).updatedState;
      state = state.setIn(['drawingSupport', 'currentID'], camera.id);
    }

    return { updatedState: state };
  }

  static endDrawingCamera(state, layerID, x, y) {
    console.log('endDrawingCamera');
    let catalog = state.catalog;
    state = this.updateDrawingCamera(state, layerID, x, y, catalog).updatedState;
    state = Layer.unselectAll(state, layerID).updatedState;
    state = state.merge({
      drawingSupport: Map({
        type: state.drawingSupport.get('type'),
      }),
    });

    return { updatedState: state };
  }

  static beginDraggingCamera(state, layerID, cameraID, x, y) {
    let camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

    state = state.merge({
      mode: MODE_DRAGGING_CAMERA,
      draggingSupport: Map({
        layerID,
        cameraID,
        startPointX: x,
        startPointY: y,
        originalX: camera.x,
        originalY: camera.y,
      }),
    });

    return { updatedState: state };
  }

  static updateDraggingCamera(state, x, y) {
    let { draggingSupport, scene } = state;

    let layerID = draggingSupport.get('layerID');
    let cameraID = draggingSupport.get('cameraID');
    let startPointX = draggingSupport.get('startPointX');
    let startPointY = draggingSupport.get('startPointY');
    let originalX = draggingSupport.get('originalX');
    let originalY = draggingSupport.get('originalY');

    let diffX = startPointX - x;
    let diffY = startPointY - y;

    let camera = scene.getIn(['layers', layerID, 'cameras', cameraID]);
    camera = camera.merge({
      x: originalX - diffX,
      y: originalY - diffY,
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera),
    });

    return { updatedState: state };
  }

  static endDraggingCamera(state, x, y) {
    state = this.updateDraggingCamera(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static beginRotatingCamera(state, layerID, cameraID, x, y) {
    state = state.merge({
      mode: MODE_ROTATING_CAMERA,
      rotatingSupport: Map({
        layerID,
        cameraID,
      }),
    });

    return { updatedState: state };
  }

  static updateRotatingCamera(state, x, y) {
    let { rotatingSupport, scene } = state;

    let layerID = rotatingSupport.get('layerID');
    let cameraID = rotatingSupport.get('cameraID');
    let camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

    let deltaX = x - camera.x;
    let deltaY = y - camera.y;
    let rotation = (Math.atan2(deltaY, deltaX) * 180) / Math.PI - 90;

    if (-5 < rotation && rotation < 5) rotation = 0;
    if (-95 < rotation && rotation < -85) rotation = -90;
    if (-185 < rotation && rotation < -175) rotation = -180;
    if (85 < rotation && rotation < 90) rotation = 90;
    if (-270 < rotation && rotation < -265) rotation = 90;

    console.log(rotation);
    camera = camera.merge({
      rotation,
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera),
    });

    return { updatedState: state };
  }

  static endRotatingCamera(state, x, y) {
    state = this.updateRotatingCamera(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static beginResizingCamera(state, layerID, cameraID, x, y, side) {
    const camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

    let properties = camera.get('properties');

    const currentWidth = properties.getIn(['width', 'length']);
    const currentDepth = properties.getIn(['depth', 'length']);

    state = state.merge({
      mode: MODE_RESIZING_CAMERA,
      resizingSupport: Map({
        layerID,
        cameraID,
        side: side,
        startPointX: x,
        startPointY: y,
        originalX: camera.x,
        originalY: camera.y,
        originalWidth: currentWidth,
        originalDepth: currentDepth,
      }),
    });

    return { updatedState: state };
  }

  static updateResizingCamera(state, x, y) {
    let { resizingSupport, scene } = state;

    let layerID = resizingSupport.get('layerID');
    let cameraID = resizingSupport.get('cameraID');
    let side = resizingSupport.get('side');
    let camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

    let startPointX = resizingSupport.get('startPointX');
    let startPointY = resizingSupport.get('startPointY');
    let originalX = resizingSupport.get('originalX');
    let originalY = resizingSupport.get('originalY');
    let originalWidth = resizingSupport.get('originalWidth');
    let originalDepth = resizingSupport.get('originalDepth');

    let properties = camera.get('properties');
    let rotation = camera.get('rotation');

    let propertyName = 'width';
    let cameraNewLength = 0;
    let minLength = 20;

    let testX = 0;

    let sideAngle = rotation;
    if (side === 'left' || side === 'right') sideAngle -= 90;

    const mousePositionToSide = calculatePointFromLineWithAngleAndPoint(
      startPointX,
      startPointY,
      sideAngle,
      x,
      y
    );

    const mousePositionToCameraCenter = calculatePointFromLineWithAngleAndPoint(
      originalX,
      originalY,
      sideAngle,
      x,
      y
    );

    let rel = mousePositionToSide.relation * mousePositionToCameraCenter.relation;
    // rel = -1;
    let order = side == 'right' || side == 'bottom' ? -1 : 1;
    if (
      mousePositionToSide.relation == -1 &&
      mousePositionToCameraCenter.relation == -1 &&
      (side == 'right' || side == 'top')
    ) {
      rel = -1;
    } else if (
      mousePositionToSide.relation == 1 &&
      mousePositionToCameraCenter.relation == 1 &&
      (side == 'left' || side == 'bottom')
    ) {
      rel = -1;
    }

    let newWidth = originalWidth + mousePositionToSide.distance * 2 * rel;

    if (newWidth < minLength) newWidth = minLength;

    let newDepth = originalDepth + mousePositionToSide.distance * 2 * rel;
    if (newDepth < minLength) newDepth = minLength;

    let newPosX = originalX - x;
    let newPosY = originalY - y;
    let distance = Math.sqrt(newPosX * newPosX + newPosY * newPosY);

    switch (side) {
      case 'left':
      case 'right':
        propertyName = 'width';
        cameraNewLength = newWidth;
        break;

      case 'top':
      case 'bottom':
        propertyName = 'depth';
        cameraNewLength = distance * 2;
        break;
    }

    properties = properties.setIn([propertyName, 'length'], cameraNewLength);
    this.setProperties(state, layerID, cameraID, properties);

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera),
    });

    if (side == 'top') {
      var deltaX2 = x - camera.x;
      var deltaY2 = y - camera.y;
      var rotate = (Math.atan2(deltaY2, deltaX2) * 180) / Math.PI - 90;

      if (-5 < rotate && rotate < 5) rotate = 0;
      if (-95 < rotate && rotate < -85) rotate = -90;
      if (-185 < rotate && rotate < -175) rotate = -180;
      if (85 < rotate && rotate < 90) rotate = 90;
      if (-270 < rotate && rotate < -265) rotate = 90;

      camera = camera.merge({
        rotation: rotate,
      });
    }

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera),
    });

    return {
      updatedState: this.setProperties(state, layerID, cameraID, properties).updatedState,
    };
  }

  static endResizingCamera(state, x, y) {
    state = this.updateResizingCamera(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static setProperties(state, layerID, cameraID, properties) {
    state = state.mergeIn(
      ['scene', 'layers', layerID, 'cameras', cameraID, 'properties'],
      properties
    );

    return { updatedState: state };
  }

  static setJsProperties(state, layerID, cameraID, properties) {
    return this.setProperties(state, layerID, cameraID, fromJS(properties));
  }

  static updateProperties(state, layerID, cameraID, properties) {
    properties.forEach((v, k) => {
      if (state.hasIn(['scene', 'layers', layerID, 'cameras', cameraID, 'properties', k]))
        state = state.mergeIn(
          ['scene', 'layers', layerID, 'cameras', cameraID, 'properties', k],
          v
        );
    });

    return { updatedState: state };
  }

  static updateJsProperties(state, layerID, cameraID, properties) {
    return this.updateProperties(state, layerID, cameraID, fromJS(properties));
  }

  static setAttributes(state, layerID, cameraID, cameraAttributes) {
    state = state.mergeIn(
      ['scene', 'layers', layerID, 'cameras', cameraID],
      cameraAttributes
    );
    return { updatedState: state };
  }

  static setJsAttributes(state, layerID, cameraID, cameraAttributes) {
    cameraAttributes = fromJS(cameraAttributes);
    return this.setAttributes(state, layerID, cameraID, cameraAttributes);
  }
}

export { Camera as default };
