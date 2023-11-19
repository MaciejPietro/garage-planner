import React, { useEffect, useState } from "react";
import RoofCombiner from "./planner/combineRoof";
import { surfaces, roofs } from "./lib/data";
import Toolbar from "./components/Toolbar";
import { usePlannerStore } from "./store";

// import { usePlannerStore } from "./store";

function App() {
  const [roof3d, setRoof3d] = useState<any>(null);
  const { roof, dimension, height, wallTexture, gate } = usePlannerStore(
    (state: any) => state
  );

  useEffect(() => {
    let roof3dInstance: any = null;

    if (!roof3d) {
      roof3dInstance = new RoofCombiner();

      setRoof3d(roof3dInstance);
      roof3dInstance.init("planner", surfaces, () => undefined);

      const wallHeight = height.settings.height;
      const wallTexturePath = wallTexture.path;

      roof3dInstance.renderRoof(roof, dimension, wallHeight);
      roof3dInstance.renderWalls(dimension, wallHeight, wallTexturePath);
      roof3dInstance.renderGate(gate, dimension);
      roof3dInstance.centerCamera();
    }

    return () => {
      roof3dInstance?.cleanup();
    };
  }, []);

  useEffect(() => {
    if (roof3d) {
      const wallHeight = height.settings.height;
      const wallTexturePath = wallTexture.path;

      roof3d.renderRoof(roof, dimension, wallHeight);
      roof3d.renderWalls(dimension, wallHeight, wallTexturePath);
      roof3d.renderGate(gate, dimension);
    }
  }, [dimension, height, roof, wallTexture, gate]);

  return (
    <div className="grid grid-cols-5 gap-16 w-full">
      <div className="col-span-3 aspect-square border border-gray-500 ">
        <canvas id="planner" className="w-full h-full"></canvas>
      </div>
      <div className="col-span-2">
        <Toolbar />
      </div>
    </div>
  );
}

export default App;
