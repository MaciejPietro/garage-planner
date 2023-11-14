import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

export default function Area({ layer, area, catalog }) {
    let rendered = catalog.getElement(area.type).render2D(area, layer);

    if (area.selected) {
        let polygon = area.vertices.toArray().map((vertexID) => {
            let { x, y } = layer.vertices.get(vertexID);
            return [x, y];
        });

        let polygonWithHoles = polygon;

        area.holes.forEach((holeID) => {
            let polygonHole = layer.areas
                .get(holeID)
                .vertices.toArray()
                .map((vertexID) => {
                    let { x, y } = layer.vertices.get(vertexID);
                    return [x, y];
                });

            polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
        });

        let center = polylabel([polygonWithHoles], 1.0);
        let areaSize = areapolygon(polygon, false);

        //subtract holes area
        area.holes.forEach((areaID) => {
            let hole = layer.areas.get(areaID);
            let holePolygon = hole.vertices.toArray().map((vertexID) => {
                let { x, y } = layer.vertices.get(vertexID);
                return [x, y];
            });
            areaSize -= areapolygon(holePolygon, false);
        });
    }

    return <g>{rendered}</g>;
}

Area.propTypes = {
    area: PropTypes.object.isRequired,
    layer: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
};
