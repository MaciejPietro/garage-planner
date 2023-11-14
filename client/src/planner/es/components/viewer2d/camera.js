import React from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';

var STYLE_LINE = {
  fill: '#0096fd',
  stroke: '#0096fd'
};

var STYLE_CIRCLE = {
  fill: '#0096fd',
  stroke: '#0096fd',
  cursor: 'move'
};

var STYLE_CIRCLE2 = {
  fill: 'none',
  stroke: '#0096fd',
  cursor: 'move'
};

export default function Camera(_ref) {
  var layer = _ref.layer,
      camera = _ref.camera,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var x = camera.x,
      y = camera.y,
      rotation = camera.rotation;


  var renderedCamera = catalog.getElement(camera.type).render2D(camera, layer, scene);

  var cameraWidth = camera.properties.getIn(['width', 'length']) / 2;
  var cameraDepth = camera.properties.getIn(['depth', 'length']) / 2;

  var maxValue = 500 - cameraWidth / (Math.PI / 2);

  var maxCameraDepth = cameraDepth > maxValue ? maxValue : cameraDepth;

  var pointerSize = 10;

  var resizePointers = [{ x: 0, y: cameraDepth, side: 'top' }, { x: cameraWidth, y: maxCameraDepth, side: 'right' }, { x: -cameraWidth, y: maxCameraDepth, side: 'left' }];

  return React.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': camera.prototype,
      'data-id': camera.id,
      'data-selected': camera.selected,
      'data-layer': layer.id,
      style: camera.selected ? { cursor: 'move' } : {},
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ')'
    },
    renderedCamera,
    React.createElement(
      If,
      { condition: camera.selected },
      React.createElement(
        'g',
        { 'data-element-root': true },
        resizePointers.map(function (pointer, i) {
          return React.createElement(
            'g',
            {
              'data-element-root': true,
              'data-prototype': camera.prototype,
              'data-id': camera.id,
              'data-selected': camera.selected,
              'data-layer': layer.id,
              'data-part': 'resize-anchor',
              'data-side': pointer.side,
              key: i
            },
            React.createElement('circle', {
              cx: pointer.x,
              cy: pointer.y,
              r: pointerSize,
              style: STYLE_CIRCLE,
              'data-id': pointer.id
            })
          );
        })
      )
    )
  );
}

Camera.propTypes = {
  camera: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};