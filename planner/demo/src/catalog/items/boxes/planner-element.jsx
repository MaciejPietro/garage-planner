import React from 'react';
import {
    BoxGeometry,
    Mesh,
    BoxHelper,
    MeshLambertMaterial,
    Group,
    Matrix4,
    InstancedMesh,
    Vector3,
} from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';
import { Translator } from '../../../../../src';
const translator = new Translator();

export default {
    name: 'Boxes',
    prototype: 'items',

    info: {
        title: translator.t('Boxes'),
        tag: ['boxes'],
        description: 'Boxes',
        image: require('./cube.png'),
    },

    properties: {
        color: {
            label: translator.t('Color'),
            type: 'color',
            defaultValue: '#d8cdb7',
            protected: false,
        },
        width: {
            label: translator.t('Width'),
            type: 'length-measure',
            defaultValue: {
                length: 100,
                unit: 'cm',
            },
        },
        height: {
            label: translator.t('Height'),
            type: 'length-measure',
            defaultValue: {
                length: 60,
                unit: 'cm',
            },
            protected: false,
        },
        depth: {
            label: translator.t('Depth'),
            type: 'length-measure',
            defaultValue: {
                length: 100,
                unit: 'cm',
            },
        },
    },

    render2D: (element, layer, scene) => {
        let style = {
            stroke: !element.selected
                ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected
                : ReactPlannerSharedStyle.MESH_SELECTED,
            strokeWidth: 1,
            fill: element.properties.get('color'),
        };

        let w = element.properties.getIn(['width', 'length']);
        let d = element.properties.getIn(['depth', 'length']);
        let w2 = w / 2;
        let d2 = d / 2;

        return (
            <g transform={`translate(-${w2}, -${d2})`}>
                <rect x="0" y="0" width={w} height={d} style={style} />
            </g>
        );
    },

    render3D: (element, layer, scene) => {
        const group = new Group();

        let w = element.properties.getIn(['width', 'length']);
        let h = element.properties.getIn(['height', 'length']);
        let d = element.properties.getIn(['depth', 'length']);
        let color = element.properties.get('color');

        // Helper
        const helperGeometry = new BoxGeometry(w, h, d);
        const helperMaterial = new MeshLambertMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
        });

        const helper = new Mesh(helperGeometry, helperMaterial);

        const box = new BoxHelper(
            helper,
            !element.selected
                ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected
                : ReactPlannerSharedStyle.MESH_SELECTED
        );
        box.material.linewidth = 2;
        box.renderOrder = 1000;
        group.add(box);

        box.visible = false;
        group.add(helper);
        helper.visible = false;

        // Boxs
        const loverDimension = w > d ? d : w;
        const boxSize = loverDimension < h / 2 ? loverDimension * 0.5 : h / 2;
        const boxSpace = 10;
        const boxCountX = Math.floor(w / (boxSize + boxSpace));
        const boxCountZ = Math.floor(d / (boxSize + boxSpace));

        const boxSizeX = w / boxCountX - boxSpace;
        const boxSizeZ = d / boxCountZ - boxSpace;

        const boxOffsetX = w / -2 + boxSizeX / 2;
        const boxOffsetZ = d / -2 + boxSizeZ / 2;
        // create a box fill the shelves
        const boxGeometry = new BoxGeometry(boxSizeX, h, boxSizeZ);
        const boxMaterial = new MeshLambertMaterial({
            color: color,
        });

        const instancedBox = new InstancedMesh(
            boxGeometry,
            boxMaterial,
            boxCountX * boxCountZ + 1
        );

        let count = 0;
        // fill the shelf by box with and space between them
        for (let j = 0; j < boxCountX; j++) {
            for (let k = 0; k < boxCountZ; k++) {
                count += 1;
                let random =
                    Math.abs(
                        Math.sin(k + j + w + boxOffsetZ) *
                            Math.cos(j - k + d + boxOffsetX + (count % 36) + (count % 13))
                    ) + 0.25;

                let x = boxOffsetX + j * (boxSizeX + boxSpace);
                let y = (h / 2) * random - h / 2;
                let z = boxOffsetZ + k * (boxSizeZ + boxSpace);

                const matrix = new Matrix4();

                // position the box
                matrix.makeTranslation(x, y, z);
                matrix.scale(new Vector3(1, random, 1));

                // scale the box
                instancedBox.setMatrixAt(count, matrix);
            }
        }
        instancedBox.needUpdate = true;
        instancedBox.frustumCulled = false;
        group.add(instancedBox);

        group.position.y = h / 2;
        helper.scale.set(0.99, 0.99, 0.99);
        return Promise.resolve(group);
    },
};
