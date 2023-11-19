// @ts-nocheck
import React, { useState } from "react";
import { usePlannerStore } from "../../store";
import { gates, gateHeights, gateWidths } from "../../lib/gates";

import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function SelectDimensions() {
  const { gate, setGateType, setGateHeight, setGateWidth } = usePlannerStore(
    (state) => state
  );

  return (
    <div className="p-4">
      <h2>Brama</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Dropdown
            value={gate.type}
            onChange={(e) => setGateType(e.value.name)}
            options={gates}
            optionLabel="title"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4 text-xs text-gray-700">
        <div>
          <p>Szerokość</p>
          <Dropdown
            value={gate.width.name}
            onChange={(e) => setGateWidth(e.value)}
            options={gateWidths}
            optionLabel="name"
            optionValue="name"
            className="w-full md:w-14rem"
          />
        </div>
        <div>
          <p>Wysokość</p>
          <Dropdown
            value={gate.height.name}
            onChange={(e) => setGateHeight(e.value)}
            options={gateHeights}
            optionLabel="name"
            optionValue="name"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
    </div>
  );
}
