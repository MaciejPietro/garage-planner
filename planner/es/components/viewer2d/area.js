import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

export default function Area(_ref) {
    var layer = _ref.layer,
        area = _ref.area,
        catalog = _ref.catalog;

    var rendered = catalog.getElement(area.type).render2D(area, layer);

    if (area.selected) {
        var polygon = area.vertices.toArray().map(function (vertexID) {
            var _layer$vertices$get = layer.vertices.get(vertexID),
                x = _layer$vertices$get.x,
                y = _layer$vertices$get.y;

            return [x, y];
        });

        var polygonWithHoles = polygon;

        area.holes.forEach(function (holeID) {
            var polygonHole = layer.areas.get(holeID).vertices.toArray().map(function (vertexID) {
                var _layer$vertices$get2 = layer.vertices.get(vertexID),
                    x = _layer$vertices$get2.x,
                    y = _layer$vertices$get2.y;

                return [x, y];
            });

            polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
        });

        var center = polylabel([polygonWithHoles], 1.0);
        var areaSize = areapolygon(polygon, false);

        //subtract holes area
        area.holes.forEach(function (areaID) {
            var hole = layer.areas.get(areaID);
            var holePolygon = hole.vertices.toArray().map(function (vertexID) {
                var _layer$vertices$get3 = layer.vertices.get(vertexID),
                    x = _layer$vertices$get3.x,
                    y = _layer$vertices$get3.y;

                return [x, y];
            });
            areaSize -= areapolygon(holePolygon, false);
        });
    }

    return React.createElement(
        'g',
        null,
        rendered
    );
}

Area.propTypes = {
    area: PropTypes.object.isRequired,
    layer: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired
};