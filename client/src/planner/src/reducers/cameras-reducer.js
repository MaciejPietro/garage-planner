import { Camera } from '../class/export';
import { history } from '../utils/export';
import {
  SELECT_TOOL_DRAWING_CAMERA,
  UPDATE_DRAWING_CAMERA,
  END_DRAWING_CAMERA,
  BEGIN_DRAGGING_CAMERA,
  UPDATE_DRAGGING_CAMERA,
  END_DRAGGING_CAMERA,
  BEGIN_ROTATING_CAMERA,
  UPDATE_ROTATING_CAMERA,
  END_ROTATING_CAMERA,
  BEGIN_RESIZING_CAMERA,
  UPDATE_RESIZING_CAMERA,
  END_RESIZING_CAMERA,
  SELECT_CAMERA
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_CAMERA:
      return Camera.select(state, action.layerID, action.cameraID).updatedState;

    case SELECT_TOOL_DRAWING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.selectToolDrawingCamera(state, action.sceneComponentType).updatedState;

    case UPDATE_DRAWING_CAMERA:
      return Camera.updateDrawingCamera(state, action.layerID, action.x, action.y).updatedState;

    case END_DRAWING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.endDrawingCamera(state, action.layerID, action.x, action.y).updatedState;

    case BEGIN_DRAGGING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.beginDraggingCamera(state, action.layerID, action.cameraID, action.x, action.y).updatedState;

    case UPDATE_DRAGGING_CAMERA:
      return Camera.updateDraggingCamera(state, action.x, action.y).updatedState;

    case END_DRAGGING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.endDraggingCamera(state, action.x, action.y).updatedState;

    case BEGIN_ROTATING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.beginRotatingCamera(state, action.layerID, action.cameraID, action.x, action.y).updatedState;

    case UPDATE_ROTATING_CAMERA:
      return Camera.updateRotatingCamera(state, action.x, action.y).updatedState;

    case END_ROTATING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.endRotatingCamera(state, action.x, action.y).updatedState;

    case BEGIN_RESIZING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.beginResizingCamera(state, action.layerID, action.cameraID, action.x, action.y, action.side).updatedState;

    case UPDATE_RESIZING_CAMERA:
      return Camera.updateResizingCamera(state, action.x, action.y).updatedState;

    case END_RESIZING_CAMERA:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera.endResizingCamera(state, action.x, action.y).updatedState;

    default:
      return state;
  }
}
