'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_CAMERA360:
      return _export.Camera360.select(state, action.layerID, action.camera360ID).updatedState;

    case _constants.SELECT_TOOL_DRAWING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.selectToolDrawingCamera360(state, action.sceneComponentType).updatedState;

    case _constants.UPDATE_DRAWING_CAMERA360:
      return _export.Camera360.updateDrawingCamera360(state, action.layerID, action.x, action.y).updatedState;

    case _constants.END_DRAWING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.endDrawingCamera360(state, action.layerID, action.x, action.y).updatedState;

    case _constants.BEGIN_DRAGGING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.beginDraggingCamera360(state, action.layerID, action.camera360ID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAGGING_CAMERA360:
      return _export.Camera360.updateDraggingCamera360(state, action.x, action.y).updatedState;

    case _constants.END_DRAGGING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.endDraggingCamera360(state, action.x, action.y).updatedState;

    case _constants.BEGIN_ROTATING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.beginRotatingCamera360(state, action.layerID, action.camera360ID, action.x, action.y).updatedState;

    case _constants.UPDATE_ROTATING_CAMERA360:
      return _export.Camera360.updateRotatingCamera360(state, action.x, action.y).updatedState;

    case _constants.END_ROTATING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.endRotatingCamera360(state, action.x, action.y).updatedState;

    case _constants.BEGIN_RESIZING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.beginResizingCamera360(state, action.layerID, action.camera360ID, action.x, action.y, action.side).updatedState;

    case _constants.UPDATE_RESIZING_CAMERA360:
      return _export.Camera360.updateResizingCamera360(state, action.x, action.y).updatedState;

    case _constants.END_RESIZING_CAMERA360:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Camera360.endResizingCamera360(state, action.x, action.y).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');