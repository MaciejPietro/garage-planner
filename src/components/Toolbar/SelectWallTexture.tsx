// @ts-nocheck
import React from "react";
import { usePlannerStore } from "../../store";

export default function SelectRoof() {
  const { changeWallTexture, wallTexture } = usePlannerStore((state) => state);

  return (
    <div className="p-4">
      <h2>Wybierz kolor ścian</h2>

      <div className="flex gap-6 text-sm mt-2">
        <button onClick={() => changeWallTexture("brick")} className="">
          <img
            className={
              "w-12 h-12 p-1 border border-gray-200 rounded " +
              (wallTexture.name === "brick"
                ? "border-red-400"
                : "border-gray-200")
            }
            src="/assets/textures/bricks.jpg"
            alt=""
          />
          Cegła
        </button>
        <button onClick={() => changeWallTexture("metal")} className="">
          <img
            className={
              "w-12 h-12 p-1 border border-gray-200 rounded " +
              (wallTexture.name === "metal"
                ? "border-red-400"
                : "border-gray-200")
            }
            src="/assets/textures/metal.jpg"
            alt=""
          />
          Blacha
        </button>
        <button onClick={() => changeWallTexture("wood")} className="">
          <img
            className={
              "w-12 h-12 p-1 border border-gray-200 rounded " +
              (wallTexture.name === "wood"
                ? "border-red-400"
                : "border-gray-200")
            }
            src="/assets/textures/wood.jpg"
            alt=""
          />
          Drewno
        </button>
      </div>
    </div>
  );
}
