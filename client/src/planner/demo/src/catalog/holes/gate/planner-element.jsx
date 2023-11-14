import React from 'react';
import * as Three from 'three';
import { Translator } from '../../../../../src';
const translator = new Translator();

export default {
    name: 'gate',
    prototype: 'holes',

    info: {
        tag: ['gate'],
        title: translator.t('gate'),
        description: 'hole in the wall',
        image: require('./gate.jpg'),
    },

    properties: {
        width: {
            label: translator.t('Width'),
            type: 'length-measure',
            defaultValue: {
                length: 90,
            },
        },
        height: {
            label: translator.t('Height'),
            type: 'length-measure',
            defaultValue: {
                length: 300,
            },
            protected: true,
        },
        altitude: {
            label: translator.t('Altitide'),
            type: 'length-measure',
            defaultValue: {
                length: 0,
            },
            protected: true,
        },
        thickness: {
            label: translator.t('Thickness'),
            type: 'length-measure',
            defaultValue: {
                length: 30,
            },
            protected: true,
        },
    },

    render2D: function (element, layer, scene) {
        const STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '5px', fill: '#000' };
        const STYLE_HOLE_SELECTED = {
            stroke: '#0096fd',
            strokeWidth: '5px',
            fill: '#0096fd',
            cursor: 'move',
        };
        const STYLE_ARC_BASE = {
            stroke: '#000',
            strokeWidth: '5px',
            strokeDasharray: '5,5',
            fill: 'none',
        };
        const STYLE_HOVER_BASE = {
            stroke: 'rgba(0,0,0,.01)',
            strokeWidth: '50px',
            fill: 'none',
            // cursor:'move'
        };
        const STYLE_HOVER_SELECTED = {
            stroke: 'rgba(0,0,0,.01)',
            strokeWidth: '50px',
            fill: 'none',
            cursor:'move'
        };
        const STYLE_ARC_SELECTED = {
            stroke: '#0096fd',
            strokeWidth: '5px',
            strokeDasharray: '5,5',
            fill: 'none',
        };

        let epsilon = 3;

        const holeThickness = element.properties.get('thickness').get('length');
        let holeWidth = element.properties.get('width').get('length');
        let holePath = `M${0} ${-epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
        let arcPath = `M${0},${0}  A${0},${0} 0 0,1 ${holeWidth},${0}`;
        let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
        let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
        let hoverStyle = element.selected ? STYLE_HOVER_SELECTED : STYLE_HOVER_BASE;
        let length = element.properties.get('width').get('length');

        return (
            <g transform={`translate(${-length / 2}, 0)`}>
                <line
                    key="1"
                    x1={0}
                    y1={holeThickness - epsilon}
                    x2={0}
                    y2={-holeThickness + epsilon}
                    style={holeStyle}
                    transform={`scale(${-1},${1})`}
                />
                <line
                    key="2"
                    x1={-holeWidth}
                    y1={holeThickness - epsilon}
                    x2={-holeWidth}
                    y2={-holeThickness + epsilon}
                    style={holeStyle}
                    transform={`scale(${-1},${1})`}
                />
                <path key="3" d={arcPath} style={arcStyle} />
                <path key="4" d={arcPath} style={hoverStyle} />
            </g>
        );
    },

    render3D: function (element, layer, scene) {
        let object = new Three.Object3D();
        return Promise.resolve(object);
    },
};
