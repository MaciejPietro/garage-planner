'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_CAMERA:
      return _export.Camera.select(state, action.layerID, action.cameraID).updatedState;

    case _constants.SELECT_TOOL_DRAWING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.selectToolDrawingCamera(state, action.sceneComponentType).updatedState;

    case _constants.UPDATE_DRAWING_CAMERA:
      return _export.Camera.updateDrawingCamera(state, action.layerID, action.x, action.y).updatedState;

    case _constants.END_DRAWING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.endDrawingCamera(state, action.layerID, action.x, action.y).updatedState;

    case _constants.BEGIN_DRAGGING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.beginDraggingCamera(state, action.layerID, action.cameraID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAGGING_CAMERA:
      return _export.Camera.updateDraggingCamera(state, action.x, action.y).updatedState;

    case _constants.END_DRAGGING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.endDraggingCamera(state, action.x, action.y).updatedState;

    case _constants.BEGIN_ROTATING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.beginRotatingCamera(state, action.layerID, action.cameraID, action.x, action.y).updatedState;

    case _constants.UPDATE_ROTATING_CAMERA:
      return _export.Camera.updateRotatingCamera(state, action.x, action.y).updatedState;

    case _constants.END_ROTATING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.endRotatingCamera(state, action.x, action.y).updatedState;

    case _constants.BEGIN_RESIZING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.beginResizingCamera(state, action.layerID, action.cameraID, action.x, action.y, action.side).updatedState;

    case _constants.UPDATE_RESIZING_CAMERA:
      return _export.Camera.updateResizingCamera(state, action.x, action.y).updatedState;

    case _constants.END_RESIZING_CAMERA:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera.endResizingCamera(state, action.x, action.y).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');