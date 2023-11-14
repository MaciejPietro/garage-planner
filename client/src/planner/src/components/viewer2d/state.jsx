import React from 'react';
import PropTypes from 'prop-types';
import Scene from './scene';
import * as SharedStyle from '../../shared-style';
import ImageGuide from "./imageGuide";

const guideStyle = {
    stroke: SharedStyle.SECONDARY_COLOR.main,
    strokewidth: '2.5px',
};

export default function State({ state, catalog, imageGuide, sceneDimensions }) {
    let { scene } = state;
    let { width, height } = scene;

    return (
        <g>
            {imageGuide && <ImageGuide src={imageGuide} sceneDimensions={sceneDimensions} />}
            <g transform={`translate(0, ${height}) scale(1, -1)`} id='svg-drawing-paper'>
                <Scene scene={scene} catalog={catalog} />
            </g>
        </g>
    );
}

State.propTypes = {
    state: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
};
