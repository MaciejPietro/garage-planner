'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createGrid;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _gridHorizontalStreak = require('./grids/grid-horizontal-streak');

var _gridHorizontalStreak2 = _interopRequireDefault(_gridHorizontalStreak);

var _gridVerticalStreak = require('./grids/grid-vertical-streak');

var _gridVerticalStreak2 = _interopRequireDefault(_gridVerticalStreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createGrid(scene) {
    var gridMesh = new Three.Object3D();
    gridMesh.name = 'grid';
    var grids = scene.grids,
        width = scene.width,
        height = scene.height;


    grids.forEach(function (grid) {
        switch (grid.type) {
            case 'horizontal-streak':
                gridMesh.add((0, _gridHorizontalStreak2.default)(width, height, grid));
                break;
            case 'vertical-streak':
                gridMesh.add((0, _gridVerticalStreak2.default)(width, height, grid));
                break;
        }
    });

    gridMesh.position.y = -1;
    return gridMesh;
}