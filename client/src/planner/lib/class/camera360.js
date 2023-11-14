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

var Camera360 = function () {
  function Camera360() {
    _classCallCheck(this, Camera360);
  }

  _createClass(Camera360, null, [{
    key: 'create',
    value: function create(state, layerID, type, x, y, rotation) {
      var camera360ID = _export2.IDBroker.acquireID();
      console.log('camera360-create');
      var camera360 = state.catalog.factoryElement(type, {
        id: camera360ID,
        name: _export2.NameGenerator.generateName('cameras360', state.catalog.getIn(['elements', type, 'info', 'title'])),
        type: type,
        x: x,
        y: y,
        rotation: rotation
      });

      state = state.setIn(['scene', 'layers', layerID, 'cameras360', camera360ID], camera360);

      return { updatedState: state, camera360: camera360 };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, camera360ID) {
      state = _export.Layer.select(state, layerID).updatedState;
      state = _export.Layer.selectElement(state, layerID, 'cameras360', camera360ID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, camera360ID) {
      state = this.unselect(state, layerID, camera360ID).updatedState;
      state = _export.Layer.removeElement(state, layerID, 'cameras360', camera360ID).updatedState;

      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = _export.Group.removeElement(state, group.id, layerID, 'cameras360', camera360ID).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, camera360ID) {
      state = _export.Layer.unselect(state, layerID, 'cameras360', camera360ID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'selectToolDrawingCamera360',
    value: function selectToolDrawingCamera360(state, sceneComponentType) {
      state = state.merge({
        mode: _constants.MODE_DRAWING_CAMERA360,
        drawingSupport: new _immutable.Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingCamera360',
    value: function updateDrawingCamera360(state, layerID, x, y) {
      console.log(state, layerID, x, y);
      if (state.hasIn(['drawingSupport', 'currentID'])) {
        state = state.updateIn(['scene', 'layers', layerID, 'cameras360', state.getIn(['drawingSupport', 'currentID'])], function (camera360) {
          return camera360.merge({ x: x, y: y });
        });
      } else {
        var _create = this.create(state, layerID, state.getIn(['drawingSupport', 'type']), x, y, 0),
            stateI = _create.updatedState,
            camera360 = _create.camera360;

        state = Camera360.select(stateI, layerID, camera360.id).updatedState;
        state = state.setIn(['drawingSupport', 'currentID'], camera360.id);
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingCamera360',
    value: function endDrawingCamera360(state, layerID, x, y) {
      console.log('endDrawingCamera360');
      var catalog = state.catalog;
      state = this.updateDrawingCamera360(state, layerID, x, y, catalog).updatedState;
      state = _export.Layer.unselectAll(state, layerID).updatedState;
      state = state.merge({
        drawingSupport: (0, _immutable.Map)({
          type: state.drawingSupport.get('type')
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingCamera360',
    value: function beginDraggingCamera360(state, layerID, camera360ID, x, y) {
      var camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

      state = state.merge({
        mode: _constants.MODE_DRAGGING_CAMERA360,
        draggingSupport: (0, _immutable.Map)({
          layerID: layerID,
          camera360ID: camera360ID,
          startPointX: x,
          startPointY: y,
          originalX: camera360.x,
          originalY: camera360.y
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingCamera360',
    value: function updateDraggingCamera360(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport,
          scene = _state.scene;


      var layerID = draggingSupport.get('layerID');
      var camera360ID = draggingSupport.get('camera360ID');
      var startPointX = draggingSupport.get('startPointX');
      var startPointY = draggingSupport.get('startPointY');
      var originalX = draggingSupport.get('originalX');
      var originalY = draggingSupport.get('originalY');

      var diffX = startPointX - x;
      var diffY = startPointY - y;

      var camera360 = scene.getIn(['layers', layerID, 'cameras360', camera360ID]);
      camera360 = camera360.merge({
        x: originalX - diffX,
        y: originalY - diffY
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingCamera360',
    value: function endDraggingCamera360(state, x, y) {
      state = this.updateDraggingCamera360(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginRotatingCamera360',
    value: function beginRotatingCamera360(state, layerID, camera360ID, x, y) {
      state = state.merge({
        mode: _constants.MODE_ROTATING_CAMERA360,
        rotatingSupport: (0, _immutable.Map)({
          layerID: layerID,
          camera360ID: camera360ID
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateRotatingCamera360',
    value: function updateRotatingCamera360(state, x, y) {
      var _state2 = state,
          rotatingSupport = _state2.rotatingSupport,
          scene = _state2.scene;


      var layerID = rotatingSupport.get('layerID');
      var camera360ID = rotatingSupport.get('camera360ID');
      var camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

      var deltaX = x - camera360.x;
      var deltaY = y - camera360.y;
      var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

      if (-5 < rotation && rotation < 5) rotation = 0;
      if (-95 < rotation && rotation < -85) rotation = -90;
      if (-185 < rotation && rotation < -175) rotation = -180;
      if (85 < rotation && rotation < 90) rotation = 90;
      if (-270 < rotation && rotation < -265) rotation = 90;

      console.log(rotation);
      camera360 = camera360.merge({
        rotation: rotation
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endRotatingCamera360',
    value: function endRotatingCamera360(state, x, y) {
      state = this.updateRotatingCamera360(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginResizingCamera360',
    value: function beginResizingCamera360(state, layerID, camera360ID, x, y, side) {
      var camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

      var properties = camera360.get('properties');

      var currentWidth = properties.getIn(['width', 'length']);
      var currentDepth = properties.getIn(['depth', 'length']);

      state = state.merge({
        mode: _constants.MODE_RESIZING_CAMERA360,
        resizingSupport: (0, _immutable.Map)({
          layerID: layerID,
          camera360ID: camera360ID,
          side: side,
          startPointX: x,
          startPointY: y,
          originalX: camera360.x,
          originalY: camera360.y,
          originalWidth: currentWidth,
          originalDepth: currentDepth
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateResizingCamera360',
    value: function updateResizingCamera360(state, x, y) {
      var _state3 = state,
          resizingSupport = _state3.resizingSupport,
          scene = _state3.scene;


      var layerID = resizingSupport.get('layerID');
      var camera360ID = resizingSupport.get('camera360ID');
      var side = resizingSupport.get('side');
      var camera360 = state.getIn(['scene', 'layers', layerID, 'cameras360', camera360ID]);

      var startPointX = resizingSupport.get('startPointX');
      var startPointY = resizingSupport.get('startPointY');
      var originalX = resizingSupport.get('originalX');
      var originalY = resizingSupport.get('originalY');
      var originalWidth = resizingSupport.get('originalWidth');
      var originalDepth = resizingSupport.get('originalDepth');

      var properties = camera360.get('properties');
      var rotation = camera360.get('rotation');

      var propertyName = 'width';
      var camera360NewLength = 0;
      var minLength = 20;

      var testX = 0;

      var sideAngle = rotation;
      if (side === 'left' || side === 'right') sideAngle -= 90;

      var mousePositionToSide = (0, _geometry.calculatePointFromLineWithAngleAndPoint)(startPointX, startPointY, sideAngle, x, y);

      var mousePositionToCamera360Center = (0, _geometry.calculatePointFromLineWithAngleAndPoint)(originalX, originalY, sideAngle, x, y);

      var rel = mousePositionToSide.relation * mousePositionToCamera360Center.relation;

      if (mousePositionToSide.relation == -1 && mousePositionToCamera360Center.relation == -1 && (side == 'right' || side == 'top')) {
        rel = -1;
      } else if (mousePositionToSide.relation == 1 && mousePositionToCamera360Center.relation == 1 && (side == 'left' || side == 'bottom')) {
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
        scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360)
      });

      if (side == 'top') {
        var deltaX2 = x - camera360.x;
        var deltaY2 = y - camera360.y;
        var rotate = Math.atan2(deltaY2, deltaX2) * 180 / Math.PI - 90;

        if (-5 < rotate && rotate < 5) rotate = 0;
        if (-95 < rotate && rotate < -85) rotate = -90;
        if (-185 < rotate && rotate < -175) rotate = -180;
        if (85 < rotate && rotate < 90) rotate = 90;
        if (-270 < rotate && rotate < -265) rotate = 90;

        camera360 = camera360.merge({
          rotation: rotate
        });
      }

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'cameras360', camera360ID], camera360)
      });

      return {
        updatedState: this.setProperties(state, layerID, camera360ID, properties).updatedState
      };
    }
  }, {
    key: 'endResizingCamera360',
    value: function endResizingCamera360(state, x, y) {
      state = this.updateResizingCamera360(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, camera360ID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'cameras360', camera360ID, 'properties'], properties);

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, camera360ID, properties) {
      return this.setProperties(state, layerID, camera360ID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, camera360ID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'cameras360', camera360ID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'cameras360', camera360ID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, camera360ID, properties) {
      return this.updateProperties(state, layerID, camera360ID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, camera360ID, camera360Attributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'cameras360', camera360ID], camera360Attributes);
      return { updatedState: state };
    }
  }, {
    key: 'setJsAttributes',
    value: function setJsAttributes(state, layerID, camera360ID, camera360Attributes) {
      camera360Attributes = (0, _immutable.fromJS)(camera360Attributes);
      return this.setAttributes(state, layerID, camera360ID, camera360Attributes);
    }
  }]);

  return Camera360;
}();

exports.default = Camera360;