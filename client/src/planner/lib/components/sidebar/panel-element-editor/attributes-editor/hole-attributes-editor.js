'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HoleAttributesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propertyLenghtMeasure = require('../../../../catalog/properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

var _propertyString = require('../../../../catalog/properties/property-string');

var _propertyString2 = _interopRequireDefault(_propertyString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };

function HoleAttributesEditor(_ref, _ref2) {
    var element = _ref.element,
        onUpdate = _ref.onUpdate,
        attributeFormData = _ref.attributeFormData,
        state = _ref.state,
        rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

    var translator = _ref2.translator;

    var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'table',
            { style: tableStyle },
            _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { style: firstTdStyle },
                        translator.t('Name')
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            name
                        )
                    )
                )
            )
        )
    );
}

HoleAttributesEditor.propTypes = {
    element: _propTypes2.default.object.isRequired,
    onUpdate: _propTypes2.default.func.isRequired,
    attributeFormData: _propTypes2.default.object.isRequired,
    state: _propTypes2.default.object.isRequired
};

HoleAttributesEditor.contextTypes = {
    translator: _propTypes2.default.object.isRequired
};