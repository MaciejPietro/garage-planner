import { Camera360 } from '../class/export';
import { history } from '../utils/export';
import {
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
  END_RESIZING_CAMERA360,
  SELECT_CAMERA360
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_CAMERA360:
      return Camera360.select(state, action.layerID, action.camera360ID).updatedState;

    case SELECT_TOOL_DRAWING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.selectToolDrawingCamera360(state, action.sceneComponentType).updatedState;

    case UPDATE_DRAWING_CAMERA360:
      return Camera360.updateDrawingCamera360(state, action.layerID, action.x, action.y).updatedState;

    case END_DRAWING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.endDrawingCamera360(state, action.layerID, action.x, action.y).updatedState;

    case BEGIN_DRAGGING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.beginDraggingCamera360(state, action.layerID, action.camera360ID, action.x, action.y).updatedState;

    case UPDATE_DRAGGING_CAMERA360:
      return Camera360.updateDraggingCamera360(state, action.x, action.y).updatedState;

    case END_DRAGGING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.endDraggingCamera360(state, action.x, action.y).updatedState;

    case BEGIN_ROTATING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.beginRotatingCamera360(state, action.layerID, action.camera360ID, action.x, action.y).updatedState;

    case UPDATE_ROTATING_CAMERA360:
      return Camera360.updateRotatingCamera360(state, action.x, action.y).updatedState;

    case END_ROTATING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.endRotatingCamera360(state, action.x, action.y).updatedState;

    case BEGIN_RESIZING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.beginResizingCamera360(state, action.layerID, action.camera360ID, action.x, action.y, action.side).updatedState;

    case UPDATE_RESIZING_CAMERA360:
      return Camera360.updateResizingCamera360(state, action.x, action.y).updatedState;

    case END_RESIZING_CAMERA360:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Camera360.endResizingCamera360(state, action.x, action.y).updatedState;

    default:
      return state;
  }
}
