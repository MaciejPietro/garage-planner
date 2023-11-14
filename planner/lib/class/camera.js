'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _export = require('./export');

var _export2 = require('../utils/export');

var _immutable = require('immutable');

var _constants = require('../constants');

var _geometry = require('../utils/geometry');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    _classCallCheck(this, Camera);
  }

  _createClass(Camera, null, [{
    key: 'create',
    value: function create(state, layerID, type, x, y, rotation) {
      var cameraID = _export2.IDBroker.acquireID();
      console.log('camera-create');
      var camera = state.catalog.factoryElement(type, {
        id: cameraID,
        name: _export2.NameGenerator.generateName('cameras', state.catalog.getIn(['elements', type, 'info', 'title'])),
        type: type,
        x: x,
        y: y,
        rotation: rotation
      });

      state = state.setIn(['scene', 'layers', layerID, 'cameras', cameraID], camera);

      return { updatedState: state, camera: camera };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, cameraID) {
      state = _export.Layer.select(state, layerID).updatedState;
      state = _export.Layer.selectElement(state, layerID, 'cameras', cameraID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, cameraID) {
      state = this.unselect(state, layerID, cameraID).updatedState;
      state = _export.Layer.removeElement(state, layerID, 'cameras', cameraID).updatedState;

      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = _export.Group.removeElement(state, group.id, layerID, 'cameras', cameraID).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, cameraID) {
      state = _export.Layer.unselect(state, layerID, 'cameras', cameraID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'selectToolDrawingCamera',
    value: function selectToolDrawingCamera(state, sceneComponentType) {
      state = state.merge({
        mode: _constants.MODE_DRAWING_CAMERA,
        drawingSupport: new _immutable.Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingCamera',
    value: function updateDrawingCamera(state, layerID, x, y) {
      console.log(state, layerID, x, y);
      if (state.hasIn(['drawingSupport', 'currentID'])) {
        state = state.updateIn(['scene', 'layers', layerID, 'cameras', state.getIn(['drawingSupport', 'currentID'])], function (camera) {
          return camera.merge({ x: x, y: y });
        });
      } else {
        var _create = this.create(state, layerID, state.getIn(['drawingSupport', 'type']), x, y, 0),
            stateI = _create.updatedState,
            camera = _create.camera;

        state = Camera.select(stateI, layerID, camera.id).updatedState;
        state = state.setIn(['drawingSupport', 'currentID'], camera.id);
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingCamera',
    value: function endDrawingCamera(state, layerID, x, y) {
      console.log('endDrawingCamera');
      var catalog = state.catalog;
      state = this.updateDrawingCamera(state, layerID, x, y, catalog).updatedState;
      state = _export.Layer.unselectAll(state, layerID).updatedState;
      state = state.merge({
        drawingSupport: (0, _immutable.Map)({
          type: state.drawingSupport.get('type')
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingCamera',
    value: function beginDraggingCamera(state, layerID, cameraID, x, y) {
      var camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

      state = state.merge({
        mode: _constants.MODE_DRAGGING_CAMERA,
        draggingSupport: (0, _immutable.Map)({
          layerID: layerID,
          cameraID: cameraID,
          startPointX: x,
          startPointY: y,
          originalX: camera.x,
          originalY: camera.y
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingCamera',
    value: function updateDraggingCamera(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport,
          scene = _state.scene;


      var layerID = draggingSupport.get('layerID');
      var cameraID = draggingSupport.get('cameraID');
      var startPointX = draggingSupport.get('startPointX');
      var startPointY = draggingSupport.get('startPointY');
      var originalX = draggingSupport.get('originalX');
      var originalY = draggingSupport.get('originalY');

      var diffX = startPointX - x;
      var diffY = startPointY - y;

      var camera = scene.getIn(['layers', layerID, 'cameras', cameraID]);
      camera = camera.merge({
        x: originalX - diffX,
        y: originalY - diffY
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingCamera',
    value: function endDraggingCamera(state, x, y) {
      state = this.updateDraggingCamera(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginRotatingCamera',
    value: function beginRotatingCamera(state, layerID, cameraID, x, y) {
      state = state.merge({
        mode: _constants.MODE_ROTATING_CAMERA,
        rotatingSupport: (0, _immutable.Map)({
          layerID: layerID,
          cameraID: cameraID
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateRotatingCamera',
    value: function updateRotatingCamera(state, x, y) {
      var _state2 = state,
          rotatingSupport = _state2.rotatingSupport,
          scene = _state2.scene;


      var layerID = rotatingSupport.get('layerID');
      var cameraID = rotatingSupport.get('cameraID');
      var camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

      var deltaX = x - camera.x;
      var deltaY = y - camera.y;
      var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

      if (-5 < rotation && rotation < 5) rotation = 0;
      if (-95 < rotation && rotation < -85) rotation = -90;
      if (-185 < rotation && rotation < -175) rotation = -180;
      if (85 < rotation && rotation < 90) rotation = 90;
      if (-270 < rotation && rotation < -265) rotation = 90;

      console.log(rotation);
      camera = camera.merge({
        rotation: rotation
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endRotatingCamera',
    value: function endRotatingCamera(state, x, y) {
      state = this.updateRotatingCamera(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginResizingCamera',
    value: function beginResizingCamera(state, layerID, cameraID, x, y, side) {
      var camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

      var properties = camera.get('properties');

      var currentWidth = properties.getIn(['width', 'length']);
      var currentDepth = properties.getIn(['depth', 'length']);

      state = state.merge({
        mode: _constants.MODE_RESIZING_CAMERA,
        resizingSupport: (0, _immutable.Map)({
          layerID: layerID,
          cameraID: cameraID,
          side: side,
          startPointX: x,
          startPointY: y,
          originalX: camera.x,
          originalY: camera.y,
          originalWidth: currentWidth,
          originalDepth: currentDepth
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateResizingCamera',
    value: function updateResizingCamera(state, x, y) {
      var _state3 = state,
          resizingSupport = _state3.resizingSupport,
          scene = _state3.scene;


      var layerID = resizingSupport.get('layerID');
      var cameraID = resizingSupport.get('cameraID');
      var side = resizingSupport.get('side');
      var camera = state.getIn(['scene', 'layers', layerID, 'cameras', cameraID]);

      var startPointX = resizingSupport.get('startPointX');
      var startPointY = resizingSupport.get('startPointY');
      var originalX = resizingSupport.get('originalX');
      var originalY = resizingSupport.get('originalY');
      var originalWidth = resizingSupport.get('originalWidth');
      var originalDepth = resizingSupport.get('originalDepth');

      var properties = camera.get('properties');
      var rotation = camera.get('rotation');

      var propertyName = 'width';
      var cameraNewLength = 0;
      var minLength = 20;

      var testX = 0;

      var sideAngle = rotation;
      if (side === 'left' || side === 'right') sideAngle -= 90;

      var mousePositionToSide = (0, _geometry.calculatePointFromLineWithAngleAndPoint)(startPointX, startPointY, sideAngle, x, y);

      var mousePositionToCameraCenter = (0, _geometry.calculatePointFromLineWithAngleAndPoint)(originalX, originalY, sideAngle, x, y);

      var rel = mousePositionToSide.relation * mousePositionToCameraCenter.relation;
      // rel = -1;
      var order = side == 'right' || side == 'bottom' ? -1 : 1;
      if (mousePositionToSide.relation == -1 && mousePositionToCameraCenter.relation == -1 && (side == 'right' || side == 'top')) {
        rel = -1;
      } else if (mousePositionToSide.relation == 1 && mousePositionToCameraCenter.relation == 1 && (side == 'left' || side == 'bottom')) {
        rel = -1;
      }

      var newWidth = originalWidth + mousePositionToSide.distance * 2 * rel;

      if (newWidth < minLength) newWidth = minLength;

      var newDepth = originalDepth + mousePositionToSide.distance * 2 * rel;
      if (newDepth < minLength) newDepth = minLength;

      var newPosX = originalX - x;
      var newPosY = originalY - y;
      var distance = Math.sqrt(newPosX * newPosX + newPosY * newPosY);

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
        scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera)
      });

      if (side == 'top') {
        var deltaX2 = x - camera.x;
        var deltaY2 = y - camera.y;
        var rotate = Math.atan2(deltaY2, deltaX2) * 180 / Math.PI - 90;

        if (-5 < rotate && rotate < 5) rotate = 0;
        if (-95 < rotate && rotate < -85) rotate = -90;
        if (-185 < rotate && rotate < -175) rotate = -180;
        if (85 < rotate && rotate < 90) rotate = 90;
        if (-270 < rotate && rotate < -265) rotate = 90;

        camera = camera.merge({
          rotation: rotate
        });
      }

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras', cameraID], camera)
      });

      return {
        updatedState: this.setProperties(state, layerID, cameraID, properties).updatedState
      };
    }
  }, {
    key: 'endResizingCamera',
    value: function endResizingCamera(state, x, y) {
      state = this.updateResizingCamera(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, cameraID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'cameras', cameraID, 'properties'], properties);

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, cameraID, properties) {
      return this.setProperties(state, layerID, cameraID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, cameraID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'cameras', cameraID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'cameras', cameraID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, cameraID, properties) {
      return this.updateProperties(state, layerID, cameraID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, cameraID, cameraAttributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'cameras', cameraID], cameraAttributes);
      return { updatedState: state };
    }
  }, {
    key: 'setJsAttributes',
    value: function setJsAttributes(state, layerID, cameraID, cameraAttributes) {
      cameraAttributes = (0, _immutable.fromJS)(cameraAttributes);
      return this.setAttributes(state, layerID, cameraID, cameraAttributes);
    }
  }]);

  return Camera;
}();

exports.default = Camera;