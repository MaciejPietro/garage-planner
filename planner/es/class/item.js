var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Layer, Group } from './export';
import { IDBroker, NameGenerator } from '../utils/export';
import { Map, fromJS } from 'immutable';

import { MODE_IDLE, MODE_DRAWING_ITEM, MODE_DRAGGING_ITEM, MODE_ROTATING_ITEM, MODE_RESIZING_ITEM } from '../constants';

import { calculatePointFromLineWithAngleAndPoint, angleBetweenTwoPoints } from '../utils/geometry';

function DegreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

var Item = function () {
    function Item() {
        _classCallCheck(this, Item);
    }

    _createClass(Item, null, [{
        key: 'create',
        value: function create(state, layerID, type, x, y, rotation) {
            var itemID = IDBroker.acquireID();

            var item = state.catalog.factoryElement(type, {
                id: itemID,
                name: NameGenerator.generateName('items', state.catalog.getIn(['elements', type, 'info', 'title'])),
                type: type,
                x: x,
                y: y,
                rotation: rotation
            });

            state = state.setIn(['scene', 'layers', layerID, 'items', itemID], item);

            return { updatedState: state, item: item };
        }
    }, {
        key: 'select',
        value: function select(state, layerID, itemID) {
            state = Layer.select(state, layerID).updatedState;
            state = Layer.selectElement(state, layerID, 'items', itemID).updatedState;

            return { updatedState: state };
        }
    }, {
        key: 'remove',
        value: function remove(state, layerID, itemID) {
            state = this.unselect(state, layerID, itemID).updatedState;
            state = Layer.removeElement(state, layerID, 'items', itemID).updatedState;

            state.getIn(['scene', 'groups']).forEach(function (group) {
                return state = Group.removeElement(state, group.id, layerID, 'items', itemID).updatedState;
            });

            return { updatedState: state };
        }
    }, {
        key: 'unselect',
        value: function unselect(state, layerID, itemID) {
            state = Layer.unselect(state, layerID, 'items', itemID).updatedState;

            return { updatedState: state };
        }
    }, {
        key: 'selectToolDrawingItem',
        value: function selectToolDrawingItem(state, sceneComponentType) {
            state = state.merge({
                mode: MODE_DRAWING_ITEM,
                drawingSupport: new Map({
                    type: sceneComponentType
                })
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateDrawingItem',
        value: function updateDrawingItem(state, layerID, x, y) {
            if (state.hasIn(['drawingSupport', 'currentID'])) {
                // console.log('item.updateDrawingItem1');
                state = state.updateIn(['scene', 'layers', layerID, 'items', state.getIn(['drawingSupport', 'currentID'])], function (item) {
                    return item.merge({ x: x, y: y });
                });
            } else {
                // console.log('item.updateDrawingItem2');
                var _create = this.create(state, layerID, state.getIn(['drawingSupport', 'type']), x, y, 0),
                    stateI = _create.updatedState,
                    item = _create.item;

                state = Item.select(stateI, layerID, item.id).updatedState;
                state = state.setIn(['drawingSupport', 'currentID'], item.id);
            }

            return { updatedState: state };
        }
    }, {
        key: 'endDrawingItem',
        value: function endDrawingItem(state, layerID, x, y) {
            var catalog = state.catalog;
            state = this.updateDrawingItem(state, layerID, x, y, catalog).updatedState;
            state = Layer.unselectAll(state, layerID).updatedState;
            state = state.merge({
                drawingSupport: Map({
                    type: state.drawingSupport.get('type')
                })
            });

            return { updatedState: state };
        }
    }, {
        key: 'beginDraggingItem',
        value: function beginDraggingItem(state, layerID, itemID, x, y) {
            var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

            state = state.merge({
                mode: MODE_DRAGGING_ITEM,
                draggingSupport: Map({
                    layerID: layerID,
                    itemID: itemID,
                    startPointX: x,
                    startPointY: y,
                    originalX: item.x,
                    originalY: item.y
                })
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateDraggingItem',
        value: function updateDraggingItem(state, x, y) {
            var _state = state,
                draggingSupport = _state.draggingSupport,
                scene = _state.scene;


            var layerID = draggingSupport.get('layerID');
            var itemID = draggingSupport.get('itemID');
            var startPointX = draggingSupport.get('startPointX');
            var startPointY = draggingSupport.get('startPointY');
            var originalX = draggingSupport.get('originalX');
            var originalY = draggingSupport.get('originalY');

            var diffX = startPointX - x;
            var diffY = startPointY - y;

            var item = scene.getIn(['layers', layerID, 'items', itemID]);
            item = item.merge({
                x: originalX - diffX,
                y: originalY - diffY
            });

            state = state.merge({
                scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
            });

            return { updatedState: state };
        }
    }, {
        key: 'endDraggingItem',
        value: function endDraggingItem(state, x, y) {
            state = this.updateDraggingItem(state, x, y).updatedState;
            state = state.merge({ mode: MODE_IDLE });

            return { updatedState: state };
        }
    }, {
        key: 'beginRotatingItem',
        value: function beginRotatingItem(state, layerID, itemID, x, y) {
            state = state.merge({
                mode: MODE_ROTATING_ITEM,
                rotatingSupport: Map({
                    layerID: layerID,
                    itemID: itemID
                })
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateRotatingItem',
        value: function updateRotatingItem(state, x, y) {
            var _state2 = state,
                rotatingSupport = _state2.rotatingSupport,
                scene = _state2.scene;


            var layerID = rotatingSupport.get('layerID');
            var itemID = rotatingSupport.get('itemID');
            var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

            var deltaX = x - item.x;
            var deltaY = y - item.y;
            var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

            if (-5 < rotation && rotation < 5) rotation = 0;
            if (-95 < rotation && rotation < -85) rotation = -90;
            if (-185 < rotation && rotation < -175) rotation = -180;
            if (85 < rotation && rotation < 90) rotation = 90;
            if (-270 < rotation && rotation < -265) rotation = 90;

            item = item.merge({
                rotation: rotation
            });

            state = state.merge({
                scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
            });

            return { updatedState: state };
        }
    }, {
        key: 'endRotatingItem',
        value: function endRotatingItem(state, x, y) {
            state = this.updateRotatingItem(state, x, y).updatedState;
            state = state.merge({ mode: MODE_IDLE });

            return { updatedState: state };
        }
    }, {
        key: 'beginResizingItem',
        value: function beginResizingItem(state, layerID, itemID, x, y, side) {
            var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

            var properties = item.get('properties');

            var currentWidth = properties.getIn(['width', 'length']);
            var currentDepth = properties.getIn(['depth', 'length']);

            state = state.merge({
                mode: MODE_RESIZING_ITEM,
                resizingSupport: Map({
                    layerID: layerID,
                    itemID: itemID,
                    side: side,
                    startPointX: x,
                    startPointY: y,
                    originalX: item.x,
                    originalY: item.y,
                    originalWidth: currentWidth,
                    originalDepth: currentDepth
                })
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateResizingItem',
        value: function updateResizingItem(state, x, y) {
            var _state3 = state,
                resizingSupport = _state3.resizingSupport,
                scene = _state3.scene;


            var layerID = resizingSupport.get('layerID');
            var itemID = resizingSupport.get('itemID');
            var side = resizingSupport.get('side');
            var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

            var startPointX = resizingSupport.get('startPointX');
            var startPointY = resizingSupport.get('startPointY');
            var originalX = resizingSupport.get('originalX');
            var originalY = resizingSupport.get('originalY');
            var originalWidth = resizingSupport.get('originalWidth');
            var originalDepth = resizingSupport.get('originalDepth');

            var properties = item.get('properties');
            var rotation = item.get('rotation');

            var propertyName = 'width';
            var itemNewLength = 0;
            var minLength = 20;

            var sideAngle = rotation;
            if (side === 'left' || side === 'right') sideAngle -= 90;

            var mousePositionToSide = calculatePointFromLineWithAngleAndPoint(startPointX, startPointY, sideAngle, x, y);

            var mousePositionToItemCenter = calculatePointFromLineWithAngleAndPoint(originalX, originalY, sideAngle, x, y);

            var rel = mousePositionToSide.relation * mousePositionToItemCenter.relation;
            // rel = -1;
            var order = side == 'right' || side == 'bottom' ? -1 : 1;
            if (mousePositionToSide.relation == -1 && mousePositionToItemCenter.relation == -1 && (side == 'right' || side == 'top')) {
                rel = -1;
            } else if (mousePositionToSide.relation == 1 && mousePositionToItemCenter.relation == 1 && (side == 'left' || side == 'bottom')) {
                rel = -1;
            }

            var newWidth = originalWidth + mousePositionToSide.distance * rel;

            if (newWidth < minLength) newWidth = minLength;

            var newDepth = originalDepth + mousePositionToSide.distance * rel;
            if (newDepth < minLength) newDepth = minLength;

            var moveDirection = 0;

            switch (side) {
                case 'left':
                case 'right':
                    propertyName = 'width';
                    itemNewLength = newWidth;
                    moveDirection = 1;
                    break;

                case 'top':
                case 'bottom':
                    propertyName = 'depth';
                    itemNewLength = newDepth;
                    moveDirection = 0;
                    break;
            }

            var trueRotation = moveDirection == 1 ? rotation : rotation - 90;

            var moveX = Math.cos(DegreesToRadians(trueRotation)) * mousePositionToSide.distance * rel * order / 2;
            var moveY = Math.sin(DegreesToRadians(trueRotation)) * mousePositionToSide.distance * rel * order / 2;

            item = item.merge({
                x: originalX - moveX,
                y: originalY - moveY
            });

            properties = properties.setIn([propertyName, 'length'], itemNewLength);
            this.setProperties(state, layerID, itemID, properties);

            state = state.merge({
                scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
            });

            return {
                updatedState: this.setProperties(state, layerID, itemID, properties).updatedState
            };
        }
    }, {
        key: 'endResizingItem',
        value: function endResizingItem(state, x, y) {
            state = this.updateResizingItem(state, x, y).updatedState;
            state = state.merge({ mode: MODE_IDLE });

            return { updatedState: state };
        }
    }, {
        key: 'setProperties',
        value: function setProperties(state, layerID, itemID, properties) {
            // console.log('setProperties', properties);
            state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties'], properties);

            return { updatedState: state };
        }
    }, {
        key: 'setJsProperties',
        value: function setJsProperties(state, layerID, itemID, properties) {
            return this.setProperties(state, layerID, itemID, fromJS(properties));
        }
    }, {
        key: 'updateProperties',
        value: function updateProperties(state, layerID, itemID, properties) {
            properties.forEach(function (v, k) {
                if (state.hasIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k], v);
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateJsProperties',
        value: function updateJsProperties(state, layerID, itemID, properties) {
            return this.updateProperties(state, layerID, itemID, fromJS(properties));
        }
    }, {
        key: 'setAttributes',
        value: function setAttributes(state, layerID, itemID, itemAttributes) {
            state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID], itemAttributes);
            return { updatedState: state };
        }
    }, {
        key: 'setJsAttributes',
        value: function setJsAttributes(state, layerID, itemID, itemAttributes) {
            itemAttributes = fromJS(itemAttributes);
            return this.setAttributes(state, layerID, itemID, itemAttributes);
        }
    }]);

    return Item;
}();

export { Item as default };