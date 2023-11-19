// @ts-nocheck
import React from "react";
import { usePlannerStore } from "../store";
import SelectRoof from "./Toolbar/SelectRoof";
import SelectDimensions from "./Toolbar/SelectDimensions";
import SelectWallTexture from "./Toolbar/SelectWallTexture";
import SelectGate from "./Toolbar/SelectGate";

export default function Toolbar() {
  const changeRoof = usePlannerStore((state) => state.changeRoof);

  return (
    <div className="m-6 border border-gray-200 divide-y">
      <SelectRoof />
      <SelectDimensions />
      <SelectWallTexture />
      <SelectGate />
    </div>
  );
}
