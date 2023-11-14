import * as Three from 'three';
import { List } from 'immutable';

export default function (width, height, grid) {
    var step = grid.properties.get('step');
    var colors = grid.properties.has('color')
        ? new List([grid.properties.get('color')])
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
}
