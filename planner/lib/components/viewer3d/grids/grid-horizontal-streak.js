'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});

exports.default = function (width, height, grid) {
    var step = grid.properties.get('step');
    var colors = grid.properties.has('color')
        ? new _immutable.List([grid.properties.get('color')])
        : grid.properties.get('colors');

    var streak = new Three.Object3D();
    streak.name = 'streak';
    var counter = 0;

    for (var i = 0; i <= height; i += step) {
        const points = [];
        points.push(new Three.Vector3(0, 0, -i));
        points.push(new Three.Vector3(width, 0, -i));
        let geometry = new Three.BufferGeometry().setFromPoints(points);

        var color = colors.get(counter % colors.size);
        var material = new Three.LineBasicMaterial({ color: color });

        streak.add(new Three.LineSegments(geometry, material));
        counter++;
    }
    return streak;
};

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _immutable = require('immutable');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
