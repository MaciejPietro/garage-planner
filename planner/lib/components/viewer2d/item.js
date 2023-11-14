'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function Item(_ref) {
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

  return _react2.default.createElement(
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
    _react2.default.createElement(
      _reactIf2.default,
      { condition: item.selected },
      _react2.default.createElement(
        'g',
        { 'data-element-root': true },
        _react2.default.createElement(
          'g',
          {
            'data-element-root': true,
            'data-prototype': item.prototype,
            'data-id': item.id,
            'data-selected': item.selected,
            'data-layer': layer.id,
            'data-part': 'rotation-anchor'
          },
          _react2.default.createElement('circle', { cx: '0', cy: '150', r: '10', style: STYLE_CIRCLE }),
          _react2.default.createElement('circle', { cx: '0', cy: '0', r: '150', style: STYLE_CIRCLE2 })
        ),
        resizePointers.map(function (pointer, i) {
          return _react2.default.createElement(
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
            _react2.default.createElement('circle', {
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
  item: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};