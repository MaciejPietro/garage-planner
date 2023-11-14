import * as Three from 'three';
import { List } from 'immutable';

export default function (width, height, grid) {
    let step = grid.properties.get('step');
    let colors = grid.properties.has('color')
        ? new List([grid.properties.get('color')])
        : grid.properties.get('colors');

    let streak = new Three.Object3D();
    streak.name = 'streak';

    let counter = 0;

    for (let i = 0; i <= width; i += step) {
        let geometry = new Three.Geometry();
        geometry.vertices.push(new Three.Vector3(i, 0, 0));
        geometry.vertices.push(new Three.Vector3(i, 0, -height));
        let color = colors.get(counter % colors.size);
        let material = new Three.LineBasicMaterial({ color });

        streak.add(new Three.LineSegments(geometry, material));
        counter++;
    }
    return streak;
}
