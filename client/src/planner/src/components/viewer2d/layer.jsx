import React from 'react';
import PropTypes from 'prop-types';
import { Line, Area, Vertex, Item, Camera, Camera360, Group } from './export';

export default function Layer({ layer, scene, catalog }) {
    let { unit, groups } = scene;
    let {
        lines,
        areas,
        vertices,
        holes,
        id: layerID,
        items,
        cameras,
        cameras360,
        opacity,
    } = layer;

    const cameraFront = cameras.filter((camera) => camera.selected);
    const cameraBack = cameras.filter((camera) => !camera.selected);

    const itemFront = items.filter((item) => item.selected);
    const itemBack = items.filter((item) => !item.selected);

    const camera360Front = cameras360.filter((camera360) => camera360.selected);
    const camera360Back = cameras360.filter((camera360) => !camera360.selected);

    // console.log('cameraFront', cameraFront);
    // console.log('cameraBack', cameraBack);
    // console.log('camera360Front', camera360Front);
    // console.log('camera360Back', camera360Back);

    return (
        <g opacity={opacity}>
            {areas.valueSeq().map((area) => (
                <Area
                    key={area.id}
                    layer={layer}
                    area={area}
                    unit={unit}
                    catalog={catalog}
                />
            ))}

            {lines.valueSeq().map((line) => (
                <Line
                    key={line.id}
                    layer={layer}
                    line={line}
                    scene={scene}
                    catalog={catalog}
                />
            ))}

            {vertices
                .valueSeq()
                .filter((v) => v.selected)
                .map((vertex) => (
                    <Vertex key={vertex.id} layer={layer} vertex={vertex} />
                ))}

            {groups
                .valueSeq()
                .filter((g) => g.hasIn(['elements', layerID]) && g.get('selected'))
                .map((group) => (
                    <Group
                        key={group.get('id')}
                        layer={layer}
                        group={group}
                        scene={scene}
                        catalog={catalog}
                    />
                ))}

            {itemBack.valueSeq().map((item) => (
                <Item
                    key={item.id}
                    layer={layer}
                    item={item}
                    scene={scene}
                    catalog={catalog}
                />
            ))}

            {cameraBack.valueSeq().map((camera) => (
                <Camera
                    key={camera.id}
                    layer={layer}
                    camera={camera}
                    scene={scene}
                    catalog={catalog}
                />
            ))}
            {cameraFront.valueSeq().map((camera) => (
                <Camera
                    key={camera.id}
                    layer={layer}
                    camera={camera}
                    scene={scene}
                    catalog={catalog}
                />
            ))}

            {camera360Back.valueSeq().map((camera360) => (
                <Camera360
                    key={camera360.id}
                    layer={layer}
                    camera360={camera360}
                    scene={scene}
                    catalog={catalog}
                />
            ))}
            {camera360Front.valueSeq().map((camera360) => (
                <Camera360
                    key={camera360.id}
                    layer={layer}
                    camera360={camera360}
                    scene={scene}
                    catalog={catalog}
                />
            ))}

            {itemFront.valueSeq().map((item) => (
                <Item
                    key={item.id}
                    layer={layer}
                    item={item}
                    scene={scene}
                    catalog={catalog}
                />
            ))}
        </g>
    );
}

Layer.propTypes = {
    layer: PropTypes.object.isRequired,
    scene: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
};
