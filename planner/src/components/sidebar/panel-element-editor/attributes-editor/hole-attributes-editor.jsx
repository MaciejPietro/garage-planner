import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };

export default function HoleAttributesEditor(
    { element, onUpdate, attributeFormData, state, ...rest },
    { translator }
) {
    let name = attributeFormData.has('name')
        ? attributeFormData.get('name')
        : element.name;

    return (
        <div>
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td style={firstTdStyle}>{translator.t('Name')}</td>
                        <td>
                            <h3>{name}</h3>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

HoleAttributesEditor.propTypes = {
    element: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    attributeFormData: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
};

HoleAttributesEditor.contextTypes = {
    translator: PropTypes.object.isRequired,
};
