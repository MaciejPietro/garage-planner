import { mToCm } from "../planner/helpers";

export const gates = [
  {
    name: "single",
    title: "Uchylna",
    path: "/assets/textures/gate.jpg",
  },
  {
    name: "double",
    title: "Dwuskrzydłowa",
    path: "/assets/textures/gate-double.jpg",
  },
];

export const gateWidths = [
  {
    name: "150cm",
    value: 1.5,
  },
  {
    name: "175cm",
    value: 1.75,
  },
  {
    name: "200cm",
    value: 2,
  },
  {
    name: "250cm",
    value: 2.5,
  },
];

export const gateHeights = [
  {
    name: "150cm",
    value: 1.5,
  },
  {
    name: "175cm",
    value: 1.75,
  },
  {
    name: "200cm",
    value: 2,
  },
];

export const getGateSurface = ({ height, width }: any) => ({
  type: "gate",
  points: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 0,
      y: mToCm(height),
    },
    {
      x: mToCm(width),
      y: mToCm(height),
    },
    {
      x: mToCm(width),
      y: 0,
    },
  ],
  cuts: [],
  settings: {
    position3d: {
      x: 0,
      y: height / 2,
      z: 0,
    },
    rotation3d: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
});
