// @ts-nocheck
import React from "react";
import { usePlannerStore } from "../../store";

export default function SelectRoof() {
  const { changeRoof, roof } = usePlannerStore((state) => state);

  return (
    <div className="p-4">
      <h2>Wybierz dach</h2>

      <div className="flex gap-6 mt-2">
        <button
          onClick={() => changeRoof("dropBack")}
          className={
            "w-16 h-16 border text-xs flex items-center justify-center text-center " +
            (roof.name === "dropBack" ? "border-red-400" : "border-gray-200")
          }
        >
          SPAD NA TYŁ
        </button>
        <button
          onClick={() => changeRoof("dropLeft")}
          className={
            "w-16 h-16 border text-xs flex items-center justify-center text-center " +
            (roof.name === "dropLeft" ? "border-red-400" : "border-gray-200")
          }
        >
          SPAD NA LEWO
        </button>
        <button
          onClick={() => changeRoof("dropRight")}
          className={
            "w-16 h-16 border text-xs flex items-center justify-center text-center " +
            (roof.name === "dropRight" ? "border-red-400" : "border-gray-200")
          }
        >
          SPAD NA PRAWO
        </button>
      </div>
    </div>
  );
}
