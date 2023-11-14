import React from 'react';
import { buildWall, updatedWall } from './wall-factory-3d';
import * as SharedStyle from '../../shared-style';
import * as Geometry from '../../utils/geometry';
import Translator from '../../translator/translator';
const translator = new Translator();

const epsilon = 20;
const STYLE_TEXT = { textAnchor: 'middle' };
const STYLE_LINE = { stroke: SharedStyle.LINE_MESH_COLOR.unselected };
const STYLE_RECT = {
    strokeWidth: 2,
    stroke: SharedStyle.LINE_MESH_COLOR.unselected,
    fill: 'url(#diagonalFill)',
    background: 'red',
};
const STYLE_RECT_SELECTED = {
    ...STYLE_RECT,
    stroke: SharedStyle.LINE_MESH_COLOR.selected,
};

export default function WallFactory(name, info, textures) {
    let wallElement = {
        name,
        prototype: 'lines',
        info,
        properties: {
            height: {
                label: translator.t('Height'),
                type: 'length-measure',
                defaultValue: {
                    length: 500,
                },
                protected: false,
            },
            thickness: {
                label: translator.t('Thickness'),
                type: 'length-measure',
                defaultValue: {
                    length: 20,
                },
                protected: true,
            },
        },

        render2D: function (element, layer, scene) {
            let { x: x1, y: y1 } = layer.vertices.get(element.vertices.get(0));
            let { x: x2, y: y2 } = layer.vertices.get(element.vertices.get(1));

            let length = Geometry.pointsDistance(x1, y1, x2, y2);
            let length_5 = length / 5;

            let thickness = element.getIn(['properties', 'thickness', 'length']);
            let half_thickness = thickness / 2;
            let half_thickness_eps = half_thickness + epsilon;
            let char_height = 11;
            let extra_epsilon = 5;
            let textDistance = half_thickness + epsilon + extra_epsilon;

            return element.selected ? (
                <g>
                    <rect
                        x="0"
                        y={-half_thickness}
                        width={length}
                        height={thickness}
                        style={STYLE_RECT_SELECTED}
                    />
                    <line
                        x1={length_5}
                        y1={-half_thickness_eps}
                        x2={length_5}
                        y2={half_thickness_eps}
                        style={STYLE_LINE}
                    />
                </g>
            ) : (
                <rect
                    x="0"
                    y={-half_thickness}
                    width={length}
                    height={thickness}
                    style={STYLE_RECT}
                />
            );
        },

        render3D: function (element, layer, scene) {
            return buildWall(element, layer, scene, textures);
        },

        updateRender3D: (
            element,
            layer,
            scene,
            mesh,
            oldElement,
            differences,
            selfDestroy,
            selfBuild
        ) => {
            return updatedWall(
                element,
                layer,
                scene,
                textures,
                mesh,
                oldElement,
                differences,
                selfDestroy,
                selfBuild
            );
        },
    };

    if (textures && textures !== {}) {
        let textureValues = { none: 'None' };

        for (let textureName in textures) {
            textureValues[textureName] = textures[textureName].name;
        }

        wallElement.properties.textureA = {
            label: 'texture A',
            type: 'enum',
            defaultValue: textureValues.bricks ? 'bricks' : 'none',
            values: textureValues,
            protected: true,
        };

        wallElement.properties.textureB = {
            label: 'texture B',
            type: 'enum',
            defaultValue: textureValues.bricks ? 'bricks' : 'none',
            values: textureValues,
            protected: true,
        };
    }

    return wallElement;
}
