'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = State;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scene = require('./scene');

var _scene2 = _interopRequireDefault(_scene);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _imageGuide = require('./imageGuide');

var _imageGuide2 = _interopRequireDefault(_imageGuide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guideStyle = {
    stroke: SharedStyle.SECONDARY_COLOR.main,
    strokewidth: '2.5px'
};

function State(_ref) {
    var state = _ref.state,
        catalog = _ref.catalog,
        imageGuide = _ref.imageGuide,
        sceneDimensions = _ref.sceneDimensions;
    var scene = state.scene;
    var width = scene.width,
        height = scene.height;


    return _react2.default.createElement(
        'g',
        null,
        imageGuide && _react2.default.createElement(_imageGuide2.default, { src: imageGuide, sceneDimensions: sceneDimensions }),
        _react2.default.createElement(
            'g',
            { transform: 'translate(0, ' + height + ') scale(1, -1)', id: 'svg-drawing-paper' },
            _react2.default.createElement(_scene2.default, { scene: scene, catalog: catalog })
        )
    );
}

State.propTypes = {
    state: _propTypes2.default.object.isRequired,
    catalog: _propTypes2.default.object.isRequired
};