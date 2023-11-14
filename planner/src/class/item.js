import { Layer, Group } from './export';
import { IDBroker, NameGenerator } from '../utils/export';
import { Map, fromJS } from 'immutable';

import {
    MODE_IDLE,
    MODE_DRAWING_ITEM,
    MODE_DRAGGING_ITEM,
    MODE_ROTATING_ITEM,
    MODE_RESIZING_ITEM,
} from '../constants';

import {
    calculatePointFromLineWithAngleAndPoint,
    angleBetweenTwoPoints,
} from '../utils/geometry';

function DegreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

class Item {
    static create(state, layerID, type, x, y, rotation) {
        let itemID = IDBroker.acquireID();

        let item = state.catalog.factoryElement(type, {
            id: itemID,
            name: NameGenerator.generateName(
                'items',
                state.catalog.getIn(['elements', type, 'info', 'title'])
            ),
            type,
            x,
            y,
            rotation,
        });

        state = state.setIn(['scene', 'layers', layerID, 'items', itemID], item);

        return { updatedState: state, item };
    }

    static select(state, layerID, itemID) {
        state = Layer.select(state, layerID).updatedState;
        state = Layer.selectElement(state, layerID, 'items', itemID).updatedState;

        return { updatedState: state };
    }

    static remove(state, layerID, itemID) {
        state = this.unselect(state, layerID, itemID).updatedState;
        state = Layer.removeElement(state, layerID, 'items', itemID).updatedState;

        state
            .getIn(['scene', 'groups'])
            .forEach(
                (group) =>
                    (state = Group.removeElement(
                        state,
                        group.id,
                        layerID,
                        'items',
                        itemID
                    ).updatedState)
            );

        return { updatedState: state };
    }

    static unselect(state, layerID, itemID) {
        state = Layer.unselect(state, layerID, 'items', itemID).updatedState;

        return { updatedState: state };
    }

    static selectToolDrawingItem(state, sceneComponentType) {
        state = state.merge({
            mode: MODE_DRAWING_ITEM,
            drawingSupport: new Map({
                type: sceneComponentType,
            }),
        });

        return { updatedState: state };
    }

    static updateDrawingItem(state, layerID, x, y) {
        if (state.hasIn(['drawingSupport', 'currentID'])) {
            // console.log('item.updateDrawingItem1');
            state = state.updateIn(
                [
                    'scene',
                    'layers',
                    layerID,
                    'items',
                    state.getIn(['drawingSupport', 'currentID']),
                ],
                (item) => item.merge({ x, y })
            );
        } else {
            // console.log('item.updateDrawingItem2');
            let { updatedState: stateI, item } = this.create(
                state,
                layerID,
                state.getIn(['drawingSupport', 'type']),
                x,
                y,
                0
            );
            state = Item.select(stateI, layerID, item.id).updatedState;
            state = state.setIn(['drawingSupport', 'currentID'], item.id);
        }

        return { updatedState: state };
    }

    static endDrawingItem(state, layerID, x, y) {
        let catalog = state.catalog;
        state = this.updateDrawingItem(state, layerID, x, y, catalog).updatedState;
        state = Layer.unselectAll(state, layerID).updatedState;
        state = state.merge({
            drawingSupport: Map({
                type: state.drawingSupport.get('type'),
            }),
        });

        return { updatedState: state };
    }

    static beginDraggingItem(state, layerID, itemID, x, y) {
        let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

        state = state.merge({
            mode: MODE_DRAGGING_ITEM,
            draggingSupport: Map({
                layerID,
                itemID,
                startPointX: x,
                startPointY: y,
                originalX: item.x,
                originalY: item.y,
            }),
        });

        return { updatedState: state };
    }

    static updateDraggingItem(state, x, y) {
        let { draggingSupport, scene } = state;

        let layerID = draggingSupport.get('layerID');
        let itemID = draggingSupport.get('itemID');
        let startPointX = draggingSupport.get('startPointX');
        let startPointY = draggingSupport.get('startPointY');
        let originalX = draggingSupport.get('originalX');
        let originalY = draggingSupport.get('originalY');

        let diffX = startPointX - x;
        let diffY = startPointY - y;

        let item = scene.getIn(['layers', layerID, 'items', itemID]);
        item = item.merge({
            x: originalX - diffX,
            y: originalY - diffY,
        });

        state = state.merge({
            scene: scene.mergeIn(['layers', layerID, 'items', itemID], item),
        });

        return { updatedState: state };
    }

    static endDraggingItem(state, x, y) {
        state = this.updateDraggingItem(state, x, y).updatedState;
        state = state.merge({ mode: MODE_IDLE });

        return { updatedState: state };
    }

    static beginRotatingItem(state, layerID, itemID, x, y) {
        state = state.merge({
            mode: MODE_ROTATING_ITEM,
            rotatingSupport: Map({
                layerID,
                itemID,
            }),
        });

        return { updatedState: state };
    }

    static updateRotatingItem(state, x, y) {
        let { rotatingSupport, scene } = state;

        let layerID = rotatingSupport.get('layerID');
        let itemID = rotatingSupport.get('itemID');
        let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

        let deltaX = x - item.x;
        let deltaY = y - item.y;
        let rotation = (Math.atan2(deltaY, deltaX) * 180) / Math.PI - 90;

        if (-5 < rotation && rotation < 5) rotation = 0;
        if (-95 < rotation && rotation < -85) rotation = -90;
        if (-185 < rotation && rotation < -175) rotation = -180;
        if (85 < rotation && rotation < 90) rotation = 90;
        if (-270 < rotation && rotation < -265) rotation = 90;

        item = item.merge({
            rotation,
        });

        state = state.merge({
            scene: scene.mergeIn(['layers', layerID, 'items', itemID], item),
        });

        return { updatedState: state };
    }

    static endRotatingItem(state, x, y) {
        state = this.updateRotatingItem(state, x, y).updatedState;
        state = state.merge({ mode: MODE_IDLE });

        return { updatedState: state };
    }

    static beginResizingItem(state, layerID, itemID, x, y, side) {
        const item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

        let properties = item.get('properties');

        const currentWidth = properties.getIn(['width', 'length']);
        const currentDepth = properties.getIn(['depth', 'length']);

        state = state.merge({
            mode: MODE_RESIZING_ITEM,
            resizingSupport: Map({
                layerID,
                itemID,
                side: side,
                startPointX: x,
                startPointY: y,
                originalX: item.x,
                originalY: item.y,
                originalWidth: currentWidth,
                originalDepth: currentDepth,
            }),
        });

        return { updatedState: state };
    }

    static updateResizingItem(state, x, y) {
        let { resizingSupport, scene } = state;

        let layerID = resizingSupport.get('layerID');
        let itemID = resizingSupport.get('itemID');
        let side = resizingSupport.get('side');
        let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

        let startPointX = resizingSupport.get('startPointX');
        let startPointY = resizingSupport.get('startPointY');
        let originalX = resizingSupport.get('originalX');
        let originalY = resizingSupport.get('originalY');
        let originalWidth = resizingSupport.get('originalWidth');
        let originalDepth = resizingSupport.get('originalDepth');

        let properties = item.get('properties');
        let rotation = item.get('rotation');

        let propertyName = 'width';
        let itemNewLength = 0;
        let minLength = 20;

        let sideAngle = rotation;
        if (side === 'left' || side === 'right') sideAngle -= 90;

        const mousePositionToSide = calculatePointFromLineWithAngleAndPoint(
            startPointX,
            startPointY,
            sideAngle,
            x,
            y
        );

        const mousePositionToItemCenter = calculatePointFromLineWithAngleAndPoint(
            originalX,
            originalY,
            sideAngle,
            x,
            y
        );

        let rel = mousePositionToSide.relation * mousePositionToItemCenter.relation;
        // rel = -1;
        let order = side == 'right' || side == 'bottom' ? -1 : 1;
        if (
            mousePositionToSide.relation == -1 &&
            mousePositionToItemCenter.relation == -1 &&
            (side == 'right' || side == 'top')
        ) {
            rel = -1;
        } else if (
            mousePositionToSide.relation == 1 &&
            mousePositionToItemCenter.relation == 1 &&
            (side == 'left' || side == 'bottom')
        ) {
            rel = -1;
        }

        let newWidth = originalWidth + mousePositionToSide.distance * rel;

        if (newWidth < minLength) newWidth = minLength;

        let newDepth = originalDepth + mousePositionToSide.distance * rel;
        if (newDepth < minLength) newDepth = minLength;

        let moveDirection = 0;

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

        let moveX =
            (Math.cos(DegreesToRadians(trueRotation)) *
                mousePositionToSide.distance *
                rel *
                order) /
            2;
        let moveY =
            (Math.sin(DegreesToRadians(trueRotation)) *
                mousePositionToSide.distance *
                rel *
                order) /
            2;

        item = item.merge({
            x: originalX - moveX,
            y: originalY - moveY,
        });

        properties = properties.setIn([propertyName, 'length'], itemNewLength);
        this.setProperties(state, layerID, itemID, properties);

        state = state.merge({
            scene: scene.mergeIn(['layers', layerID, 'items', itemID], item),
        });

        return {
            updatedState: this.setProperties(state, layerID, itemID, properties)
                .updatedState,
        };
    }

    static endResizingItem(state, x, y) {
        state = this.updateResizingItem(state, x, y).updatedState;
        state = state.merge({ mode: MODE_IDLE });

        return { updatedState: state };
    }

    static setProperties(state, layerID, itemID, properties) {
        // console.log('setProperties', properties);
        state = state.mergeIn(
            ['scene', 'layers', layerID, 'items', itemID, 'properties'],
            properties
        );

        return { updatedState: state };
    }

    static setJsProperties(state, layerID, itemID, properties) {
        return this.setProperties(state, layerID, itemID, fromJS(properties));
    }

    static updateProperties(state, layerID, itemID, properties) {
        properties.forEach((v, k) => {
            if (
                state.hasIn([
                    'scene',
                    'layers',
                    layerID,
                    'items',
                    itemID,
                    'properties',
                    k,
                ])
            )
                state = state.mergeIn(
                    ['scene', 'layers', layerID, 'items', itemID, 'properties', k],
                    v
                );
        });

        return { updatedState: state };
    }

    static updateJsProperties(state, layerID, itemID, properties) {
        return this.updateProperties(state, layerID, itemID, fromJS(properties));
    }

    static setAttributes(state, layerID, itemID, itemAttributes) {
        state = state.mergeIn(
            ['scene', 'layers', layerID, 'items', itemID],
            itemAttributes
        );
        return { updatedState: state };
    }

    static setJsAttributes(state, layerID, itemID, itemAttributes) {
        itemAttributes = fromJS(itemAttributes);
        return this.setAttributes(state, layerID, itemID, itemAttributes);
    }
}

export { Item as default };
