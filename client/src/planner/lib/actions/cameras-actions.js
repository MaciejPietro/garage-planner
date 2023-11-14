'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCamera = selectCamera;
exports.selectToolDrawingCamera = selectToolDrawingCamera;
exports.updateDrawingCamera = updateDrawingCamera;
exports.endDrawingCamera = endDrawingCamera;
exports.beginDraggingCamera = beginDraggingCamera;
exports.updateDraggingCamera = updateDraggingCamera;
exports.endDraggingCamera = endDraggingCamera;
exports.beginRotatingCamera = beginRotatingCamera;
exports.updateRotatingCamera = updateRotatingCamera;
exports.endRotatingCamera = endRotatingCamera;
exports.beginResizingCamera = beginResizingCamera;
exports.updateResizingCamera = updateResizingCamera;
exports.endResizingCamera = endResizingCamera;

var _constants = require('../constants');

function selectCamera(layerID, cameraID) {
  return {
    type: _constants.SELECT_CAMERA,
    layerID: layerID,
    cameraID: cameraID
  };
}

function selectToolDrawingCamera(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_CAMERA,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingCamera(layerID, x, y) {
  return {
    type: _constants.UPDATE_DRAWING_CAMERA,
    layerID: layerID, x: x, y: y
  };
}

function endDrawingCamera(layerID, x, y) {
  return {
    type: _constants.END_DRAWING_CAMERA,
    layerID: layerID, x: x, y: y
  };
}

function beginDraggingCamera(layerID, cameraID, x, y) {
  return {
    type: _constants.BEGIN_DRAGGING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y
  };
}

function updateDraggingCamera(x, y) {
  return {
    type: _constants.UPDATE_DRAGGING_CAMERA,
    x: x, y: y
  };
}

function endDraggingCamera(x, y) {
  return {
    type: _constants.END_DRAGGING_CAMERA,
    x: x, y: y
  };
}

function beginRotatingCamera(layerID, cameraID, x, y) {
  return {
    type: _constants.BEGIN_ROTATING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y
  };
}

function updateRotatingCamera(x, y) {
  return {
    type: _constants.UPDATE_ROTATING_CAMERA,
    x: x, y: y
  };
}

function endRotatingCamera(x, y) {
  return {
    type: _constants.END_ROTATING_CAMERA,
    x: x, y: y
  };
}
function beginResizingCamera(layerID, cameraID, x, y, side) {
  return {
    type: _constants.BEGIN_RESIZING_CAMERA,
    layerID: layerID, cameraID: cameraID, x: x, y: y, side: side
  };
}

function updateResizingCamera(x, y) {
  return {
    type: _constants.UPDATE_RESIZING_CAMERA,
    x: x, y: y
  };
}

function endResizingCamera(x, y) {
  return {
    type: _constants.END_RESIZING_CAMERA,
    x: x, y: y
  };
}