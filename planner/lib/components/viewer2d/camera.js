'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Camera;

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

function Camera(_ref) {
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

  return _react2.default.createElement(
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
    _react2.default.createElement(
      _reactIf2.default,
      { condition: camera.selected },
      _react2.default.createElement(
        'g',
        { 'data-element-root': true },
        resizePointers.map(function (pointer, i) {
          return _react2.default.createElement(
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

Camera.propTypes = {
  camera: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};