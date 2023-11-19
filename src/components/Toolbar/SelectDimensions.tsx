// @ts-nocheck
import React, { useState } from "react";
import { usePlannerStore } from "../../store";
import { dimensions, heights } from "../../lib/dimensions";

import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function SelectDimensions() {
  const { dimension, changeDimension, height, changeHeight } = usePlannerStore(
    (state) => state
  );

  const selectDimension = (e) => {
    changeDimension(e.name);
  };

  const selectHeight = (e) => {
    changeHeight(e.name);
  };

  return (
    <div className="p-4">
      <h2>Wymiary garażu:</h2>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <p className="text-xs text-gray-700">Szerokość i długość</p>
          <Dropdown
            value={dimension}
            onChange={(e) => selectDimension(e.value)}
            options={dimensions}
            optionLabel="name"
            className="w-full md:w-14rem"
          />
        </div>
        <div>
          <p className="text-xs text-gray-700">Wysokość ścian</p>
          <Dropdown
            value={height}
            onChange={(e) => selectHeight(e.value)}
            options={heights}
            optionLabel="name"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
    </div>
  );
}
