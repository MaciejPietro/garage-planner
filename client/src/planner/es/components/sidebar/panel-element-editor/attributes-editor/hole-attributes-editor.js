function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };

export default function HoleAttributesEditor(_ref, _ref2) {
    var element = _ref.element,
        onUpdate = _ref.onUpdate,
        attributeFormData = _ref.attributeFormData,
        state = _ref.state,
        rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

    var translator = _ref2.translator;

    var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'table',
            { style: tableStyle },
            React.createElement(
                'tbody',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { style: firstTdStyle },
                        translator.t('Name')
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
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
    element: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    attributeFormData: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
};

HoleAttributesEditor.contextTypes = {
    translator: PropTypes.object.isRequired
};