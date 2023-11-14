import React from 'react';
import {
    BoxGeometry,
    Mesh,
    BoxHelper,
    MeshLambertMaterial,
    Group,
    InstancedMesh,
    Matrix4,
    Vector3,
} from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';
import { Translator } from '../../../../../src';
const translator = new Translator();

export default {
    name: 'Pallets EUR',
    prototype: 'items',

    info: {
        title: translator.t('Pallets EUR'),
        tag: ['pallet'],
        description: 'EUR pallets',
        image: require('./cube.png'),
    },

    properties: {
        color: {
            label: 'Color',
            type: 'color',
            defaultValue: '#b2a48e',
            protected: true,
        },
        height: {
            label: 'Height',
            type: 'length-measure',
            defaultValue: {
                length: 200,
                unit: 'cm',
            },
            protected: true,
        },
        width: {
            label: 'Width',
            type: 'length-measure',
            defaultValue: {
                length: 120,
                unit: 'cm',
            },
        },
        depth: {
            label: 'Depth',
            type: 'length-measure',
            defaultValue: {
                length: 80,
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

        const plateWidth = 10;
        const w = element.properties.getIn(['width', 'length']);
        const h = element.properties.getIn(['height', 'length']);
        const d = element.properties.getIn(['depth', 'length']);
        const color = element.properties.get('color');
        const sectorLengthW = plateWidth * 2;
        const sectorLengthD = 200;

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
                    ) + 0.5;

                let x = boxOffsetX + j * (boxSize + boxSpace);
                let y = (boxSize / 2) * random + plateWidth * 0.75;
                let z = boxOffsetZ + k * (boxSize + boxSpace);

                const matrix = new Matrix4();

                // position the box
                matrix.makeTranslation(x, y, z);
                matrix.scale(new Vector3(1, random, 1));

                // scale the box
                instancedBox.setMatrixAt(count, matrix);
            }
        }
        instancedBox.frustumCulled = false;

        group.add(instancedBox);

        // Legs
        const pleatGeometryW = new BoxGeometry(plateWidth, plateWidth / 2, d);
        const pleatGeometryD = new BoxGeometry(w, plateWidth / 2, plateWidth);
        const pleatMaterial = new MeshLambertMaterial({
            color: 0xb0936f,
        });

        const plateGroup = new Group();

        // plates in width
        let innerW = w - plateWidth;
        let sectorWidthCount = Math.floor(innerW / sectorLengthW);
        let sectorWidth = innerW / sectorWidthCount;

        for (let i = 0; i <= sectorWidthCount; i++) {
            const plateV = new Mesh(pleatGeometryW, pleatMaterial);
            plateV.position.x = innerW / 2 - sectorWidth * i;
            plateV.position.z = 0;
            plateV.position.y = plateWidth / 2;
            plateGroup.add(plateV);
        }

        // plates in Depth
        let innerD = d - plateWidth;
        let sectorDepthCount = Math.floor(innerD / sectorLengthD);

        // console.log('sectorDepthCount', sectorDepthCount);

        sectorDepthCount = sectorDepthCount > 2 ? sectorDepthCount : 2;

        let sectorDepth = innerD / sectorDepthCount;

        for (let i = 0; i <= sectorDepthCount; i++) {
            const plateH = new Mesh(pleatGeometryD, pleatMaterial);
            plateH.position.x = 0;
            plateH.position.z = innerD / 2 - sectorDepth * i;
            plateH.position.y = plateWidth / 4;
            plateGroup.add(plateH);
        }

        group.add(plateGroup);

        group.position.y = 0;
        helper.scale.set(0.99, 0.99, 0.99);
        return Promise.resolve(group);
    },
};
