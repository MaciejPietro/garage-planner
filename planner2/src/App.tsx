import React, { useEffect, useState } from "react";
import RoofCombiner from "./planner/combineRoof";
import { surfaces, roofs } from "./lib/data";
import Toolbar from "./components/Toolbar";
import { usePlannerStore } from "./store";

// import { usePlannerStore } from "./store";

function App() {
  const [roof3d, setRoof3d] = useState<any>(null);
  const roof = usePlannerStore((state: any) => state.roof);

  useEffect(() => {
    let roof3dInstance: any = null;

    if (!roof3d) {
      roof3dInstance = new RoofCombiner();

      setRoof3d(roof3dInstance);
      roof3dInstance.init("planner", surfaces, () => undefined);

      const allRoofs = roofs as any;
      roof3dInstance.renderRoof(allRoofs[roof] as any);
    }

    return () => {
      roof3dInstance?.cleanup();
    };
  }, []);

  useEffect(() => {
    if (roof3d) {
      const allRoofs = roofs as any;
      roof3d.renderRoof(allRoofs[roof] as any);
    }
  }, [roof]);

  return (
    <div className="grid grid-cols-5 gap-16 w-full">
      <div className="col-span-3 aspect-square border border-gray-500 ">
        <canvas id="planner" className="w-full h-full"></canvas>
      </div>
      <div className="col-span-2">
        <Toolbar />
        <div className="flex gap-2 mt-4">Dach {roof}</div>
      </div>
    </div>
  );
}

export default App;
