import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ReactSVGPanZoom, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_AUTO } from 'react-svg-pan-zoom';
import * as constants from '../../constants';
import State from './state';
import * as SharedStyle from '../../shared-style';

function mode2Tool(mode) {
    switch (mode) {
        case constants.MODE_2D_PAN:
            return TOOL_PAN;
        case constants.MODE_2D_ZOOM_IN:
            return TOOL_ZOOM_IN;
        case constants.MODE_2D_ZOOM_OUT:
            return TOOL_ZOOM_OUT;
        case constants.MODE_IDLE:
            return TOOL_AUTO;
        default:
            return TOOL_NONE;
    }
}

function mode2PointerEvents(mode) {
    switch (mode) {
        case constants.MODE_DRAWING_LINE:
        case constants.MODE_DRAWING_HOLE:
        case constants.MODE_DRAWING_ITEM:
        case constants.MODE_DRAWING_CAMERA:
        case constants.MODE_DRAWING_CAMERA360:
        case constants.MODE_DRAGGING_HOLE:
        case constants.MODE_DRAGGING_ITEM:
        case constants.MODE_DRAGGING_CAMERA:
        case constants.MODE_DRAGGING_CAMERA360:
        case constants.MODE_DRAGGING_LINE:
        case constants.MODE_DRAGGING_VERTEX:
            return { pointerEvents: 'none' };

        default:
            return {};
    }
}

function mode2Cursor(mode) {
    switch (mode) {
        case constants.MODE_DRAGGING_HOLE:
        case constants.MODE_DRAGGING_LINE:
        case constants.MODE_DRAGGING_VERTEX:
        case constants.MODE_DRAGGING_ITEM:
        case constants.MODE_DRAGGING_CAMERA:
        case constants.MODE_DRAGGING_CAMERA360:
            return { cursor: 'move' };

        case constants.MODE_ROTATING_ITEM:
        case constants.MODE_ROTATING_CAMERA:
        case constants.MODE_ROTATING_CAMERA360:
        case constants.MODE_RESIZING_ITEM:
        case constants.MODE_RESIZING_CAMERA:
        case constants.MODE_RESIZING_CAMERA360:
            return { cursor: 'ew-resize' };

        case constants.MODE_WAITING_DRAWING_LINE:
        case constants.MODE_DRAWING_LINE:
            return { cursor: 'crosshair' };
        default:
            return { cursor: 'default' };
    }
}

function mode2DetectAutopan(mode) {
    switch (mode) {
        case constants.MODE_DRAWING_LINE:
        case constants.MODE_DRAGGING_LINE:
        case constants.MODE_DRAGGING_VERTEX:
        case constants.MODE_DRAGGING_HOLE:
        case constants.MODE_DRAGGING_ITEM:
        case constants.MODE_DRAGGING_CAMERA:
        case constants.MODE_DRAGGING_CAMERA360:
        case constants.MODE_DRAWING_HOLE:
        case constants.MODE_DRAWING_CAMERA:
        case constants.MODE_DRAWING_CAMERA360:
            return true;

        default:
            return false;
    }
}

function extractElementData(node) {
    while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
        node = node.parentNode;
    }
    if (node.tagName === 'svg') return null;

    return {
        part: node.attributes.getNamedItem('data-part') ? node.attributes.getNamedItem('data-part').value : undefined,
        side: node.attributes.getNamedItem('data-side') ? node.attributes.getNamedItem('data-side').value : undefined,
        layer: node.attributes.getNamedItem('data-layer').value,
        prototype: node.attributes.getNamedItem('data-prototype').value,
        selected: node.attributes.getNamedItem('data-selected').value === 'true',
        id: node.attributes.getNamedItem('data-id').value
    };
}

export default function Viewer2D(_ref, _ref2) {
    var state = _ref.state,
        width = _ref.width,
        height = _ref.height,
        imageGuide = _ref.imageGuide,
        sceneDimensions = _ref.sceneDimensions;
    var viewer2DActions = _ref2.viewer2DActions,
        linesActions = _ref2.linesActions,
        holesActions = _ref2.holesActions,
        verticesActions = _ref2.verticesActions,
        itemsActions = _ref2.itemsActions,
        camerasActions = _ref2.camerasActions,
        cameras360Actions = _ref2.cameras360Actions,
        areaActions = _ref2.areaActions,
        projectActions = _ref2.projectActions,
        catalog = _ref2.catalog;
    var viewer2D = state.viewer2D,
        mode = state.mode,
        scene = state.scene;


    var layerID = scene.selectedLayer;

    var mapCursorPosition = function mapCursorPosition(_ref3) {
        var x = _ref3.x,
            y = _ref3.y;

        return { x: x, y: -y + scene.height };
    };

    var onMouseMove = function onMouseMove(viewerEvent) {
        //workaround that allow imageful component to work
        var evt = new Event('mousemove-planner-event');
        evt.viewerEvent = viewerEvent;
        document.dispatchEvent(evt);

        var _mapCursorPosition = mapCursorPosition(viewerEvent),
            x = _mapCursorPosition.x,
            y = _mapCursorPosition.y;

        var event = viewerEvent.originalEvent;
        if (event.button == 2) return;

        projectActions.updateMouseCoord({ x: x, y: y });

        switch (mode) {
            case constants.MODE_DRAWING_LINE:
                linesActions.updateDrawingLine(x, y, state.snapMask);
                break;

            case constants.MODE_DRAWING_HOLE:
                holesActions.updateDrawingHole(layerID, x, y);
                break;

            case constants.MODE_DRAWING_ITEM:
                itemsActions.updateDrawingItem(layerID, x, y);
                break;

            case constants.MODE_DRAWING_CAMERA:
                camerasActions.updateDrawingCamera(layerID, x, y);
                break;

            case constants.MODE_DRAWING_CAMERA360:
                cameras360Actions.updateDrawingCamera360(layerID, x, y);
                break;

            case constants.MODE_DRAGGING_HOLE:
                holesActions.updateDraggingHole(x, y);
                break;

            case constants.MODE_DRAGGING_LINE:
                linesActions.updateDraggingLine(x, y, state.snapMask);
                break;

            case constants.MODE_DRAGGING_VERTEX:
                verticesActions.updateDraggingVertex(x, y, state.snapMask);
                break;

            case constants.MODE_DRAGGING_ITEM:
                itemsActions.updateDraggingItem(x, y);
                break;

            case constants.MODE_DRAGGING_CAMERA:
                camerasActions.updateDraggingCamera(x, y);
                break;

            case constants.MODE_DRAGGING_CAMERA360:
                cameras360Actions.updateDraggingCamera360(x, y);
                break;

            case constants.MODE_RESIZING_ITEM:
                itemsActions.updateResizingItem(x, y);
                break;

            case constants.MODE_RESIZING_CAMERA:
                camerasActions.updateResizingCamera(x, y);
                break;

            case constants.MODE_RESIZING_CAMERA360:
                cameras360Actions.updateResizingCamera360(x, y);
                break;

            case constants.MODE_ROTATING_ITEM:
                itemsActions.updateRotatingItem(x, y);
                break;

            case constants.MODE_ROTATING_CAMERA:
                camerasActions.updateRotatingCamera(x, y);
                break;

            case constants.MODE_ROTATING_CAMERA360:
                cameras360Actions.updateRotatingCamera360(x, y);
                break;
        }

        viewerEvent.originalEvent.stopPropagation();
    };

    var onMouseDown = function onMouseDown(viewerEvent) {
        var event = viewerEvent.originalEvent;
        // console.log('event', event.button);

        //workaround that allow imageful component to work
        var evt = new Event('mousedown-planner-event');
        evt.viewerEvent = viewerEvent;
        document.dispatchEvent(evt);

        var _mapCursorPosition2 = mapCursorPosition(viewerEvent),
            x = _mapCursorPosition2.x,
            y = _mapCursorPosition2.y;

        // console.log('mode', mode, event.button);


        if (event.button == 2) return;

        if (mode === constants.MODE_IDLE) {
            var elementData = extractElementData(event.target);
            if (!elementData || !elementData.selected) return;

            switch (elementData.prototype) {
                case 'lines':
                    linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y, state.snapMask);
                    break;

                case 'vertices':
                    verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y, state.snapMask);
                    break;

                case 'items':
                    switch (elementData.part) {
                        case 'rotation-anchor':
                            itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);
                            break;
                        case 'resize-anchor':
                            itemsActions.beginResizingItem(elementData.layer, elementData.id, x, y, elementData.side);
                            break;
                        default:
                            itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
                            break;
                    }
                    break;

                case 'cameras':
                    switch (elementData.part) {
                        case 'rotation-anchor':
                            camerasActions.beginRotatingCamera(elementData.layer, elementData.id, x, y);
                            break;
                        case 'resize-anchor':
                            camerasActions.beginResizingCamera(elementData.layer, elementData.id, x, y, elementData.side);
                            break;
                        default:
                            camerasActions.beginDraggingCamera(elementData.layer, elementData.id, x, y);
                            break;
                    }
                    break;

                case 'cameras360':
                    switch (elementData.part) {
                        case 'rotation-anchor':
                            cameras360Actions.beginRotatingCamera360(elementData.layer, elementData.id, x, y);
                            break;
                        case 'resize-anchor':
                            cameras360Actions.beginResizingCamera360(elementData.layer, elementData.id, x, y, elementData.side);
                            break;
                        default:
                            cameras360Actions.beginDraggingCamera360(elementData.layer, elementData.id, x, y);
                            break;
                    }
                    break;

                case 'holes':
                    holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
                    break;

                default:
                    break;
            }
        }
        event.stopPropagation();
    };

    var onMouseUp = function onMouseUp(viewerEvent) {
        var event = viewerEvent.originalEvent;

        var evt = new Event('mouseup-planner-event');
        evt.viewerEvent = viewerEvent;
        document.dispatchEvent(evt);

        var _mapCursorPosition3 = mapCursorPosition(viewerEvent),
            x = _mapCursorPosition3.x,
            y = _mapCursorPosition3.y;

        if (event.button == 2) return;

        switch (mode) {
            case constants.MODE_IDLE:
                var elementData = extractElementData(event.target);

                if (elementData && elementData.selected) return;

                switch (elementData ? elementData.prototype : 'none') {
                    case 'areas':
                        areaActions.selectArea(elementData.layer, elementData.id);
                        break;

                    case 'lines':
                        linesActions.selectLine(elementData.layer, elementData.id);
                        break;

                    case 'holes':
                        holesActions.selectHole(elementData.layer, elementData.id);
                        break;

                    case 'items':
                        itemsActions.selectItem(elementData.layer, elementData.id);
                        break;

                    case 'cameras':
                        camerasActions.selectCamera(elementData.layer, elementData.id);
                        break;

                    case 'cameras360':
                        cameras360Actions.selectCamera360(elementData.layer, elementData.id);
                        break;

                    case 'none':
                        projectActions.unselectAll();
                        break;
                }
                break;

            case constants.MODE_WAITING_DRAWING_LINE:
                linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
                break;

            case constants.MODE_DRAWING_LINE:
                linesActions.endDrawingLine(x, y, state.snapMask);
                linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
                break;

            case constants.MODE_DRAWING_HOLE:
                holesActions.endDrawingHole(layerID, x, y);
                break;

            case constants.MODE_DRAWING_ITEM:
                itemsActions.endDrawingItem(layerID, x, y);
                break;

            case constants.MODE_DRAWING_CAMERA:
                camerasActions.endDrawingCamera(layerID, x, y);
                break;

            case constants.MODE_DRAWING_CAMERA360:
                cameras360Actions.endDrawingCamera360(layerID, x, y);
                break;

            case constants.MODE_DRAGGING_LINE:
                linesActions.endDraggingLine(x, y, state.snapMask);
                break;

            case constants.MODE_DRAGGING_VERTEX:
                verticesActions.endDraggingVertex(x, y, state.snapMask);
                break;

            case constants.MODE_DRAGGING_ITEM:
                itemsActions.endDraggingItem(x, y);
                break;

            case constants.MODE_DRAGGING_CAMERA:
                camerasActions.endDraggingCamera(x, y);
                break;

            case constants.MODE_DRAGGING_CAMERA360:
                cameras360Actions.endDraggingCamera360(x, y);
                break;

            case constants.MODE_DRAGGING_HOLE:
                holesActions.endDraggingHole(x, y);
                break;

            case constants.MODE_ROTATING_ITEM:
                itemsActions.endRotatingItem(x, y);
                break;

            case constants.MODE_ROTATING_CAMERA:
                camerasActions.endRotatingCamera(x, y);
                break;

            case constants.MODE_ROTATING_CAMERA360:
                cameras360Actions.endRotatingCamera360(x, y);
                break;

            case constants.MODE_RESIZING_ITEM:
                itemsActions.endResizingItem(x, y);
                break;

            case constants.MODE_RESIZING_CAMERA:
                camerasActions.endResizingCamera(x, y);
                break;

            case constants.MODE_RESIZING_CAMERA360:
                cameras360Actions.endResizingCamera360(x, y);
                break;
        }

        event.stopPropagation();
    };

    var onChangeValue = function onChangeValue(value) {
        projectActions.updateZoomScale(value.a);
        return viewer2DActions.updateCameraView(value);
    };

    var onChangeTool = function onChangeTool(tool) {
        switch (tool) {
            case TOOL_NONE:
                projectActions.selectToolEdit();
                break;

            case TOOL_PAN:
                viewer2DActions.selectToolPan();
                break;

            case TOOL_ZOOM_IN:
                viewer2DActions.selectToolZoomIn();
                break;

            case TOOL_ZOOM_OUT:
                viewer2DActions.selectToolZoomOut();
                break;
        }
    };

    var outOfGridClick = function outOfGridClick(e) {
        if (e.target.nodeName !== 'image' && e.target.nodeName === 'svg') {
            projectActions.unselectAll();
        }
    };

    var viewer = useRef(null);
    // if (viewer.current) viewer.current.zoomOnViewerCenter(1);

    useEffect(function () {
        viewer.current.ViewerDOM.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            //onMouseDown(e);
        });
    }, [viewer.current]);

    //   useEffect(() => {
    // viewer.current.fitSelection(scene.width, scene.height, width, height);
    // viewer.current.fitToViewer('center', 'center');
    // viewer.current.zoomOnViewerCenter(0.2);
    //   }, []);

    return React.createElement(
        'div',
        { id: 'plannerSVG', onMouseDown: outOfGridClick },
        React.createElement(
            ReactSVGPanZoom,
            {
                style: { gridColumn: 2, gridRow: 2 },
                width: width,
                height: height,
                value: viewer2D.isEmpty() ? null : viewer2D.toJS(),
                onChangeValue: onChangeValue,
                tool: mode2Tool(mode)
                // onChangeTool={onChangeTool}
                // detectAutoPan={mode2DetectAutopan(mode)}
                , onMouseDown: onMouseDown,
                onMouseMove: onMouseMove,
                onMouseUp: onMouseUp,
                miniaturePosition: 'none',
                toolbarPosition: 'none',
                background: SharedStyle.COLORS.blue,
                ref: viewer
            },
            React.createElement(
                'svg',
                { width: scene.width, height: scene.height },
                React.createElement(
                    'defs',
                    null,
                    React.createElement(
                        'pattern',
                        {
                            id: 'diagonalFill',
                            patternUnits: 'userSpaceOnUse',
                            width: '4',
                            height: '4',
                            fill: '#FFF'
                        },
                        React.createElement('rect', { x: '0', y: '0', width: '4', height: '4', fill: '#FFF' }),
                        React.createElement('path', {
                            d: 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2',
                            style: {
                                stroke: SharedStyle.AREA_MESH_COLOR.unselected,
                                strokeWidth: 1
                            }
                        })
                    )
                ),
                React.createElement(
                    'g',
                    { style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode)) },
                    React.createElement(State, {
                        state: state,
                        catalog: catalog,
                        imageGuide: imageGuide,
                        sceneDimensions: sceneDimensions
                    })
                )
            )
        )
    );
}

Viewer2D.propTypes = {
    state: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Viewer2D.contextTypes = {
    viewer2DActions: PropTypes.object.isRequired,
    linesActions: PropTypes.object.isRequired,
    holesActions: PropTypes.object.isRequired,
    verticesActions: PropTypes.object.isRequired,
    itemsActions: PropTypes.object.isRequired,
    camerasActions: PropTypes.object.isRequired,
    cameras360Actions: PropTypes.object.isRequired,
    areaActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired
};