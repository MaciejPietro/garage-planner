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

export default function Camera360(_ref) {
  var layer = _ref.layer,
      camera360 = _ref.camera360,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var x = camera360.x,
      y = camera360.y,
      rotation = camera360.rotation;


  var renderedCamera360 = catalog.getElement(camera360.type).render2D(camera360, layer, scene);

  var camera360Width = camera360.properties.getIn(['width', 'length']) / 2;
  var camera360Depth = camera360.properties.getIn(['depth', 'length']) / 2;

  var pointerSize = 10;

  var resizePointers = [{ x: 0, y: camera360Depth, side: 'top' }, { x: camera360Width + camera360Depth / 2, y: camera360Depth, side: 'right' }, { x: -camera360Width - camera360Depth / 2, y: camera360Depth, side: 'left' }];

  return React.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': camera360.prototype,
      'data-id': camera360.id,
      'data-selected': camera360.selected,
      'data-layer': layer.id,
      style: camera360.selected ? { cursor: 'move' } : {},
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ')'
    },
    renderedCamera360,
    React.createElement(
      If,
      { condition: camera360.selected },
      React.createElement(
        'g',
        { 'data-element-root': true },
        resizePointers.map(function (pointer, i) {
          return React.createElement(
            'g',
            {
              'data-element-root': true,
              'data-prototype': camera360.prototype,
              'data-id': camera360.id,
              'data-selected': camera360.selected,
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

Camera360.propTypes = {
  camera360: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};