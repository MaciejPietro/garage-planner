import * as Three from 'three';
import React from 'react';
import { WAREHOUSE_HEIGHT } from '../../../constants';

import { makeObjectMaxLOD, makeObjectMinLOD } from './cameraModel';

import { Translator } from '../../../../../src';
const translator = new Translator();

const WIDTH = 10;
const DEPTH = 20;
const HEIGHT = 20;

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

export default {
    name: 'camera 360',
    prototype: 'cameras360',

    info: {
        tag: ['security', 'metal'],
        title: translator.t('camera 360'),
        description: 'camera360',
        image: require('./camera.png'),
    },
    properties: {
        altitude: {
            label: 'altitude',
            type: 'length-measure',
            defaultValue: {
                length: WAREHOUSE_HEIGHT - 100,
                unit: 'cm',
            },
            protected: true,
        },
        width: {
            label: 'Width',
            type: 'length-measure',
            defaultValue: {
                length: 700,
                unit: 'cm',
            },
        },
        height: {
            label: 'Height',
            type: 'length-measure',
            defaultValue: {
                length: 800,
                unit: 'cm',
            },
            protected: false,
        },
        depth: {
            label: 'Depth',
            type: 'length-measure',
            defaultValue: {
                length: 0,
                unit: 'cm',
            },
        },
    },

    render2D: function (element, layer, scene) {
        let angle = element.rotation + 90;

        let textRotation = 0;
        if (Math.sin((angle * Math.PI) / 180) < 0) {
            textRotation = 180;
        }

        let widthArea = element.properties.getIn(['width', 'length']) / 2;
        let depthArea = element.properties.getIn(['depth', 'length']) / 2;

        return (
            <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
                <rect
                    key="1"
                    x="0"
                    y="0"
                    width={WIDTH}
                    height={DEPTH}
                    style={{
                        stroke: element.selected ? '#0096fd' : '#000',
                        strokeWidth: '2px',
                        fill: '#84e1ce',
                    }}
                />
                <text
                    key="2"
                    x="0"
                    y="0"
                    transform={`translate(${WIDTH / 2}, ${
                        DEPTH / 2
                    }) scale(1,-1) rotate(${textRotation})`}
                    style={{ textAnchor: 'middle', fontSize: '11px' }}
                >
                    {translator.t(element.type)}
                </text>

                <circle
                    cx={WIDTH / 2}
                    cy={DEPTH / 2 + depthArea}
                    r={widthArea + depthArea / 2}
                    // r={d}
                    style={{
                        fill: '#45beff21',
                        stroke: 'black',
                        strokeWidth: 1,
                        opacity: 1,
                        // transform: `scaleY(${depthArea / widthArea / 10 + 1})`,
                    }}
                />
            </g>
        );
    },

    render3D: function (element, layer, scene) {
        // let heightArea = element.properties.get('altitude').get('length');

        let widthArea = element.properties.getIn(['width', 'length']) / 2;
        let heightArea = element.properties.getIn(['height', 'length']) / 2;
        let depthArea = element.properties.getIn(['depth', 'length']) / 2;

        let coneHeight = 250;
        // maxDepthArea = depthArea;

        /**************** LOD max ***********************/

        let video_cameraMaxLOD = new Three.Object3D();
        video_cameraMaxLOD.add(objectMaxLOD.clone().rotateY(Math.PI));

        let aa = new Three.Box3().setFromObject(video_cameraMaxLOD);

        let deltaX = Math.abs(aa.max.x - aa.min.x);
        let deltaY = Math.abs(aa.max.y - aa.min.y);
        let deltaZ = Math.abs(aa.max.z - aa.min.z);

        video_cameraMaxLOD.position.y += HEIGHT / 8 - 11;
        video_cameraMaxLOD.position.z += DEPTH / 2;
        video_cameraMaxLOD.scale.set(DEPTH / deltaZ, HEIGHT / deltaY, WIDTH / deltaX);

        /**************** LOD min ***********************/

        let video_cameraMinLOD = new Three.Object3D();
        video_cameraMinLOD.add(objectMinLOD.clone().rotateY(Math.PI));

        video_cameraMinLOD.position.y += HEIGHT / 8 - 11;
        video_cameraMinLOD.position.z += DEPTH / 2;
        video_cameraMinLOD.scale.set(DEPTH / deltaZ, HEIGHT / deltaY, WIDTH / deltaX);

        /**** all level of detail ***/

        let lod = new Three.LOD();

        lod.addLevel(video_cameraMaxLOD, 200);
        lod.addLevel(video_cameraMinLOD, 900);
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;

        if (element.selected) {
            let bbox = new Three.BoxHelper(lod, 0x99c3fb);
            bbox.material.linewidth = 5;
            bbox.renderOrder = 1000;
            bbox.material.depthTest = false;
            lod.add(bbox);
        }

        const group = new Three.Group();
        group.add(lod);

        // console.log({ heightArea, h: HEIGHT / 8 + heightArea, w, d });

        // Camera field of view representation

        let size = (widthArea + depthArea / 2) * 0.6;

        const cameraAreaGeometry = new Three.ConeGeometry(size, coneHeight, 32, false);
        const cameraAreaMaterial = new Three.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
            vertexColors: true,
        });
        const focusPointMaterial = new Three.MeshBasicMaterial({
            color: 0x0096fd,
            transparent: true,
            opacity: 0.7,
        });

        const borderMaterial = new Three.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.05,
            wireframe: true,
        });

        for (var i = 0; i < cameraAreaGeometry.vertices.length; i++) {
            // Gradient color
            let color = new Three.Color(0xffffff);
            let color2 = new Three.Color(0x45beff);
            cameraAreaGeometry.colors[i] = i == 0 ? color2 : color;
        }

        const faceIndices = ['a', 'b', 'c', 'd'];
        for (var i = 0; i < cameraAreaGeometry.faces.length; i++) {
            let face = cameraAreaGeometry.faces[i];
            let numberOfSides = face instanceof Three.Face3 ? 3 : 4;
            for (var j = 0; j < numberOfSides; j++) {
                let vertexIndex = face[faceIndices[j]];
                face.vertexColors[j] = cameraAreaGeometry.colors[vertexIndex];
            }
        }

        const coneArea = new Three.Mesh(cameraAreaGeometry, cameraAreaMaterial);
        const coneBorder = new Three.Mesh(cameraAreaGeometry, borderMaterial);

        // const areaIndicator = new Three.Group();

        // const areaRing = new Three.Mesh(
        //   new Three.RingGeometry(
        //     widthArea + depthArea / 2,
        //     widthArea + depthArea / 2 + 5,
        //     32,
        //     1
        //   ),
        //   focusPointMaterial
        // );

        // areaRing.rotation.x = -Math.PI / 2;
        // areaRing.position.y = 2;

        // areaIndicator.add(areaRing);

        // areaIndicator.position.y = 0;
        // areaIndicator.position.z = -depthArea;

        const focusIndicator = new Three.Group();

        const focusIndicatorBottom = new Three.Mesh(
            new Three.SphereGeometry(15, 20, 16),
            focusPointMaterial
        );
        focusIndicatorBottom.position.y = 0;

        const focusIndicatorTop = new Three.Mesh(
            new Three.ConeGeometry(15, 100, 16, true),
            focusPointMaterial
        );

        focusIndicatorTop.rotation.x = Math.PI;

        focusIndicatorTop.position.y = 100 / 2;

        focusIndicator.add(focusIndicatorBottom);
        focusIndicator.add(focusIndicatorTop);

        focusIndicator.position.y = 0;
        focusIndicator.position.z = -depthArea;

        coneArea.position.set(0, 0, coneHeight / -2);
        coneBorder.position.set(0, 0, coneHeight / -2);

        const coneGroupAspect = new Three.Group();
        coneGroupAspect.add(coneArea);
        coneGroupAspect.add(coneBorder);

        coneGroupAspect.scale.set(1, 1, 1);

        coneGroupAspect.position.set(0, 0, 0);

        let deg = Math.PI / 2;
        let roll = deg / 2;
        coneArea.rotation.set(deg, roll, 0);
        coneBorder.rotation.set(deg, roll, 0);

        let focusPointZ = 8 + heightArea;
        let focusPointY = depthArea;

        // Get radian angel from focus point
        let radian = Math.atan(focusPointZ / focusPointY);

        group.rotation.x = -radian;
        group.position.y = heightArea + 11;

        coneGroupAspect.renderOrder = 2000;
        group.add(coneGroupAspect);

        const lineMaterial = new Three.LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.5,
            linewidth: 1,
        });

        const points = [];
        points.push(new Three.Vector3(0, heightArea + 11, 0));
        points.push(new Three.Vector3(0, 0, -depthArea));

        const geometry = new Three.BufferGeometry().setFromPoints(points);
        const line = new Three.Line(geometry, lineMaterial);

        const masterGroup = new Three.Group();
        masterGroup.add(group);
        // masterGroup.add(areaIndicator);
        masterGroup.add(focusIndicator);
        masterGroup.add(line);

        return Promise.resolve(masterGroup);
    },
};
