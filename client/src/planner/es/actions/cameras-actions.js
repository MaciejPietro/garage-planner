import { SELECT_CAMERA, SELECT_TOOL_DRAWING_CAMERA, UPDATE_DRAWING_CAMERA, END_DRAWING_CAMERA, BEGIN_DRAGGING_CAMERA, UPDATE_DRAGGING_CAMERA, END_DRAGGING_CAMERA, BEGIN_ROTATING_CAMERA, UPDATE_ROTATING_CAMERA, END_ROTATING_CAMERA, BEGIN_RESIZING_CAMERA, UPDATE_RESIZING_CAMERA, END_RESIZING_CAMERA } from '../constants';

export function selectCamera(layerID, cameraID) {
  return {
    type: SELECT_CAMERA,
    layerID: layerID,
    cameraID: cameraID
  };
}

export function selectToolDrawingCamera(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_CAMERA,
    sceneComponentType: sceneComponentType
  };
}

export function updateDrawingCamera(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_CAMERA,
    layerID: layerID, x: x, y: y
  };
}

export function endDrawingCamera(layerID, x, y) {
  return {
    type: END_DRAWING_CAMERA,
    layerID: layerID, x: x, y: y
  };
}

export function beginDraggingCamera(layerID, cameraID, x, y) {
  return {
    type: BEGIN_DRAGGING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y
  };
}

export function updateDraggingCamera(x, y) {
  return {
    type: UPDATE_DRAGGING_CAMERA,
    x: x, y: y
  };
}

export function endDraggingCamera(x, y) {
  return {
    type: END_DRAGGING_CAMERA,
    x: x, y: y
  };
}

export function beginRotatingCamera(layerID, cameraID, x, y) {
  return {
    type: BEGIN_ROTATING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y
  };
}

export function updateRotatingCamera(x, y) {
  return {
    type: UPDATE_ROTATING_CAMERA,
    x: x, y: y
  };
}

export function endRotatingCamera(x, y) {
  return {
    type: END_ROTATING_CAMERA,
    x: x, y: y
  };
}
export function beginResizingCamera(layerID, cameraID, x, y, side) {
  return {
    type: BEGIN_RESIZING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y, side: side
  };
}

export function updateResizingCamera(x, y) {
  return {
    type: UPDATE_RESIZING_CAMERA,
    x: x, y: y
  };
}

export function endResizingCamera(x, y) {
  return {
    type: END_RESIZING_CAMERA,
    x: x, y: y
  };
}