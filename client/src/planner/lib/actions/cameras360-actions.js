'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCamera360 = selectCamera360;
exports.selectToolDrawingCamera360 = selectToolDrawingCamera360;
exports.updateDrawingCamera360 = updateDrawingCamera360;
exports.endDrawingCamera360 = endDrawingCamera360;
exports.beginDraggingCamera360 = beginDraggingCamera360;
exports.updateDraggingCamera360 = updateDraggingCamera360;
exports.endDraggingCamera360 = endDraggingCamera360;
exports.beginRotatingCamera360 = beginRotatingCamera360;
exports.updateRotatingCamera360 = updateRotatingCamera360;
exports.endRotatingCamera360 = endRotatingCamera360;
exports.beginResizingCamera360 = beginResizingCamera360;
exports.updateResizingCamera360 = updateResizingCamera360;
exports.endResizingCamera360 = endResizingCamera360;

var _constants = require('../constants');

function selectCamera360(layerID, camera360ID) {
  return {
    type: _constants.SELECT_CAMERA360,
    layerID: layerID,
    camera360ID: camera360ID
  };
}

function selectToolDrawingCamera360(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_CAMERA360,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingCamera360(layerID, x, y) {
  return {
    type: _constants.UPDATE_DRAWING_CAMERA360,
    layerID: layerID, x: x, y: y
  };
}

function endDrawingCamera360(layerID, x, y) {
  return {
    type: _constants.END_DRAWING_CAMERA360,
    layerID: layerID, x: x, y: y
  };
}

function beginDraggingCamera360(layerID, camera360ID, x, y) {
  return {
    type: _constants.BEGIN_DRAGGING_CAMERA360,
    layerID: layerID, camera360ID: camera360ID, x: x, y: y
  };
}

function updateDraggingCamera360(x, y) {
  return {
    type: _constants.UPDATE_DRAGGING_CAMERA360,
    x: x, y: y
  };
}

function endDraggingCamera360(x, y) {
  return {
    type: _constants.END_DRAGGING_CAMERA360,
    x: x, y: y
  };
}

function beginRotatingCamera360(layerID, camera360ID, x, y) {
  return {
    type: _constants.BEGIN_ROTATING_CAMERA360,
    layerID: layerID, camera360ID: camera360ID, x: x, y: y
  };
}

function updateRotatingCamera360(x, y) {
  return {
    type: _constants.UPDATE_ROTATING_CAMERA360,
    x: x, y: y
  };
}

function endRotatingCamera360(x, y) {
  return {
    type: _constants.END_ROTATING_CAMERA360,
    x: x, y: y
  };
}
function beginResizingCamera360(layerID, camera360ID, x, y, side) {
  return {
    type: _constants.BEGIN_RESIZING_CAMERA360,
    layerID: layerID, camera360ID: camera360ID, x: x, y: y, side: side
  };
}

function updateResizingCamera360(x, y) {
  return {
    type: _constants.UPDATE_RESIZING_CAMERA360,
    x: x, y: y
  };
}

function endResizingCamera360(x, y) {
  return {
    type: _constants.END_RESIZING_CAMERA360,
    x: x, y: y
  };
}