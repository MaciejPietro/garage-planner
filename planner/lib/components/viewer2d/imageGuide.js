'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ImageGuide;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ImageGuide(_ref) {
    var src = _ref.src,
        sceneDimensions = _ref.sceneDimensions;


    return _react2.default.createElement('image', { href: src, width: sceneDimensions.width, height: sceneDimensions.length });
}