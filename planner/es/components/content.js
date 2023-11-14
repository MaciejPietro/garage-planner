import React from 'react';
import PropTypes from 'prop-types';
import Viewer2D from './viewer2d/viewer2d';
import Viewer3D from './viewer3d/viewer3d';
import CatalogList from './catalog-view/catalog-list';

import * as constants from '../constants';
import ProjectConfigurator from './configurator/project-configurator';

export default function Content(_ref) {
    var width = _ref.width,
        height = _ref.height,
        state = _ref.state,
        customContents = _ref.customContents,
        imageGuide = _ref.imageGuide,
        sceneDimensions = _ref.sceneDimensions;

    var mode = state.get('mode');

    switch (mode) {
        case constants.MODE_3D_VIEW:
            return React.createElement(Viewer3D, { state: state, width: width, height: height });

        case constants.MODE_VIEWING_CATALOG:
            return React.createElement(CatalogList, { state: state, width: width, height: height });

        case constants.MODE_IDLE:
        case constants.MODE_2D_ZOOM_IN:
        case constants.MODE_2D_ZOOM_OUT:
        case constants.MODE_2D_PAN:
        case constants.MODE_WAITING_DRAWING_LINE:
        case constants.MODE_DRAGGING_LINE:
        case constants.MODE_DRAGGING_VERTEX:
        case constants.MODE_DRAGGING_ITEM:
        case constants.MODE_DRAGGING_CAMERA:
        case constants.MODE_DRAGGING_CAMERA360:
        case constants.MODE_DRAWING_LINE:
        case constants.MODE_DRAWING_HOLE:
        case constants.MODE_DRAWING_ITEM:
        case constants.MODE_DRAWING_CAMERA:
        case constants.MODE_DRAWING_CAMERA360:
        case constants.MODE_DRAGGING_HOLE:
        case constants.MODE_ROTATING_ITEM:
        case constants.MODE_ROTATING_CAMERA:
        case constants.MODE_ROTATING_CAMERA360:
        case constants.MODE_RESIZING_ITEM:
        case constants.MODE_RESIZING_CAMERA:
        case constants.MODE_RESIZING_CAMERA360:
            return React.createElement(Viewer2D, {
                state: state,
                width: width,
                height: height,
                imageGuide: imageGuide,
                sceneDimensions: sceneDimensions
            });

        case constants.MODE_CONFIGURING_PROJECT:
            return React.createElement(ProjectConfigurator, { width: width, height: height, state: state });

        default:
            if (customContents.hasOwnProperty(mode)) {
                var CustomContent = customContents[mode];
                return React.createElement(CustomContent, { width: width, height: height, state: state });
            } else {
                throw new Error('Mode ' + mode + ' doesn\'t have a mapped content');
            }
    }
}

Content.propTypes = {
    state: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};