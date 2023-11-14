import { Layer, Group } from './export';
import { IDBroker, NameGenerator } from '../utils/export';
import { Map, fromJS } from 'immutable';

import {
  MODE_IDLE,
  MODE_DRAWING_CAMERA360,
  MODE_DRAGGING_CAMERA360,
  MODE_ROTATING_CAMERA360,
  MODE_RESIZING_CAMERA360,
} from '../constants';

import { calculatePointFromLineWithAngleAndPoint } from '../utils/geometry';

class Camera360 {
  static create(state, layerID, type, x, y, rotation) {
    let camera360ID = IDBroker.acquireID();
    console.log('camera360-create');
    let camera360 = state.catalog.factoryElement(type, {
      id: camera360ID,
      name: NameGenerator.generateName(
        'cameras360',
        state.catalog.getIn(['elements', type, 'info', 'title'])
      ),
      type,
      x,
      y,
      rotation,
    });

    state = state.setIn(
      ['scene', 'layers', layerID, 'cameras360', camera360ID],
      camera360
    );

    return { updatedState: state, camera360 };
  }

  static select(state, layerID, camera360ID) {
    state = Layer.select(state, layerID).updatedState;
    state = Layer.selectElement(state, layerID, 'cameras360', camera360ID).updatedState;

    return { updatedState: state };
  }

  static remove(state, layerID, camera360ID) {
    state = this.unselect(state, layerID, camera360ID).updatedState;
    state = Layer.removeElement(state, layerID, 'cameras360', camera360ID).updatedState;

    state
      .getIn(['scene', 'groups'])
      .forEach(
        (group) =>
          (state = Group.removeElement(
            state,
            group.id,
            layerID,
            'cameras360',
            camera360ID
          ).updatedState)
      );

    return { updatedState: state };
  }

  static unselect(state, layerID, camera360ID) {
    state = Layer.unselect(state, layerID, 'cameras360', camera360ID).updatedState;

    return { updatedState: state };
  }

  static selectToolDrawingCamera360(state, sceneComponentType) {
    state = state.merge({
      mode: MODE_DRAWING_CAMERA360,
      drawingSupport: new Map({
        type: sceneComponentType,
      }),
    });

    return { updatedState: state };
  }

  static updateDrawingCamera360(state, layerID, x, y) {
    console.log(state, layerID, x, y);
    if (state.hasIn(['drawingSupport', 'currentID'])) {
      state = state.updateIn(
        [
          'scene',
          'layers',
          layerID,
          'cameras360',
          state.getIn(['drawingSupport', 'currentID']),
        ],
        (camera360) => camera360.merge({ x, y })
      );
    } else {
      let { updatedState: stateI, camera360 } = this.create(
        state,
        layerID,
        state.getIn(['drawingSupport', 'type']),
        x,
        y,
        0
      );
      state = Camera360.select(stateI, layerID, camera360.id).updatedState;
      state = state.setIn(['drawingSupport', 'currentID'], camera360.id);
    }

    return { updatedState: state };
  }

  static endDrawingCamera360(state, layerID, x, y) {
    console.log('endDrawingCamera360');
    let catalog = state.catalog;
    state = this.updateDrawingCamera360(state, layerID, x, y, catalog).updatedState;
    state = Layer.unselectAll(state, layerID).updatedState;
    state = state.merge({
      drawingSupport: Map({
        type: state.drawingSupport.get('type'),
      }),
    });

    return { updatedState: state };
  }

  static beginDraggingCamera360(state, layerID, camera360ID, x, y) {
    let camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

    state = state.merge({
      mode: MODE_DRAGGING_CAMERA360,
      draggingSupport: Map({
        layerID,
        camera360ID,
        startPointX: x,
        startPointY: y,
        originalX: camera360.x,
        originalY: camera360.y,
      }),
    });

    return { updatedState: state };
  }

  static updateDraggingCamera360(state, x, y) {
    let { draggingSupport, scene } = state;

    let layerID = draggingSupport.get('layerID');
    let camera360ID = draggingSupport.get('camera360ID');
    let startPointX = draggingSupport.get('startPointX');
    let startPointY = draggingSupport.get('startPointY');
    let originalX = draggingSupport.get('originalX');
    let originalY = draggingSupport.get('originalY');

    let diffX = startPointX - x;
    let diffY = startPointY - y;

    let camera360 = scene.getIn(['layers', layerID, 'cameras360', camera360ID]);
    camera360 = camera360.merge({
      x: originalX - diffX,
      y: originalY - diffY,
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360),
    });

    return { updatedState: state };
  }

  static endDraggingCamera360(state, x, y) {
    state = this.updateDraggingCamera360(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static beginRotatingCamera360(state, layerID, camera360ID, x, y) {
    state = state.merge({
      mode: MODE_ROTATING_CAMERA360,
      rotatingSupport: Map({
        layerID,
        camera360ID,
      }),
    });

    return { updatedState: state };
  }

  static updateRotatingCamera360(state, x, y) {
    let { rotatingSupport, scene } = state;

    let layerID = rotatingSupport.get('layerID');
    let camera360ID = rotatingSupport.get('camera360ID');
    let camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

    let deltaX = x - camera360.x;
    let deltaY = y - camera360.y;
    let rotation = (Math.atan2(deltaY, deltaX) * 180) / Math.PI - 90;

    if (-5 < rotation && rotation < 5) rotation = 0;
    if (-95 < rotation && rotation < -85) rotation = -90;
    if (-185 < rotation && rotation < -175) rotation = -180;
    if (85 < rotation && rotation < 90) rotation = 90;
    if (-270 < rotation && rotation < -265) rotation = 90;

    console.log(rotation);
    camera360 = camera360.merge({
      rotation,
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360),
    });

    return { updatedState: state };
  }

  static endRotatingCamera360(state, x, y) {
    state = this.updateRotatingCamera360(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static beginResizingCamera360(state, layerID, camera360ID, x, y, side) {
    const camera360 = state.getIn([
      'scene',
      'layers',
      layerID,
      'cameras360',
      camera360ID,
    ]);

    let properties = camera360.get('properties');

    const currentWidth = properties.getIn(['width', 'length']);
    const currentDepth = properties.getIn(['depth', 'length']);

    state = state.merge({
      mode: MODE_RESIZING_CAMERA360,
      resizingSupport: Map({
        layerID,
        camera360ID,
        side: side,
        startPointX: x,
        startPointY: y,
        originalX: camera360.x,
        originalY: camera360.y,
        originalWidth: currentWidth,
        originalDepth: currentDepth,
      }),
    });

    return { updatedState: state };
  }

  static updateResizingCamera360(state, x, y) {
    let { resizingSupport, scene } = state;

    let layerID = resizingSupport.get('layerID');
    let camera360ID = resizingSupport.get('camera360ID');
    let side = resizingSupport.get('side');
    let camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

    let startPointX = resizingSupport.get('startPointX');
    let startPointY = resizingSupport.get('startPointY');
    let originalX = resizingSupport.get('originalX');
    let originalY = resizingSupport.get('originalY');
    let originalWidth = resizingSupport.get('originalWidth');
    let originalDepth = resizingSupport.get('originalDepth');

    let properties = camera360.get('properties');
    let rotation = camera360.get('rotation');

    let propertyName = 'width';
    let camera360NewLength = 0;
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

    const mousePositionToCamera360Center = calculatePointFromLineWithAngleAndPoint(
      originalX,
      originalY,
      sideAngle,
      x,
      y
    );

    let rel = mousePositionToSide.relation * mousePositionToCamera360Center.relation;

    if (
      mousePositionToSide.relation == -1 &&
      mousePositionToCamera360Center.relation == -1 &&
      (side == 'right' || side == 'top')
    ) {
      rel = -1;
    } else if (
      mousePositionToSide.relation == 1 &&
      mousePositionToCamera360Center.relation == 1 &&
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
        camera360NewLength = newWidth;
        break;

      case 'top':
      case 'bottom':
        propertyName = 'depth';
        camera360NewLength = distance * 2;
        break;
    }

    properties = properties.setIn([propertyName, 'length'], camera360NewLength);
    this.setProperties(state, layerID, camera360ID, properties);

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360),
    });

    if (side == 'top') {
      var deltaX2 = x - camera360.x;
      var deltaY2 = y - camera360.y;
      var rotate = (Math.atan2(deltaY2, deltaX2) * 180) / Math.PI - 90;

      if (-5 < rotate && rotate < 5) rotate = 0;
      if (-95 < rotate && rotate < -85) rotate = -90;
      if (-185 < rotate && rotate < -175) rotate = -180;
      if (85 < rotate && rotate < 90) rotate = 90;
      if (-270 < rotate && rotate < -265) rotate = 90;

      camera360 = camera360.merge({
        rotation: rotate,
      });
    }

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360),
    });

    return {
      updatedState: this.setProperties(state, layerID, camera360ID, properties)
        .updatedState,
    };
  }

  static endResizingCamera360(state, x, y) {
    state = this.updateResizingCamera360(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static setProperties(state, layerID, camera360ID, properties) {
    state = state.mergeIn(
      ['scene', 'layers', layerID, 'cameras360', camera360ID, 'properties'],
      properties
    );

    return { updatedState: state };
  }

  static setJsProperties(state, layerID, camera360ID, properties) {
    return this.setProperties(state, layerID, camera360ID, fromJS(properties));
  }

  static updateProperties(state, layerID, camera360ID, properties) {
    properties.forEach((v, k) => {
      if (
        state.hasIn([
          'scene',
          'layers',
          layerID,
          'cameras360',
          camera360ID,
          'properties',
          k,
        ])
      )
        state = state.mergeIn(
          ['scene', 'layers', layerID, 'cameras360', camera360ID, 'properties', k],
          v
        );
    });

    return { updatedState: state };
  }

  static updateJsProperties(state, layerID, camera360ID, properties) {
    return this.updateProperties(state, layerID, camera360ID, fromJS(properties));
  }

  static setAttributes(state, layerID, camera360ID, camera360Attributes) {
    state = state.mergeIn(
      ['scene', 'layers', layerID, 'cameras360', camera360ID],
      camera360Attributes
    );
    return { updatedState: state };
  }

  static setJsAttributes(state, layerID, camera360ID, camera360Attributes) {
    camera360Attributes = fromJS(camera360Attributes);
    return this.setAttributes(state, layerID, camera360ID, camera360Attributes);
  }
}

export { Camera360 as default };
