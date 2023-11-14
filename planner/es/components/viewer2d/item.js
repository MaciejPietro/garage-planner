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

export default function Item(_ref) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var x = item.x,
      y = item.y,
      rotation = item.rotation;


  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  var itemWidth = item.properties.getIn(['width', 'length']);
  var itemHeight = item.properties.getIn(['depth', 'length']);
  var pointerSize = 10;

  var resizePointers = [{ x: 0, y: itemHeight / 2, side: 'top' }, { x: 0, y: -itemHeight / 2, side: 'bottom' }, { x: itemWidth / 2, y: 0, side: 'right' }, { x: -itemWidth / 2, y: 0, side: 'left' }];

  return React.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': item.prototype,
      'data-id': item.id,
      'data-selected': item.selected,
      'data-layer': layer.id,
      style: item.selected ? { cursor: 'move' } : {},
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ')'
    },
    renderedItem,
    React.createElement(
      If,
      { condition: item.selected },
      React.createElement(
        'g',
        { 'data-element-root': true },
        React.createElement(
          'g',
          {
            'data-element-root': true,
            'data-prototype': item.prototype,
            'data-id': item.id,
            'data-selected': item.selected,
            'data-layer': layer.id,
            'data-part': 'rotation-anchor'
          },
          React.createElement('circle', { cx: '0', cy: '150', r: '10', style: STYLE_CIRCLE }),
          React.createElement('circle', { cx: '0', cy: '0', r: '150', style: STYLE_CIRCLE2 })
        ),
        resizePointers.map(function (pointer, i) {
          return React.createElement(
            'g',
            {
              'data-element-root': true,
              'data-prototype': item.prototype,
              'data-id': item.id,
              'data-selected': item.selected,
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

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};