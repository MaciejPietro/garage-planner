import React from 'react';
import PropTypes from 'prop-types';
import Scene from './scene';
import * as SharedStyle from '../../shared-style';
import ImageGuide from "./imageGuide";

var guideStyle = {
    stroke: SharedStyle.SECONDARY_COLOR.main,
    strokewidth: '2.5px'
};

export default function State(_ref) {
    var state = _ref.state,
        catalog = _ref.catalog,
        imageGuide = _ref.imageGuide,
        sceneDimensions = _ref.sceneDimensions;
    var scene = state.scene;
    var width = scene.width,
        height = scene.height;


    return React.createElement(
        'g',
        null,
        imageGuide && React.createElement(ImageGuide, { src: imageGuide, sceneDimensions: sceneDimensions }),
        React.createElement(
            'g',
            { transform: 'translate(0, ' + height + ') scale(1, -1)', id: 'svg-drawing-paper' },
            React.createElement(Scene, { scene: scene, catalog: catalog })
        )
    );
}

State.propTypes = {
    state: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired
};