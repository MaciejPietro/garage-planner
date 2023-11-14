import * as Three from 'three';
import gridHorizontalStreak from './grids/grid-horizontal-streak';
import gridVerticalStreak from './grids/grid-vertical-streak';

export default function createGrid(scene) {
    var gridMesh = new Three.Object3D();
    gridMesh.name = 'grid';
    var grids = scene.grids,
        width = scene.width,
        height = scene.height;


    grids.forEach(function (grid) {
        switch (grid.type) {
            case 'horizontal-streak':
                gridMesh.add(gridHorizontalStreak(width, height, grid));
                break;
            case 'vertical-streak':
                gridMesh.add(gridVerticalStreak(width, height, grid));
                break;
        }
    });

    gridMesh.position.y = -1;
    return gridMesh;
}