import { create } from "zustand";
import { dimensions, heights } from "../lib/dimensions";
import { roofs } from "../lib/roofs";
import { wallTextures } from "../lib/textures";
import { gateHeights, gateWidths, gates } from "../lib/gates";

const roofModule = (set: any) => ({
  roof: roofs[0],
  changeRoof: (roofName: "dropLeft" | "dropRight" | "dropBack") =>
    set((state: any) => ({
      ...state,
      roof: roofs.find(({ name }: any) => name === roofName),
    })),
});

const dimensionsModule = (set: any) => ({
  dimension: dimensions[0],
  changeDimension: (dimensionName: string) =>
    set((state: any) => ({
      ...state,
      dimension: dimensions.find(({ name }) => name === dimensionName),
    })),
  height: heights[0],
  changeHeight: (heightName: string) =>
    set((state: any) => ({
      ...state,
      height: heights.find(({ name }) => name === heightName),
    })),
});

const gateModule = (set: any) => ({
  gate: {
    width: gateWidths[0],
    height: gateHeights[0],
    type: gates[0],
  },
  setGateHeight: (heightName: string) =>
    set((state: any) => ({
      ...state,
      gate: {
        ...state.gate,
        height: gateHeights.find(({ name }) => name === heightName),
      },
    })),
  setGateWidth: (widthName: string) =>
    set((state: any) => ({
      ...state,
      gate: {
        ...state.gate,
        width: gateWidths.find(({ name }) => name === widthName),
      },
    })),

  setGateType: (gateName: string) =>
    set((state: any) => ({
      ...state,
      gate: {
        ...state.gate,
        type: gates.find(({ name }) => name === gateName),
      },
    })),
});

export const usePlannerStore = create((set) => ({
  ...roofModule(set),
  ...dimensionsModule(set),
  wallTexture: wallTextures[0],
  changeWallTexture: (textureName: string) =>
    set((state: any) => ({
      ...state,
      wallTexture: wallTextures.find(({ name }) => name === textureName),
    })),
  ...gateModule(set),
}));
