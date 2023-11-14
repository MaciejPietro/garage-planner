import {
  SELECT_CAMERA360,
  SELECT_TOOL_DRAWING_CAMERA360,
  UPDATE_DRAWING_CAMERA360,
  END_DRAWING_CAMERA360,
  BEGIN_DRAGGING_CAMERA360,
  UPDATE_DRAGGING_CAMERA360,
  END_DRAGGING_CAMERA360,
  BEGIN_ROTATING_CAMERA360,
  UPDATE_ROTATING_CAMERA360,
  END_ROTATING_CAMERA360,
  BEGIN_RESIZING_CAMERA360,
  UPDATE_RESIZING_CAMERA360,
  END_RESIZING_CAMERA360
} from '../constants';

export function selectCamera360(layerID, camera360ID) {
  return {
    type: SELECT_CAMERA360,
    layerID,
    camera360ID
  }
}

export function selectToolDrawingCamera360(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_CAMERA360,
    sceneComponentType
  }
}

export function updateDrawingCamera360(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_CAMERA360,
    layerID, x, y
  }
}

export function endDrawingCamera360(layerID, x, y) {
  return {
    type: END_DRAWING_CAMERA360,
    layerID, x, y
  }
}

export function beginDraggingCamera360(layerID, camera360ID, x, y) {
  return {
    type: BEGIN_DRAGGING_CAMERA360,
    layerID, camera360ID, x, y
  }
}

export function updateDraggingCamera360(x, y) {
  return {
    type: UPDATE_DRAGGING_CAMERA360,
    x, y
  }
}

export function endDraggingCamera360(x, y) {
  return {
    type: END_DRAGGING_CAMERA360,
    x, y
  }
}

export function beginRotatingCamera360(layerID, camera360ID, x, y) {
  return {
    type: BEGIN_ROTATING_CAMERA360,
    layerID, camera360ID, x, y
  }
}

export function updateRotatingCamera360(x, y) {
  return {
    type: UPDATE_ROTATING_CAMERA360,
    x, y
  }
}

export function endRotatingCamera360(x, y) {
  return {
    type: END_ROTATING_CAMERA360,
    x, y
  }
}
export function beginResizingCamera360(layerID, camera360ID, x, y, side) {
  return {
    type: BEGIN_RESIZING_CAMERA360,
    layerID, camera360ID, x, y, side
  }
}

export function updateResizingCamera360(x, y) {
  return {
    type: UPDATE_RESIZING_CAMERA360,
    x, y
  }
}

export function endResizingCamera360(x, y) {
  return {
    type: END_RESIZING_CAMERA360,
    x, y
  }
}