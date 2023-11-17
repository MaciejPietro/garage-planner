// @ts-nocheck
import React from "react";
import { usePlannerStore } from "../store";

export default function Toolbar() {
  const changeRoof = usePlannerStore((state) => state.changeRoof);

  return (
    <div>
      <div>
        <h2>Wybierz dach</h2>

        <div className="flex gap-6">
          <button
            onClick={() => changeRoof("gamble")}
            className="w-24 h-24 border border-red-500 flex items-center justify-center"
          >
            DWUSPAD
          </button>
          <button
            onClick={() => changeRoof("backDrop")}
            className="w-24 h-24 border border-red-500 flex items-center justify-center text-center"
          >
            SPAD NA TYŁ
          </button>
        </div>
      </div>
    </div>
  );
}
