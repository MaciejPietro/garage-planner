import { Catalog } from 'react-planner';

let catalog = new Catalog();

import * as Areas from './areas/**/planner-element.jsx';
import * as Lines from './lines/**/planner-element.jsx';
import * as Holes from './holes/**/planner-element.jsx';
import * as Items from './items/**/planner-element.jsx';
import * as Cameras from './cameras/**/planner-element.jsx';
import * as Cameras360 from './cameras360/**/planner-element.jsx';

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);
for (let x in Cameras) catalog.registerElement(Cameras[x]);
for (let x in Cameras360) catalog.registerElement(Cameras360[x]);

export default catalog;
