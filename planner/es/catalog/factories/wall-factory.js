var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { buildWall, updatedWall } from './wall-factory-3d';
import * as SharedStyle from '../../shared-style';
import * as Geometry from '../../utils/geometry';
import Translator from '../../translator/translator';
var translator = new Translator();

var epsilon = 20;
var STYLE_TEXT = { textAnchor: 'middle' };
var STYLE_LINE = { stroke: SharedStyle.LINE_MESH_COLOR.unselected };
var STYLE_RECT = {
    strokeWidth: 2,
    stroke: SharedStyle.LINE_MESH_COLOR.unselected,
    fill: 'url(#diagonalFill)',
    background: 'red'
};
var STYLE_RECT_SELECTED = _extends({}, STYLE_RECT, {
    stroke: SharedStyle.LINE_MESH_COLOR.selected
});

export default function WallFactory(name, info, textures) {
    var wallElement = {
        name: name,
        prototype: 'lines',
        info: info,
        properties: {
            height: {
                label: translator.t('Height'),
                type: 'length-measure',
                defaultValue: {
                    length: 500
                },
                protected: false
            },
            thickness: {
                label: translator.t('Thickness'),
                type: 'length-measure',
                defaultValue: {
                    length: 20
                },
                protected: true
            }
        },

        render2D: function render2D(element, layer, scene) {
            var _layer$vertices$get = layer.vertices.get(element.vertices.get(0)),
                x1 = _layer$vertices$get.x,
                y1 = _layer$vertices$get.y;

            var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1)),
                x2 = _layer$vertices$get2.x,
                y2 = _layer$vertices$get2.y;

            var length = Geometry.pointsDistance(x1, y1, x2, y2);
            var length_5 = length / 5;

            var thickness = element.getIn(['properties', 'thickness', 'length']);
            var half_thickness = thickness / 2;
            var half_thickness_eps = half_thickness + epsilon;
            var char_height = 11;
            var extra_epsilon = 5;
            var textDistance = half_thickness + epsilon + extra_epsilon;

            return element.selected ? React.createElement(
                'g',
                null,
                React.createElement('rect', {
                    x: '0',
                    y: -half_thickness,
                    width: length,
                    height: thickness,
                    style: STYLE_RECT_SELECTED
                }),
                React.createElement('line', {
                    x1: length_5,
                    y1: -half_thickness_eps,
                    x2: length_5,
                    y2: half_thickness_eps,
                    style: STYLE_LINE
                })
            ) : React.createElement('rect', {
                x: '0',
                y: -half_thickness,
                width: length,
                height: thickness,
                style: STYLE_RECT
            });
        },

        render3D: function render3D(element, layer, scene) {
            return buildWall(element, layer, scene, textures);
        },

        updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
            return updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
        }
    };

    if (textures && textures !== {}) {
        var textureValues = { none: 'None' };

        for (var textureName in textures) {
            textureValues[textureName] = textures[textureName].name;
        }

        wallElement.properties.textureA = {
            label: 'texture A',
            type: 'enum',
            defaultValue: textureValues.bricks ? 'bricks' : 'none',
            values: textureValues,
            protected: true
        };

        wallElement.properties.textureB = {
            label: 'texture B',
            type: 'enum',
            defaultValue: textureValues.bricks ? 'bricks' : 'none',
            values: textureValues,
            protected: true
        };
    }

    return wallElement;
}