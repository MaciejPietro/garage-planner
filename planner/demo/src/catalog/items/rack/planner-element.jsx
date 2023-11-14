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
    name: 'rack',
    prototype: 'items',

    info: {
        title: translator.t('rack'),
        tag: ['rack'],
        description: 'Rack',
        image: require('./cube.png'),
    },

    properties: {
        color: {
            label: 'Color',
            type: 'color',
            defaultValue: '#c3af64',
            protected: true,
        },
        height: {
            label: 'Height',
            type: 'length-measure',
            defaultValue: {
                length: 500,
                unit: 'cm',
            },
            protected: false,
        },
        width: {
            label: 'Width',
            type: 'length-measure',
            defaultValue: {
                length: 850,
                unit: 'cm',
            },
        },
        depth: {
            label: 'Depth',
            type: 'length-measure',
            defaultValue: {
                length: 110,
                unit: 'cm',
            },
        },
        sectorLength: {
            label: 'Sector length',
            type: 'length-measure',
            defaultValue: {
                length: 200,
                unit: 'cm',
            },
            protected: true,
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

        const legWidth = 20;
        const w = element.properties.getIn(['width', 'length']);
        const h = element.properties.getIn(['height', 'length']);
        const d = element.properties.getIn(['depth', 'length']);
        const color = element.properties.get('color');
        const sectorLength = element.properties.getIn(['sectorLength', 'length']);

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

        // Add shelves
        const rackInnerHeight = h - legWidth;
        const shelfCount = Math.floor(rackInnerHeight / (sectorLength / 2));
        const shelfHeight = rackInnerHeight / shelfCount;
        const shelfGeometry = new BoxGeometry(w - 1, 10, d - 1);
        const shelfMaterial = new MeshLambertMaterial({
            color: color,
        });

        for (let i = 0; i < shelfCount; i++) {
            const shelf = new Mesh(shelfGeometry, shelfMaterial);
            group.add(shelf);
            shelf.position.y = h / 2 - shelfHeight * (i + 1);
        }

        // Boxs
        const loverDimension = w > d ? d : w;
        const boxSize = loverDimension < 85 ? loverDimension * 0.5 : 85;
        const boxSpace = 10;
        const boxCountX = Math.floor(w / (boxSize + boxSpace));
        const boxCountZ = Math.floor(d / (boxSize + boxSpace));
        const boxOffsetX =
            (boxSize + boxSpace) / 2 - (boxCountX * (boxSize + boxSpace)) / 2;
        const boxOffsetZ =
            (boxSize + boxSpace) / 2 - (boxCountZ * (boxSize + boxSpace)) / 2;

        // create a box fill the shelves
        const boxGeometry = new BoxGeometry(boxSize, boxSize, boxSize);
        const boxMaterial = new MeshLambertMaterial({
            color: 0xe3d9bc,
        });

        const instancedBox = new InstancedMesh(
            boxGeometry,
            boxMaterial,
            shelfCount * boxCountX * boxCountZ + 1
        );

        let count = 0;
        for (let i = 0; i < shelfCount; i++) {
            // fill the shelf by box with and space between them
            for (let j = 0; j < boxCountX; j++) {
                for (let k = 0; k < boxCountZ; k++) {
                    count += 1;
                    let random =
                        Math.abs(
                            Math.sin(shelfCount + k + j - i + w + boxOffsetZ) *
                                Math.cos(
                                    i +
                                        j -
                                        k +
                                        d +
                                        boxOffsetX +
                                        (count % 36) +
                                        (count % 13)
                                )
                        ) + 0.5;

                    let x = boxOffsetX + j * (boxSize + boxSpace);
                    let y = h / 2 - shelfHeight * (i + 1) + (boxSize / 2) * random;
                    let z = boxOffsetZ + k * (boxSize + boxSpace);

                    const matrix = new Matrix4();

                    // position the box
                    matrix.makeTranslation(x, y, z);
                    matrix.scale(new Vector3(1, random, 1));

                    // scale the box
                    instancedBox.setMatrixAt(count, matrix);
                }
            }
        }
        instancedBox.frustumCulled = false;

        group.add(instancedBox);

        // Legs
        const legGeometry = new BoxGeometry(legWidth, h - shelfHeight, legWidth);
        const legMaterial = new MeshLambertMaterial({
            color: 0x666666,
        });

        const legGroup = new Group();

        // 4 legs of the rack
        for (let i = 0; i < 4; i++) {
            const leg = new Mesh(legGeometry, legMaterial);
            leg.position.x = ((w - legWidth) / 2) * (i % 2 === 0 ? -1 : 1);
            leg.position.z = ((d - legWidth) / 2) * (i < 2 ? -1 : 1);
            legGroup.add(leg);
        }

        // Add legs for all sectors of the rack
        let sectorWidthCount = Math.floor(w / sectorLength);
        let sectorWidth = w / sectorWidthCount;

        for (let i = 0; i < sectorWidthCount - 1; i++) {
            const legF = new Mesh(legGeometry, legMaterial);
            legF.position.x = w / 2 - sectorWidth * (i + 1);
            legF.position.z = d / 2 - legWidth / 2;
            legGroup.add(legF);

            const legB = legF.clone();
            legB.position.z = legB.position.z * -1;
            legGroup.add(legB);
        }

        let sectorDepthCount = Math.floor(d / sectorLength);
        let sectorDepth = d / sectorDepthCount;

        for (let i = 0; i < sectorDepthCount - 1; i++) {
            const legL = new Mesh(legGeometry, legMaterial);
            legL.position.x = w / 2 - legWidth / 2;
            legL.position.z = d / 2 - sectorDepth * (i + 1);
            legGroup.add(legL);

            const legR = legL.clone();
            legR.position.x = legR.position.x * -1;
            legGroup.add(legR);
        }

        legGroup.position.y = shelfHeight / -2;

        group.add(legGroup);

        group.position.y = h / 2;
        helper.scale.set(0.99, 0.99, 0.99);
        return Promise.resolve(group);
    },
};
